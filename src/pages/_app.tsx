import { useState } from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { Provider as NextAuthProvider } from 'next-auth/client';

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
    <NextAuthProvider session={pageProps.session}>
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
    </NextAuthProvider>
  );
}

export default MyApp;
