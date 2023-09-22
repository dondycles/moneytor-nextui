import NextUIProvider from "@/components/provider/nextUi";
import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body>
          <NextUIProvider>{children}</NextUIProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
