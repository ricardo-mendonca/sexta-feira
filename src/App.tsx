import { BrowserRouter } from "react-router-dom";

import './shared/forms/traducoesYup';

import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { MenuLateral } from "./shared/components";
import { AppRoutes } from "./routes";
//import { ThemeProvider } from "@mui/material";
//import { DarkTheme, LightTheme } from "./shared/themes";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
      
      <BrowserRouter>

        <MenuLateral>
          <AppRoutes />
        </MenuLateral>
        
      </BrowserRouter>

      </DrawerProvider>
    </AppThemeProvider>
  );
}
