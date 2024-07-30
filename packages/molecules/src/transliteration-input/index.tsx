import { useTransliteration } from '@samagra-x/stencil-hooks';
import { TextareaAutosize, TextareaAutosizeProps } from '@mui/base/TextareaAutosize';
import styles from './index.module.css';

export interface TransliterationConfigType {
  allowFeedback: boolean;
  allowTextToSpeech: boolean;
  transliterationApi: string;
  allowTransliteration: boolean;
  transliterationProvider: string;
  transliterationSuggestions: string;
  transliterationInputLanguage: string;
  transliterationOutputLanguage: string;
}

export interface TransliterationInputPropsType
  extends Omit<TextareaAutosizeProps, 'value' | 'onChange'> {
  config: TransliterationConfigType;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  cols?: number;
  value: string;
  setValue: (value: string) => void;
}

const TransliterationInput: React.FC<TransliterationInputPropsType> = ({
  config,
  placeholder,
  multiline = false,
  rows = 1,
  cols,
  value,
  setValue,
  ...props
}: any) => {
  const {
    suggestions,
    activeSuggestion,
    handleInputChange,
    suggestionClickHandler,
    suggestionHandler,
  } = useTransliteration(config, value, setValue);

  return (
    <div className={styles.container}>
      <div className={styles.suggestions}>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => suggestionClickHandler(suggestion)}
            className={`${styles.suggestion} ${activeSuggestion === index ? styles.active : ''}`}
            onMouseEnter={() => suggestionHandler(index)}
          >
            {suggestion}
          </div>
        ))}
      </div>
      <TextareaAutosize
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        id="inputBox"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        multiline={multiline}
        rows={multiline ? rows : 1}
        {...props}
      />
    </div>
  );
};

export { TransliterationInput };
