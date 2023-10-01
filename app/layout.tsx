import NextUIProvider from "@/components/provider/nextUi";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
