import type { AppProps } from "next/app";
import { fontInter } from "@/styles/fonts";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={fontInter.className}>
      <Component {...pageProps} />
    </main>
  );
}
