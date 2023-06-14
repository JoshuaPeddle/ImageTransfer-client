import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {

  interface Palette {
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }

}

const theme = createTheme({
  palette: {
 
    primary: {
      // Purple and green play nicely together.
      main: '#006DA3',
    },
    secondary: {
      // Green
      main: '#3b5249',
    },
    accent: {
      // This is green.A700 as hex.
      main: '#827191',
      light: '#B8AEC1',
    },
  },
});
export default function App({
  Component,
  pageProps,
} : AppProps<{session:Session}>) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}
