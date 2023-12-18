import { BrowserRouter } from "react-router-dom";

import './shared/forms/traducoesYup';

import { AppThemeProvider, AuthProvider, DrawerProvider } from "./shared/contexts";
import { Login, MenuLateral } from "./shared/components";
import { AppRoutes } from "./routes";
//import { ThemeProvider } from "@mui/material";
//import { DarkTheme, LightTheme } from "./shared/themes";

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>

        <Login>

          <DrawerProvider>
            <BrowserRouter>

              <MenuLateral>
                <AppRoutes />
              </MenuLateral>

            </BrowserRouter>
          </DrawerProvider>

        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
}
