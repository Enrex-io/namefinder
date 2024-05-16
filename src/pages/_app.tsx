import type { AppProps } from 'next/app';
import '@/styles/globals.scss';
import { FirebaseProvider as AuthProvider } from '../contexts/FirebaseContext';
import { SnackbarProvider } from '@/contexts/SnackbarContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { SWRConfig } from 'swr';
import { PopupProvider } from '@/contexts/PopupContext';
import axios from '@/utils/axios';
import NextAdapterApp from 'next-query-params/app';
import { QueryParamProvider } from 'use-query-params';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <AuthProvider>
            <SnackbarProvider>
                <PopupProvider>
                    <ThemeProvider theme={theme}>
                        <QueryParamProvider adapter={NextAdapterApp}>
                            <SWRConfig
                                value={{
                                    provider: () => new Map(),
                                    refreshInterval: 5000,
                                    fetcher: (url: string) =>
                                        axios.get(url).then((res) => res.data),
                                }}
                            >
                                {getLayout(<Component {...pageProps} />)}
                            </SWRConfig>
                        </QueryParamProvider>
                    </ThemeProvider>
                </PopupProvider>
            </SnackbarProvider>
        </AuthProvider>
    );
}

export default App;
