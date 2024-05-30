export function formatDate(inputDateString) {
  // Parse the input date string
  var date = new Date(inputDateString);

  // Get the components of the date and time
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var day = date.getDate();
  var month = date.getMonth() + 1; // Months are zero-indexed
  var year = date.getFullYear();

  // Convert hours to 12-hour format and determine AM/PM
  var ampm = hours >= 12 ? 'PM' : 'AM';
  var formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Add leading zeros to minutes and seconds
  var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  // Assemble the formatted date string
  var formattedDateString = "".concat(formattedHours, ":").concat(formattedMinutes, " ").concat(ampm, " ").concat(day, "/").concat(month, "/").concat(year);
  return formattedDateString;
}