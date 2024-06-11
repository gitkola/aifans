// src/pages/_app.tsx

import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import '../styles/globals.css';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const App = ({ Component, pageProps }: AppProps) => {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <div className="window flex flex-col">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default wrapper.withRedux(App);
