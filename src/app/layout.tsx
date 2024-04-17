import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

import GoogleOauthProvider from "@/provider/GoogleOauthProvider";
import RecoilProvider from "@/provider/RecoilProvider";
import ToastProvider from "@/provider/ToastProvider";

export const metadata: Metadata = {
  title: "디미고인 계정 센터",
  description: "그래그래 드디어 왔다 디미고인 계정 센터",
  openGraph:{
    title: "디미고인 계정 센터",
    siteName: "디미고인 계정 센터",
    description: "그래그래 드디어 왔다 디미고인 계정 센터",
    type: "website",
    url: "https://dimigo.net",
    locale: "ko_KR",
    images: [
      {
        url: "https://dimigo.net/public/og-image.png",
        width: 4800,
        height: 2520,
      }
    ],
  },
  appleWebApp: true,
  icons: [
    { 
      "url": "/favicon.ico", 
      "type": "image/x-icon", 
      "sizes": "16x16 32x32"
    },
    { 
      "url": "/public/icons/icon-192.png", 
      "type": "image/png", 
      "sizes": "192x192"
    },
    { 
      "url": "/public/icons/icon-512.png", 
      "type": "image/png", 
      "sizes": "512x512"
    },
      
  ],
  manifest: "/manifest.json",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="kr">
      <meta name="viewport" content="initial-scale=1, viewport-fit=cover, width=device-width"/>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fafaff"/>
      <meta name="theme-color" media="(prefers-color-scheme: dark)"  content="#000000"/>
      <link rel="apple-touch-icon" href="/public/icons/apple-touch-icon.png" />
      <body>
        <RecoilProvider>
          <ToastProvider>
            <GoogleOauthProvider>
              <main className="h-full">
                {children}
              </main>
            </GoogleOauthProvider>
          </ToastProvider>
        </RecoilProvider>
      </body>
    </html>
  );
};

export default RootLayout;