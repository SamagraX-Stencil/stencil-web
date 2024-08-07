import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { map } from 'lodash';

type Language = {
  name: string;
  value: string;
};

type LanguagePickerProps = {
  languages: Language[];
  activeLanguage: string;
  handleLanguageClick: (event: SelectChangeEvent<string>) => void;
  style?: {
    formControlStyle?: object;
    selectStyle?: object;
    menuItemStyle?: object;
  };
};

const NewLanguagePicker: React.FC<LanguagePickerProps> = ({
  languages,
  activeLanguage,
  handleLanguageClick,
  style = {},
}) => {
  // const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   console.log('lllll', event);
  //   handleLanguageClick(event.target.value as string);
  // };
  return (
    <FormControl
      sx={{
        m: 1,
        border: 'none',
        borderRadius: '10px',
        height: '36px',
        ...style.formControlStyle,
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
          ...style.selectStyle,
        }}
      >
        {map(languages, (lang) => (
          <MenuItem value={lang?.value} sx={{ ...style.menuItemStyle }}>
            {lang?.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default NewLanguagePicker;
