import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userID } = req.query;
  const { onboardingData } = req.body;

  if (!userID) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BFF_API_URL}/user/${userID}`,
      {
        profile: { ...onboardingData },
      },
      {
        headers: {
          Authorization: process.env.FUSIONAUTH_KEY || '',
          'Service-Url': process.env.FUSIONAUTH_URL || '',
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update user' });
  }
}
