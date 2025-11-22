import { Feather } from "@expo/vector-icons";

export interface ContactLinkItemProps {
    title: string;
    value: string;
    iconName: React.ComponentProps<typeof Feather>["name"];
    linkUri: string;
}

export interface ContentSectionProps {
    title: string;
    content: string;
}

export interface FaqItemProps {
    question: string;
    answer: string;
}

export interface LinkItemProps {
    title: string;
    iconName: React.ComponentProps<typeof Feather>["name"];
    targetScreen: string;
    isLast?: boolean;
}

export interface LinkSectionProps {
    title: string;
    children: React.ReactNode;
}
