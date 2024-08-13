import React, { useContext, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { map } from 'lodash';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { useConfig } from '../../hooks/useConfig';
import { AppContext } from '../../context';
import router from 'next/router';
import NewLanguagePicker from '@samagra-x/stencil-molecules/lib/language-picker/languagePicker';

const LanguagePicker = () => {
  const config = useConfig('component', 'sidebar');
  const botConfig = useConfig('component', 'botDetails');
  const context = useContext(AppContext);
  const [activeLanguage, setActiveLanguage] = useState<string>(() => {
    const storedLang = localStorage.getItem('locale');
    if (storedLang && router?.query?.lang && storedLang !== router?.query?.lang) {
      localStorage.setItem('locale', (router?.query?.lang as string) ?? 'en');
    }
    return (router?.query?.lang as string) || storedLang || 'en';
  });

  useEffect(() => {
    context?.setLocale(activeLanguage);
  }, [activeLanguage, context]);

  const handleChange = (event: SelectChangeEvent) => {
    setActiveLanguage(event.target.value);
    localStorage.setItem('locale', event.target.value);
    context?.setLocale(event.target.value);
  };
  const theme = useColorPalates();

  const languages: Array<{
    name: string;
    value: string;
  }> = [
    { name: config?.languageName1, value: config?.languageCode1 },
    { name: config?.languageName2, value: config?.languageCode2 },
  ];
  return (
    // <FormControl
    //   sx={{
    //     m: 1,
    //     background: theme?.primary?.main,
    //     border: 'none',
    //     borderRadius: '10px',
    //     height: '36px',
    //   }}
    //   size="small"
    //   data-testid="language-picker"
    // >
    <NewLanguagePicker
      activeLanguage={activeLanguage}
      handleLanguageClick={handleChange}
      languages={languages}
      style={{
        formControlStyle: {
          background: theme?.primary?.main,
          border: 'none',
          borderRadius: '10px',
          height: '36px',
        },
      }}
    />

    //   <Select
    //     value={activeLanguage}
    //     onChange={handleChange}
    //     displayEmpty
    //     inputProps={{ 'aria-label': 'Without label' }}
    //     sx={{
    //       color: theme?.primary?.contrastText,
    //       border: 'none',
    //       borderRadius: '10px',
    //       width: '85px',
    //       height: '36px',
    //     }}
    //   >
    //     {map(languages, (lang) => (
    //       <MenuItem value={lang?.value}>{lang?.name}</MenuItem>
    //     ))}
    //   </Select>
    // </FormControl>
  );
};

export default LanguagePicker;
