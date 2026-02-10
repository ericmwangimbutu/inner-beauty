import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const products = await query('SELECT id, name, description, price, created_at FROM products ORDER BY id DESC LIMIT 100');
      return res.status(200).json(products);
    }

    if (req.method === 'POST') {
      const { name, description, price } = req.body;
      if (!name || price == null) return res.status(400).json({ error: 'name and price required' });
      const rows = await query('INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING id, name, description, price, created_at', [name, description || null, price]);
      return res.status(201).json(rows[0]);
    }

    res.setHeader('Allow', 'GET,POST');
    res.status(405).end('Method Not Allowed');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}
