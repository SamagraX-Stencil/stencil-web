"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTransition = exports.setTransform = void 0;
/* eslint-disable no-param-reassign */
var setTransform = exports.setTransform = function setTransform(el, value) {
  el.style.transform = value;
  el.style.webkitTransform = value;
};
var setTransition = exports.setTransition = function setTransition(el, value) {
  el.style.transition = value;
  el.style.webkitTransition = value;
};