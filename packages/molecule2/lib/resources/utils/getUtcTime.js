"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUtcTimeformated = exports.getFormatedTime = void 0;
var getUtcTimeformated = exports.getUtcTimeformated = function getUtcTimeformated(timeinstance) {
  timeinstance = new Date(timeinstance);
  var hours = timeinstance.getUTCHours();
  var minutes = timeinstance.getUTCMinutes();
  var amPM = hours >= 12 ? 'pm' : 'am';
  var formattedHours = hours > 12 ? hours - 12 : hours;
  return "".concat(timeinstance.getUTCDate(), "/").concat(timeinstance.getUTCMonth() + 1, "/").concat(timeinstance.getUTCFullYear(), " ").concat(formattedHours, ":").concat(minutes < 10 ? '0' : '').concat(minutes, " ").concat(amPM);
};
var getFormatedTime = exports.getFormatedTime = function getFormatedTime(timeinstance) {
  timeinstance = new Date(timeinstance);
  var hours = timeinstance.getHours();
  var minutes = timeinstance.getMinutes();
  var amPM = hours >= 12 ? 'pm' : 'am';
  var formattedHours = hours > 12 ? hours - 12 : hours;
  return "".concat(timeinstance.getDate(), "/").concat(timeinstance.getMonth() + 1, "/").concat(timeinstance.getFullYear(), " ").concat(formattedHours, ":").concat(minutes < 10 ? '0' : '').concat(minutes, " ").concat(amPM);
};