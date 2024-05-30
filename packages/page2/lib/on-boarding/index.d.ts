import React, { FC } from 'react';
declare const OnBoarding: FC<{
    containerStyle?: React.CSSProperties;
    children: React.ReactNode;
    variant: 'dots' | 'text' | 'progress';
    activeStep: number;
    steps: number;
}>;
export default OnBoarding;
