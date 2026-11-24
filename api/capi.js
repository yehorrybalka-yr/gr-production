/* Meta Conversions API relay (Vercel serverless function, POST /api/capi).
   The site sends the same events as the pixel (PageView, ViewContent, Contact, Lead) with the same event_id,
   this function adds the visitor's IP and browser, hashes name/phone (SHA-256) and forwards the event to Meta.

   Vercel → Project → Settings → Environment Variables:
     META_CAPI_TOKEN        required  access token from Events Manager → Settings → Conversions API → Generate access token
     META_PIXEL_ID          optional  defaults to the pixel below
     META_TEST_EVENT_CODE   optional  code from Events Manager → Test events (remove after testing)
     ALLOWED_HOSTS          optional  extra domains allowed to send events, comma-separated (e.g. a custom domain)
   The token never reaches the browser: the site only talks to this function. */
const crypto = require('crypto');

const PIXEL_ID = process.env.META_PIXEL_ID || '1424387709488259';
const API_VERSION = 'v26.0';
const EVENTS = ['PageView', 'ViewContent', 'Contact', 'Lead'];
const HOSTS = ['gr-production.vercel.app', 'localhost', ...(process.env.ALLOWED_HOSTS || '').split(',').map(h => h.trim()).filter(Boolean)];
const CUSTOM_KEYS = ['page', 'lang', 'content_name', 'content_type', 'content_ids', 'method', 'label', 'place', 'role', 'package', 'shoot_type', 'when', 'volume', 'objects', 'value', 'currency', 'utm_source'];

const sha = v => crypto.createHash('sha256').update(v).digest('hex');
const str = (v, max = 300) => (typeof v === 'string' ? v.slice(0, max) : '');
const hostOf = u => { try { return new URL(u).hostname; } catch (e) { return ''; } };
/* the production domain, its Vercel preview builds and any domain from ALLOWED_HOSTS */
const allowed = h => !!h && (HOSTS.includes(h) || (h.startsWith('gr-production') && h.endsWith('.vercel.app')));

async function readBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  let raw = typeof req.body === 'string' ? req.body : Buffer.isBuffer(req.body) ? req.body.toString('utf8') : '';
  if (!raw) { for await (const chunk of req) { raw += chunk; if (raw.length > 12000) break; } }
  if (raw.length > 12000) return null;
  try { return JSON.parse(raw); } catch (e) { return null; }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.statusCode = 405; return res.end(); }
  const token = process.env.META_CAPI_TOKEN;
  if (!token) { res.statusCode = 204; return res.end(); }   // not configured yet: accept silently, the pixel still works

  const b = await readBody(req);
  if (!b || !EVENTS.includes(b.event_name) || !str(b.event_id, 100)) { res.statusCode = 400; return res.end(); }
  const from = hostOf(req.headers.origin || req.headers.referer || '');
  if (!allowed(from) || !allowed(hostOf(b.event_source_url))) { res.statusCode = 403; return res.end(); }

  const user = {
    client_ip_address: String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim() || undefined,
    client_user_agent: str(req.headers['user-agent'], 500) || undefined,
    fbp: str(b.fbp, 200) || undefined,
    fbc: str(b.fbc, 500) || undefined,
    external_id: str(b.external_id, 100) ? [sha(str(b.external_id, 100))] : undefined,
  };
  if (b.event_name === 'Lead' && b.user) {
    const ph = str(b.user.ph, 40).replace(/\D/g, '');
    if (ph.length >= 8) user.ph = [sha(ph)];
    const fn = str(b.user.fn, 80).trim().toLowerCase().split(/\s+/)[0].replace(/[^\p{L}]/gu, '');
    if (fn) user.fn = [sha(fn)];
  }

  const custom = {};
  const cd = b.custom_data && typeof b.custom_data === 'object' ? b.custom_data : {};
  CUSTOM_KEYS.forEach(k => {
    const v = cd[k];
    if (typeof v === 'string' && v) custom[k] = v.slice(0, 200);
    else if (typeof v === 'number' && isFinite(v)) custom[k] = v;
    else if (Array.isArray(v)) custom[k] = v.filter(x => typeof x === 'string').slice(0, 10).map(x => x.slice(0, 100));
  });

  const payload = {
    data: [{
      event_name: b.event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id: str(b.event_id, 100),
      event_source_url: str(b.event_source_url, 1000),
      action_source: 'website',
      user_data: user,
      custom_data: custom,
    }],
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const r = await fetch(`https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload),
    });
    if (!r.ok) console.error('capi', b.event_name, r.status, (await r.text()).slice(0, 500));
  } catch (e) { console.error('capi', b.event_name, e.message); }
  res.statusCode = 204;
  return res.end();
};
