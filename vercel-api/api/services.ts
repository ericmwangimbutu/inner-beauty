import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const services = await query('SELECT id, title, description, price, created_at FROM services ORDER BY id DESC LIMIT 100');
      return res.status(200).json(services);
    }
    if (req.method === 'POST') {
      const { title, description, price } = req.body;
      if (!title) return res.status(400).json({ error: 'title required' });
      const rows = await query('INSERT INTO services (title, description, price) VALUES ($1, $2, $3) RETURNING id, title, description, price, created_at', [title, description || null, price || null]);
      return res.status(201).json(rows[0]);
    }
    res.setHeader('Allow', 'GET,POST');
    res.status(405).end('Method Not Allowed');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}
