import { AppProps } from 'next/app';

import { Navbar } from '../components/Navbar';

import '../styles/swiper.scss';
import { GlobalStyles } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <GlobalStyles />
    </>
  );
}

export default MyApp;
