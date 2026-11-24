import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Razi ur Rehman | Full-Stack Developer",
  description:
    "Portfolio of Razi ur Rehman, a full-stack developer in Islamabad building with React, Next.js, Node.js, FastAPI and LLMs.",
  keywords: ["Razi ur Rehman", "Full-Stack Developer", "Next.js", "React", "Node.js", "FastAPI", "Islamabad"],
  authors: [{ name: "Razi ur Rehman" }],
  openGraph: {
    title: "Razi ur Rehman | Full-Stack Developer",
    description: "React, Next.js, Node.js, FastAPI and AI integration. Selected work and experience.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05050a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237c5cff'/%3E%3Cstop offset='1' stop-color='%2322d3ee'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='16' fill='url(%23g)'/%3E%3Ctext x='32' y='44' font-family='Arial' font-weight='700' font-size='34' text-anchor='middle' fill='white'%3ER%3C/text%3E%3C/svg%3E"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
