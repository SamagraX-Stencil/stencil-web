export function formatDate(inputDateString: string) {
  // Parse the input date string
  const date = new Date(inputDateString);

  // Get the components of the date and time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();

  // Convert hours to 12-hour format and determine AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Add leading zeros to minutes and seconds
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  // Assemble the formatted date string
  const formattedDateString = `${formattedHours}:${formattedMinutes} ${ampm} ${day}/${month}/${year}`;

  return formattedDateString;
}