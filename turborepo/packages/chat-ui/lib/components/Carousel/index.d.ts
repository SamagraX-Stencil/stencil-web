import React from 'react';
export interface CarouselProps {
    children: React.ReactNode;
    className?: string;
    startIndex?: number;
    draggable?: boolean;
    clickDragThreshold?: number;
    duration?: number;
    easing?: string;
    threshold?: number;
    loop?: boolean;
    rtl?: boolean;
    autoPlay?: boolean;
    interval?: number;
    dots?: boolean;
    onChange?: (activeIndex?: number) => void;
    autoplay?: boolean;
    autoplaySpeed?: number;
    indicators?: boolean;
}
export interface CarouselHandle {
    goTo: (n: number) => void;
    prev: () => void;
    next: () => void;
}
export declare const Carousel: React.ForwardRefExoticComponent<CarouselProps & React.RefAttributes<CarouselHandle>>;
