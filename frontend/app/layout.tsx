import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['200', '300', '500', '700', '800'],
  variable: '--font-bricolage'
})

export const metadata: Metadata = {
  title: "ETH Global Bangkok",
  description: "Manzana Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bricolage_grotesque.variable}>
        {children}
      </body>
    </html>
  );
}
