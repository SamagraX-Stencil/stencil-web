import dynamic from "next/dynamic"
import { useEffect, useState } from "react";
const App = dynamic(() => import("../admin/App"), { ssr: false })

const Home = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <App key={Date.now()} />;
};

export default Home;