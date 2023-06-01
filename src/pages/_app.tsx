import type { AppProps } from 'next/app';
import { fontInter } from '@/styles/fonts';
import '@/styles/globals.scss';
import { FirebaseProvider as AuthProvider } from '../contexts/FirebaseContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={fontInter.className}>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </main>
    );
}
