export interface HighlightSectionProps {
    videoSrc: string;
    heading: string;
    paragraphs: string[];
    ctaText?: string;
    ctaHref?: string;
    reverse?: boolean;
}
export interface StackShowcaseProps {
    title: string;
    description: string;
    buttonText: string;
    imageSrc: string;
    imageAlt: string;
}
export interface ScrollingStores {
    items: string[];
    highlight?: string;
    speed?: number; // წამებში
    direction?: 'left' | 'right';
}

export interface PageContent {
    highlightSection: HighlightSectionProps;
    stackShowcase: StackShowcaseProps;
    scrollingStores:ScrollingStores;
}
