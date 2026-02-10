import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const users = await query('SELECT id, name, email, created_at FROM users ORDER BY id DESC LIMIT 100');
      return res.status(200).json(users);
    }

    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}
