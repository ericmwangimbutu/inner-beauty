import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyToken, findUserById } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'missing token' });

    const payload = verifyToken(token);
    if (!payload || !payload.id) return res.status(401).json({ error: 'invalid token' });

    const user = await findUserById(Number(payload.id));
    if (!user) return res.status(404).json({ error: 'user not found' });

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
