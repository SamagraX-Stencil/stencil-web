import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { map } from 'lodash';

import { useColorPalates } from '@samagra-x/stencil-hooks';
const LanguagePicker = () => {
  const [activeLanguage, setActiveLanguage] = React.useState('en');

  const handleChange = (event: SelectChangeEvent) => {
    setActiveLanguage(event.target.value);
  };
  const theme = useColorPalates();

  const languages = [
    { name: 'Eng', value: 'en' },
    { name: 'हिंदी', value: 'hi' },
  ];
  return (
    <FormControl
      sx={{
        m: 1,
        background: theme.primary.main,
        border: 'none',
        borderRadius: '10px',
        height: '36px',
      }}
      size="small"
    >
      <Select
        value={activeLanguage}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
          color: theme.primary.dark,
          border: 'none',
          borderRadius: '10px',
          width: '85px',
          height: '36px',
        }}
      >
        {map(languages, (lang) => (
          <MenuItem value={lang?.value}>{lang?.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguagePicker;

const NewLanguagePicker = ({
  languages,
  activeLanguage,
  handleLanguageClick,
  customStyles,
}: any) => {
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
