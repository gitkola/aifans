import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import { appInitRequest } from "@/redux/actions/appActions";
import { useAppDispatchRef, useAppSelector } from "@/redux/hooks/reduxHooks";


const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <div className="window flex flex-col">
        <main className={`flex-grow ${inter.className}`}>
          <Header />
          <WithAppInitialization>
            <Component {...pageProps} />
          </WithAppInitialization>
          <Footer />
        </main>
      </div>
    </Provider>
  );
};

export default App;


function WithAppInitialization(props: { children: JSX.Element }) {
  const { loading, error, initialized } = useAppSelector(state => state.app);
  const dispatch = useAppDispatchRef();
  useEffect(() => {
    if (!loading && !initialized) {
      const initApp = () => {
        dispatch(appInitRequest());
      };
      initApp();
    };
  }, [loading, initialized, dispatch]);

  console.log('WithAppInitialization', { loading, error, initialized })
  return (
    <>
      {
        loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-2xl text-gray-500">Loading...</div>
          </div>
        )
      }
      {
        error && (
          <div className="flex items-center justify-center h-64">
            <div className="text-2xl text-red-500">{error}</div>
          </div>
        )
      }
      {
        initialized && props.children
      }
    </>
  );
}