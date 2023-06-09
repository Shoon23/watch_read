import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Head>
          <title>Watch & Read</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="icon"
            href="https://png.pngtree.com/png-clipart/20200224/original/pngtree-mv-vm-letter-vector-logo-png-image_5249394.jpg"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
