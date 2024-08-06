import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { map } from 'lodash';
interface NewLanguagePickerProps {
  languages: Array<{
    name: string;
    value: string;
  }>;
  activeLanguage: string;
  handleLanguageClick: (event: SelectChangeEvent) => void;
  customStyles?: {
    formControlStyle?: React.CSSProperties;
    selectStyle?: React.CSSProperties;
    menuItemStyle?: React.CSSProperties;
  };
}

const NewLanguagePicker = ({
  languages,
  activeLanguage,
  handleLanguageClick,
  customStyles = {},
}: NewLanguagePickerProps) => {
  const { formControlStyle, selectStyle, menuItemStyle } = customStyles;

  return (
    <FormControl
      sx={{
        m: 1,
        background: 'lightblue',
        border: 'none',
        borderRadius: '10px',
        height: '36px',
        ...formControlStyle,
      }}
      size="small"
    >
      <Select
        value={activeLanguage}
        onChange={handleLanguageClick}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
          border: 'none',
          borderRadius: '10px',
          width: '85px',
          height: '36px',
          ...selectStyle,
        }}
      >
        {map(languages, (lang) => (
          <MenuItem value={lang?.value} sx={{ ...menuItemStyle }}>
            {lang?.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { NewLanguagePicker };
