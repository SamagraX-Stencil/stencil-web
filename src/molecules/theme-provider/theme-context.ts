import { createContext } from "react";
 

import { Theme } from "@mui/material/styles";
 
 
 
 
 
 
import { Color } from "../../components/theme-picker";
 

interface ThemeContextType {
  theme: Theme;
  modifyTheme: (changes: Partial<Theme>) => void;
  modifyPaletes: (paletes: Color)=>void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
 
  undefined
 
 
 
);

