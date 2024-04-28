import { createContext } from "react";
import { Theme } from "@mui/material/styles";


export type Color = {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

interface ThemeContextType {
  theme: Theme;
  modifyTheme: (changes: Partial<Theme>) => void;
  modifyPaletes: (paletes: Color) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

