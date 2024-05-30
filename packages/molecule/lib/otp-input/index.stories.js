"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OTP = void 0;
var _index = require("./index");
var _test = require("@storybook/test");
var meta = {
  title: "Molecule/OTPInput",
  component: _index.OTPInput,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  args: {
    separator: "-",
    length: 4,
    value: "",
    onChange: (0, _test.fn)()
  }
};
var _default = exports.default = meta;
// export const LoggedIn: Story = {
//   args: {
//     json: {
//       name: 'Jane Doe',
//     },
//   },
// };

var OTP = exports.OTP = {};