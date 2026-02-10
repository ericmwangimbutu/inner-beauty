import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const rows = await query('SELECT id, author, body, created_at FROM testimonials ORDER BY id DESC LIMIT 100');
      return res.status(200).json(rows);
    }
    if (req.method === 'POST') {
      const { author, body } = req.body;
      if (!author || !body) return res.status(400).json({ error: 'author and body required' });
      const rows = await query('INSERT INTO testimonials (author, body) VALUES ($1, $2) RETURNING id, author, body, created_at', [author, body]);
      return res.status(201).json(rows[0]);
    }
    res.setHeader('Allow', 'GET,POST');
    res.status(405).end('Method Not Allowed');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}
