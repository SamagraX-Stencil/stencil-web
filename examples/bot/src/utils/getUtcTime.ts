export const getUtcTimeformated = (timeinstance: any) => {
  timeinstance = new Date(timeinstance);
  const hours = timeinstance.getUTCHours();
  const minutes = timeinstance.getUTCMinutes();
  const amPM = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours > 12 ? hours - 12 : hours;

  return `${timeinstance.getUTCDate()}/${timeinstance.getUTCMonth() + 1}/${timeinstance.getUTCFullYear()} ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amPM}`;
};

export const getFormatedTime = (timeinstance: any) => {
  timeinstance = new Date(timeinstance);
  const hours = timeinstance.getHours();
  const minutes = timeinstance.getMinutes();
  const amPM = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours > 12 ? hours - 12 : hours;

  return `${timeinstance.getDate()}/${timeinstance.getMonth() + 1}/${timeinstance.getFullYear()} ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amPM}`;
};
