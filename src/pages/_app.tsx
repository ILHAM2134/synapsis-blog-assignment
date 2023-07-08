import { AppProps } from "next/app";
import HeadComponent from "@/components/Head";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <HeadComponent />
      <div>
        <Navbar />
        <Component className="min-h-screen" {...pageProps} />
      </div>
    </div>
  );
}
