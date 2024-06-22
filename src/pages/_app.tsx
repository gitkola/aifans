import { useRef } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { makeStore, AppStore } from "@/redux/store";
import "@/styles/globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { useEffect } from "react";
import { fetchUserRequest } from "@/redux/actions/userActions";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  useEffect(() => {
    const fetchUser = () => {
      try {
        storeRef.current?.dispatch(fetchUserRequest());
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);
  return (
    <Provider store={storeRef.current}>
      <div className="window flex flex-col">
        <Header />
        <main className={`flex-grow ${inter.className}`}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
