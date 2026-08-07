import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aivlab-site.ale-rizvan.chatgpt.site"),
  title: "AIVLAB | Practical, Validated and Governed AI Systems",
  description: "AIVLAB helps founders, SMEs, research teams, investors and regulated organisations discover, build, validate, govern and deploy practical AI systems.",
  icons: {
    icon: "/aivlab-logo-mark.png",
    shortcut: "/aivlab-logo-mark.png",
    apple: "/aivlab-logo-mark.png",
  },
  openGraph: {
    title: "AIVLAB | Practical, Validated and Governed AI Systems",
    description: "Transform AI ideas into real business value across the complete AI lifecycle.",
    images: [{ url: "/aivlab-logo-mark.png", width: 352, height: 324, alt: "AIVLAB logo" }],
  },
  twitter: {
    card: "summary",
    title: "AIVLAB | Practical, Validated and Governed AI Systems",
    description: "Transform AI ideas into real business value across the complete AI lifecycle.",
    images: ["/aivlab-logo-mark.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
