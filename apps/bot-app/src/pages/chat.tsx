import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useLocalization } from "../hooks/useLocalization";
import { useContext } from "react";
import { AppContext } from "../context";
import styles from "../components/dialer-popup/index.module.css";
import DialerPopUp from "../components/dialer-popup";
import { useConfig } from "../hooks/useConfig";

const ChatUi = dynamic(() => import("../components/chat-window"), {
  ssr: false,
});

const Chat: NextPage = () => {
  const t = useLocalization();
  const context = useContext(AppContext);
  const config = useConfig("component", "botDetails");
  console.log("hola",{config})
  return (
    <>
      <Head>
        <title>{t("label.tab_title")}</title>
        <link rel="icon" href={config?.favicon} />
        
      </Head>
      {context?.showDialerPopup && (
        <div
          className={styles.overlay}
          // onClick={() => context?.setShowDialerPopup(false)}
        >
          {/* Only render the DialerPopup component when showDialerPopup is true */}
          {context?.showDialerPopup && (
            <DialerPopUp setShowDialerPopup={context?.setShowDialerPopup} />
          )}
        </div>
      )}

      <div
        style={{
          position: "fixed",
          width: "100%",
          bottom: "1vh",
          top: "100px",
        }}
      >
        <ChatUi />
      </div>
    </>
  );
};
export default Chat;
