// import { useTransliteration } from '@samagra-x/stencil-hooks';
import useTransliteration from './useTransliteration-input';

import { TextareaAutosize, TextareaAutosizeProps } from '@mui/base/TextareaAutosize';
import { CSSProperties } from 'react';

const defaultStyles: {
  container: CSSProperties;
  suggestions: CSSProperties;
  suggestion: CSSProperties;
  active: CSSProperties;
} = {
  container: {
    position: 'relative',
    width: '100%',
  },
  suggestions: {
    position: 'absolute',
    zIndex: 1000,
    display: 'flex',
    minWidth: '50px',
    width: 'auto',
    top: '-30px',
    left: '10px',
    backgroundColor: 'white',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
  },
  suggestion: {
    padding: '0 10px',
    cursor: 'pointer',
  },
  active: {
    backgroundColor: '#65c3d7',
    color: 'white',
  },
};
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
  columns?: number;
  value: string;
  setValue: (value: string) => void;
  translationApiEndPoint: string;
  customCSS?: {
    container?: CSSProperties;
    suggestions?: CSSProperties;
    suggestion?: CSSProperties;
    active?: CSSProperties;
  };
}

const TransliterationInput: React.FC<TransliterationInputPropsType> = ({
  config,
  placeholder,
  multiline = false,
  rows = 1,
  columns,
  value,
  setValue,
  translationApiEndPoint,
  customCSS = {},
  ...textAreaAutoSizeprops
}: any) => {
  // const [temp, setTemp] = useState('');
  const {
    suggestions,
    activeSuggestion,
    handleInputChange,
    suggestionClickHandler,
    suggestionHandler,
  } = useTransliteration(config, value, setValue, translationApiEndPoint);

  const mergedStyles = {
    container: { ...defaultStyles.container, ...customCSS.container },
    suggestions: { ...defaultStyles.suggestions, ...customCSS.suggestions },
    suggestion: { ...defaultStyles.suggestion, ...customCSS.suggestion },
    active: { ...defaultStyles.active, ...customCSS.active },
  };

  return (
    <div style={mergedStyles.container}>
      <div style={mergedStyles.suggestions}>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => suggestionClickHandler(suggestion)}
            className={`${mergedStyles.suggestion} ${
              activeSuggestion === index ? mergedStyles.active : ''
            }`}
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
        {...textAreaAutoSizeprops}
      />
    </div>
  );
};

export { TransliterationInput };
