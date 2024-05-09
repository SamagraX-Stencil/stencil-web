"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseDataTransfer;
function parseDataTransfer(e, callback) {
  // const dataTransfer = e.dataTransfer || e.clipboardData;
  var items = e.clipboardData.items;
  if (items && items.length) {
    // eslint-disable-next-line no-plusplus
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.type.indexOf('image') !== -1) {
        var file = item.getAsFile();
        if (file) {
          callback(file);
        }
        e.preventDefault();
        break;
      }
    }
  }
}