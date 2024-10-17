import { TransliterationInput } from '@samagra-x/stencil-molecules';

const ImportedTransliterationInput = ({
  config,
  placeholder,
  multiline = false,
  rows = 1,
  cols = 35,
  value,
  setValue,
  ...props
}: any) => {
  return (
    <TransliterationInput
      config={config}
      value={value}
      setValue={setValue}
      placeholder={placeholder}
      multiline={false}
      rows={rows}
      columns={cols}
      translationApiEndPoint={`${process.env.NEXT_PUBLIC_AI_TOOLS_API}/transliterate`}
      {...props}
    />
  );
};

export default ImportedTransliterationInput;
