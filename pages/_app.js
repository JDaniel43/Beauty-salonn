// pages/_app.js
import { SessionProvider } from "next-auth/react";
import { CategoryProvider } from "@/context/CategoryContext"; 
import "@/styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CategoryProvider>
        <Component {...pageProps} />
      </CategoryProvider>
    </SessionProvider>
  );
}
