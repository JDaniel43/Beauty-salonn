import { SessionProvider } from "next-auth/react"
import { CategoryProvider } from "@/context/CategoryContext"; 
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <CategoryProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      </CategoryProvider>
    
  )
}