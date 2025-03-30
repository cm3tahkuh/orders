import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";


export const ThemeProvider = ({ children }) => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};

