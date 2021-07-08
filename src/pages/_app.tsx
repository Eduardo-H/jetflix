import { AppProps } from 'next/app';

import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import { GlobalStyles } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <GlobalStyles />
    </>
  );
}

export default MyApp;
