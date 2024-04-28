import axios from 'axios';

const saveTelemetryEvent = async (
  version: string,
  eventId: string,
  event: string,
  subEvent: string,
  eventData: any,
) => {
  const telemetryApi =
    process.env.NEXT_PUBLIC_TELEMETRY_API + '/metrics/v1/save' || '';

  try {
    const telemetryData = {
      generator: process.env.NEXT_PUBLIC_BOT_NAME,
      version,
      timestamp: Math.floor(new Date().getTime() / 1000),
      actorId: localStorage.getItem('userID') || '',
      actorType: 'user',
      env: process.env.NEXT_PUBLIC_ENV === 'production' ? 'prod' : 'dev',
      eventId,
      event,
      subEvent,
      os:
      // @ts-ignore
      window.navigator?.userAgentData?.platform || window.navigator.platform,
      browser: window.navigator.userAgent,
      ip: sessionStorage.getItem('ip') || '',
      // @ts-ignore
      deviceType: window.navigator?.userAgentData?.mobile
        ? 'mobile'
        : 'desktop',
      eventData,
    };

    await axios.post(telemetryApi, [telemetryData], {
      headers: {
        orgId: process.env.NEXT_PUBLIC_ORG_ID || ''
      }
    });
  } catch (error) {
    console.error('Error saving telemetry event:', error);
  }
};

export default saveTelemetryEvent;
