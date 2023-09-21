import NextUIProvider from "@/components/provider/nextUi";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moneytor | The Money Monitorer",
  description: "Monitor your money with Moneytor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
