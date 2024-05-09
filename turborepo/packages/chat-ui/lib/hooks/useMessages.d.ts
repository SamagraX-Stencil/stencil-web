import { MessageProps, MessageId } from '../components/Message';
type Messages = MessageProps[];
type MessageWithoutId = Omit<MessageProps, '_id'> & {
    _id?: MessageId;
};
export default function useMessages(initialState?: MessageWithoutId[]): {
    messages: Messages;
    prependMsgs: (msgs: Messages) => void;
    appendMsg: (msg: MessageWithoutId) => void;
    updateMsg: (id: MessageId, msg: MessageWithoutId) => void;
    deleteMsg: (id: MessageId) => void;
    resetList: (list?: any) => void;
    setTyping: (typing: boolean) => void;
};
export {};
