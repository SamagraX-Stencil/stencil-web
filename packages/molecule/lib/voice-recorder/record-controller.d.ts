/// <reference types="react" />
declare const RecorderControl: React.FC<{
    status: string;
    onClick?: () => void;
    includeDiv?: boolean;
    tapToSpeak?: boolean;
}>;
export default RecorderControl;
