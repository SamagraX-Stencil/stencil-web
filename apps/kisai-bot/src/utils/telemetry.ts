import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const saveTelemetryEvent = async (
  version: string,
  eventId: string,
  event: string,
  subEvent: string,
  eventData: any
) => {
  const telemetryApi = process.env.NEXT_PUBLIC_TELEMETRY_API + '/metrics/v1/save' || '';

  if (!sessionStorage.getItem('sessionId')) {
    sessionStorage.setItem('sessionId', uuidv4());
  }

  try {
    const telemetryData = {
      generator: 'kmai-dev',
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
      ip: localStorage.getItem('ip') || '',
      // @ts-ignore
      deviceType: window.navigator?.userAgentData?.mobile ? 'mobile' : 'desktop',
      sessionId: sessionStorage.getItem('sessionId') || '',
      eventData,
    };

    await axios.post(telemetryApi, [telemetryData], {
      headers: {
        orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
      },
    });
  } catch (error) {
    console.error('Error saving telemetry event:', error);
  }
};

export default saveTelemetryEvent;
