import type { NextApiRequest, NextApiResponse } from 'next';
import { chargeToken } from '@/lib/User';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { uniqueID } = req.query;
  if (req.method === 'POST') {
    return new Promise<void>((resolve, reject) => {
      chargeToken(uniqueID as string).then((num_tokens) => {
        if (num_tokens === null) {
          res.status(500).json({ error: 'Error charging token' });
          resolve();
        } else {
          res.status(200).json({ num_tokens: num_tokens });
          resolve();  
        }
      }
      );
    });
  } else {
    return res.status(500).json({ error: 'Invalid method' });
  }
}