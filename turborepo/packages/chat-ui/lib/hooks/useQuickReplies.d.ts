/// <reference types="react" />
import { QuickReplyItemProps } from '../components/QuickReplies';
type QuickReplies = QuickReplyItemProps[];
export default function useQuickReplies(initialState?: QuickReplies): {
    quickReplies: QuickReplies;
    prepend: (list: QuickReplies) => void;
    replace: import("react").Dispatch<import("react").SetStateAction<QuickReplies>>;
    visible: boolean;
    setVisible: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    save: () => void;
    pop: () => void;
};
export {};
