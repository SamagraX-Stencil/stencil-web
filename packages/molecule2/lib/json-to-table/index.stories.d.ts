/// <reference types="react" />
import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: import("react").FC<import("./index").IJsonToTableProps>;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        json: {
            personalDetails: {
                "Aadhaar Card No": string;
                "Farmer Category": string;
                "Applicant Name": string;
                "Father Name": string;
                District: string;
                Block: string;
                GP: string;
                Village: string;
            };
            buttons: {
                id: number;
                type: string;
                aadhar: string;
                textInEnglish: string;
                text: string;
            }[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const JsonTable: Story;
