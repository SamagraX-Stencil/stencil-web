export type HistoryItem ={
    id:string;
    label?: string;
    conversationId?: string;
    userId?: string;
    secondaryLabel?: string;
    icon?: React.ReactElement;
    secondaryAction?: React.ReactElement;
    onClick?: (arg?:unknown)=>void ;
}
    
export type ChatItem = {
    id: string;
    createdAt: string;
    updatedAt: string;
    responseTime: number;
    query: string;
    response: string;
    queryInEnglish: string;
    responseInEnglish: string;
    conversationId: string;
    userId: string;
    workflowId: string | null;
    reaction: number;
    isConversationDeleted: boolean;
    coreferencedPrompt: string | null;
    error: string | null;
    errorRate: number;
    responseType: string;
    phoneNumber: string | null;
    audioURL: string | null;
    timesAudioUsed: number;
    timeTakenAtApplication: string | null;
    feedback: string | null;
    district: string | null;
    block: string | null;
    lastConversationAt: string;
}
