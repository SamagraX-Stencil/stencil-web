"use client"
import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
import { Button } from "@repo/ui/button";
import configObj from "@repo/configmanager";
import {CustomThemeProvider} from "@repo/provider"
import { Checkbox } from "@mui/material";
import {useColorPalates} from "@repo/hooks";
import { ChatUI } from "@repo/molecules";

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={[
        styles.gradient,
        conic ? styles.glowConic : undefined,
        small ? styles.gradientSmall : styles.gradientLarge,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}


const LINKS = [
  {
    title: "Docs",
    href: "https://turbo.build/repo/docs",
    description: "Find in-depth information about Turborepo features and API.",
  },
  {
    title: "Learn",
    href: "https://turbo.build/repo/docs/handbook",
    description: "Learn more about monorepos with our handbook.",
  },
  {
    title: "Templates",
    href: "https://turbo.build/repo/docs/getting-started/from-example",
    description: "Choose from over 15 examples and deploy with a single click.",
  },
  {
    title: "Deploy",
    href: "https://vercel.com/new",
    description:
      "Instantly deploy your Turborepo to a shareable URL with Vercel.",
  },
];

export default function Page(): JSX.Element {
  console.log('hello')
  console.log({configObj})
  return (
    <CustomThemeProvider>
        {/* {JSON.stringify({configObj})} */}
        <Custom/>
        {/* <ChatUI/> */}
    </CustomThemeProvider>
  );
}

const Custom =() => {
  const colors = useColorPalates();
  console.log({colors})
  return (
    <Checkbox defaultChecked />
  )
}
