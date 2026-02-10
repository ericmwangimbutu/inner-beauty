import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../../lib/db';
import { comparePassword, signToken } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).end('Method Not Allowed');
    }

    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const rows = await query('SELECT id, name, email, password FROM users WHERE email = $1 LIMIT 1', [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'invalid credentials' });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    const token = signToken({ id: user.id });
    delete user.password;
    return res.status(200).json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
