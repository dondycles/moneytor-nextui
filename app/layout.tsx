import NextUIProvider from "@/components/provider/nextUi";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://moneytor-ph.vercel.app/"),
  title: "Moneytor",
  description: "Manage your finances with ease using Moneytor.",
  themeColor: "#f",
  twitter: {
    title: "Moneytor",
    description: "Manage your finances with ease using Moneytor.",
    card: "summary_large_image",
    creator: "@dondycles",
    images: {
      url: "/summary.png",
      alt: "Moneytor",
    },
  },
  openGraph: {
    title: "Moneytor",
    description: "Manage your finances with ease using Moneytor.",
    type: "website",
    siteName: "Moneytor",
    url: "https://moneytor-ph.vercel.app/",
    images: [
      {
        url: "/summary.png",
        width: 800,
        height: 800,
      },
      {
        url: "/summary.png",
        width: 1920,
        height: 1080,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <NextUIProvider>{children}</NextUIProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
