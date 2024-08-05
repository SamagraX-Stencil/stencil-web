export default async function handler(req, res) {
  const { userType } = req.query;

  if (!userType) {
    return res.status(400).json({ error: 'User Type is required' });
  }

  try {
    const flags = getFlags(userType);
    return res.status(200).json({ flags });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch feature flags' });
  }
}

const getFlags = (userType) => {
  switch (userType) {
    case 'farmer':
      return {
        component: {
          menu: {
            showMicButton: false,
            showNotificationsPage: false,
          },
          homePage: {
            showWeather: false,
            showWeatherAdvisory: false,
            showOtherInformation: false,
          },
          sidebar: {
            historyPage: false,
          },
        },
      };
    default:
      return {};
  }
};
