import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Header from '../components/Header/header';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3ProviderLibrary } from '../utils/webprovider';

function MyApp({ Component, pageProps }: AppProps) {
  return  <Web3ReactProvider getLibrary={Web3ProviderLibrary}>
    <Header><Component {...pageProps} />
    </Header>
    
              </Web3ReactProvider>

}

export default MyApp
