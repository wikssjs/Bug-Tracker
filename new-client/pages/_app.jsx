import "normalize.css/normalize.css";
import "../styles/globals.css";
import { LoaderProvider } from "../component/LoaderContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import jwt from "jsonwebtoken";
import { Roboto_Flex, Montserrat } from "@next/font/google";
import Layout from "../component/Layout";
import Scripts from "../component/Scripts";
import { useEffect, useState } from "react";

const roboto = Roboto_Flex({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
   
  }, []);

  return (
    <>
      <style jsx global>
        {`
          main {
            min-height: 100vh;
          }
        `}
      </style>
      <Scripts />
      <LoaderProvider>
        <Layout user={currentUser}>
          <Component {...pageProps} user={currentUser}/>
        </Layout>
      </LoaderProvider>
    </>
  );
}
