import "./globals.css";
import Head from "next/head";

import type { Metadata } from "next";
import { i18n, type Locale } from "../../lib/i18n-config";
import { CSSProperties, HTMLAttributes } from "react";

export const metadata: Metadata = {
  title: 'DoJomle',
  description: 'Even the longest contents can be summarized In 2Sentences (DoJomle)',
  openGraph: {
    title: 'DoJomle',
    description: 'Even the longest contents can be summarized In 2Sentences (DoJomle)',
    url: 'https://DoJomle.ir',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Root(props: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await props.params;
  const { children } = props;

  let dir = "ltr";
  let font: CSSProperties  = {};
  if (lang === "fa") {
    dir = "rtl";
    font = {fontFamily: "Vazirmatn"}
  }

  return (
    <html lang={lang} dir={dir} style={font}>
      <Head>
        <link rel="canonical"  />
      </Head>
      <body>{children}</body>
    </html>
  );
}