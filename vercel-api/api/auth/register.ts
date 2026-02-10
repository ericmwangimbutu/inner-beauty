import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../../lib/db';
import { hashPassword, signToken } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).end('Method Not Allowed');
    }

    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password required' });

    const existing = await query('SELECT id FROM users WHERE email = $1 LIMIT 1', [email]);
    if (existing.length) return res.status(409).json({ error: 'email already registered' });

    const hashed = await hashPassword(password);
    const rows = await query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at', [name, email, hashed]);
    const user = rows[0];
    const token = signToken({ id: user.id });
    return res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
