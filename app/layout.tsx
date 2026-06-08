import type { Metadata } from "next";

import './styles/globals.css';
import './styles/Normalize.css'
import { CartProvider } from "./context/CartContext";
import { Providers } from "./context/ThemeProvider";

export const metadata: Metadata = {
  title: "READORA",
  description: "Readora is a bookstore website that you can buy or rent books from it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <CartProvider>
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
