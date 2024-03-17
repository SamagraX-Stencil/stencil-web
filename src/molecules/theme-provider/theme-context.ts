import { createContext } from "react";

import { Theme } from "@mui/material/styles";
 
import { Theme, createTheme } from "@mui/material/styles";
  dev import { Color } from "../../components/theme-picker";

interface ThemeContextType {
  theme: Theme;
  modifyTheme: (changes: Partial<Theme>) => void;
  modifyPaletes: (paletes: Color)=>void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
 
  undefined
 
{

    theme: createTheme(), // Replace with your default theme creation function
    modifyTheme: () => {}, // Empty function for now
    modifyPaletes: () => {} // Empty function for now
  }
 
);

