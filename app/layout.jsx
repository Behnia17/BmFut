import "./globals.css";

export const metadata = {
  title: "BmFut",
  description: "Live football scores, standings, scorers, and match intelligence.",
  applicationName: "BmFut",
  authors: [{ name: "BmFut" }],
  generator: "BmFut",
  copyright: "BmFut",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
