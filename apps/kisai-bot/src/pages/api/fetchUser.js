import axios from 'axios';

export default async function handler(req, res) {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BFF_API_URL}/user/${userID}`, {
      headers: {
        Authorization: process.env.FUSIONAUTH_KEY || '',
        'Service-Url': process.env.FUSIONAUTH_URL || '',
      },
    });

    return res.status(200).json({ user: response.data.user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
}
