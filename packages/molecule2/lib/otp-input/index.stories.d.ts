/// <reference types="react" />
import type { StoryObj } from "@storybook/react";
import { OTPInput } from "./index";
declare const meta: {
    title: string;
    component: typeof OTPInput;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        separator: string;
        length: number;
        value: string;
        onChange: import("@vitest/spy").Mock<[value: import("react").SetStateAction<string>], void>;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const OTP: Story;
