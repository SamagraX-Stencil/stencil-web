import { OTPInput } from "./index";
import { fn } from "@storybook/test";
var meta = {
  title: "Molecule/OTPInput",
  component: OTPInput,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  args: {
    separator: "-",
    length: 4,
    value: "",
    onChange: fn()
  }
};
export default meta;
// export const LoggedIn: Story = {
//   args: {
//     json: {
//       name: 'Jane Doe',
//     },
//   },
// };

export var OTP = {};