import "normalize.css/normalize.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Inter } from "@next/font/google";
import { useMemo } from "react";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
// import typography from './typography';
import componentsOverride from "../components/overrides";
// import shadows, { customShadows } from './shadows';
const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const themeOptions = useMemo(
    () => ({
      pallete: {
        primary: {
          lighter: "#c6efff",
          light: "#a1ffff",
          dark: "#00acac",
          main: "#007994",
          darker: "#00f3f324",
          contrastText: "#0b1127",
        },
      },
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
