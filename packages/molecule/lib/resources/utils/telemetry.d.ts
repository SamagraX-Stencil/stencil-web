declare const saveTelemetryEvent: (version: string, eventId: string, event: string, subEvent: string, eventData: any) => Promise<void>;
export default saveTelemetryEvent;
