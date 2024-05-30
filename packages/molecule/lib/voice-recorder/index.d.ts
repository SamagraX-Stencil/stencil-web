/// <reference types="react" />
interface VoiceRecorder {
    setInputMsg: (msg: string) => void;
    tapToSpeak: boolean;
    includeDiv?: boolean;
}
declare const VoiceRecorder: React.FC<VoiceRecorder>;
export default VoiceRecorder;
