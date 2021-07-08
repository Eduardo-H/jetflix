import { useState } from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';

import { PlayerProvider } from '../hooks/usePlayer';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Loader } from '../components/Loader';

import { GlobalStyles } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
    setIsLoading(true);
  });

  Router.events.on('routeChangeComplete', (url) => {
    setIsLoading(false);
  });

  return (
    <PlayerProvider>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <Component {...pageProps} />
      )}
      
      <Footer />
      <GlobalStyles />
    </PlayerProvider>
  );
}

export default MyApp;
