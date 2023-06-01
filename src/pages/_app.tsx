import type { AppProps } from 'next/app';
import { fontInter } from '@/styles/fonts';
import '@/styles/globals.scss';
import { FirebaseProvider as AuthProvider } from '../contexts/FirebaseContext';
import { SnackbarProvider } from '@/contexts/SnackbarContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={fontInter.className}>
            <AuthProvider>
                <SnackbarProvider>
                    <ThemeProvider theme={theme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </SnackbarProvider>
            </AuthProvider>
        </main>
    );
}
