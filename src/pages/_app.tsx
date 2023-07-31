

import { AppProps } from 'next/app';
import { wrapper } from '@/redux/app/store';
import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
