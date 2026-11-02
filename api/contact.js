// Vercel serverless function: POST /api/contact -> saves to Supabase table "messages".
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name = '', email = '', message = '' } = req.body || {};
  const n = String(name).trim(), e = String(email).trim(), m = String(message).trim();

  if (n.length < 2 || n.length > 100) return res.status(400).json({ error: 'Invalid name' });
  if (!/^\S+@\S+\.\S+$/.test(e) || e.length > 200) return res.status(400).json({ error: 'Invalid email' });
  if (m.length < 10 || m.length > 2000) return res.status(400).json({ error: 'Invalid message' });

  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(500).json({ error: 'Server is not configured' });

  // The service role key stays on the server and is never sent to the browser.
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from('messages').insert({ name: n, email: e, message: m });
  if (error) { console.error(error); return res.status(500).json({ error: 'Could not save message' }); }

  return res.status(200).json({ ok: true });
}
