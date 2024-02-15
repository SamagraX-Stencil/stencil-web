import type { NextPage } from "next";
import Head from "next/head";
import { CookiesProvider } from "react-cookie";
import { ColorModeScript } from "@chakra-ui/react";
import { useLocalization } from "../src/hooks/useLocalization";
import dynamic from "next/dynamic";
import NavBar from "../src/components/NavBar";

const ChatUiWindow = dynamic(
  () => import('../src/components/ChatWindow/ChatUiWindow'),
  { ssr: false }
);

const Home: NextPage = () => {
  const t = useLocalization();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <meta name="theme-color" content="white" />
        <title> {t("label.subtitle")}</title>
      </Head>

      <CookiesProvider>
        <div
          style={{
            position: "fixed",
            width: "100%",
            bottom: "1%",
            top: "75px",
          }}
        >
          <ChatUiWindow />
          {/* <DownTimePage/> */}
        </div>
        <ColorModeScript />
      </CookiesProvider>
    </>
  );
};
export default Home;
