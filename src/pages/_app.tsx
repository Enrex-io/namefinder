import type { AppProps } from 'next/app';
import { fontInter } from '@/styles/fonts';
import '@/styles/globals.scss';
import { ProvideAuth } from '@/hooks/useAuth';
import './login.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={fontInter.className}>
            <ProvideAuth>
                <Component {...pageProps} />
            </ProvideAuth>
        </main>
    );
}
