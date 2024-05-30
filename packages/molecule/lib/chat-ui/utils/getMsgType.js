"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMsgType = void 0;
var getMsgType = exports.getMsgType = function getMsgType(msg) {
  var _msg$payload, _msg$choices, _msg$payload2, _msg$payload4;
  if (isJsonString(msg === null || msg === void 0 ? void 0 : msg.text)) {
    var _JSON$parse;
    if (Array.isArray((_JSON$parse = JSON.parse(msg === null || msg === void 0 ? void 0 : msg.text)) === null || _JSON$parse === void 0 ? void 0 : _JSON$parse.table)) return 'table';
  }
  if (msg !== null && msg !== void 0 && (_msg$payload = msg.payload) !== null && _msg$payload !== void 0 && (_msg$payload = _msg$payload.buttonChoices) !== null && _msg$payload !== void 0 && _msg$payload.length || msg !== null && msg !== void 0 && (_msg$choices = msg.choices) !== null && _msg$choices !== void 0 && _msg$choices.length) return 'options';
  if (msg !== null && msg !== void 0 && msg.imageUrl) return 'image';
  if (msg !== null && msg !== void 0 && msg.videoUrl) return 'video';
  if (msg !== null && msg !== void 0 && msg.audioUrl) return 'audio';
  if (msg !== null && msg !== void 0 && msg.fileUrl) return 'file';
  if (msg !== null && msg !== void 0 && (_msg$payload2 = msg.payload) !== null && _msg$payload2 !== void 0 && _msg$payload2.media) {
    var _msg$payload3;
    switch (msg === null || msg === void 0 || (_msg$payload3 = msg.payload) === null || _msg$payload3 === void 0 || (_msg$payload3 = _msg$payload3.media) === null || _msg$payload3 === void 0 ? void 0 : _msg$payload3.category) {
      case 'IMAGE':
      case 'IMAGE_URL':
        return 'image';
      case 'VIDEO':
      case 'VIDEO_URL':
        return 'video';
      case 'FILE':
      case 'FILE_URL':
        return 'file';
      case 'AUDIO':
      case 'AUDIO_URL':
        return 'audio';
      default:
        return 'text';
    }
  }
  if ((msg === null || msg === void 0 || (_msg$payload4 = msg.payload) === null || _msg$payload4 === void 0 ? void 0 : _msg$payload4.type) === "loading") return 'loader';
  return 'text';
};
function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}