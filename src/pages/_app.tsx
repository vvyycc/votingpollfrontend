import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Header from '../components/Header/header';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3ProviderLibrary } from '../utils/webprovider';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [active, setActive]= useState(false);


  return  <Web3ReactProvider getLibrary={Web3ProviderLibrary}>
    <Header setActive={setActive} ><Component isActive={active} {...pageProps} />
    </Header>
    
              </Web3ReactProvider>

}

export default MyApp
