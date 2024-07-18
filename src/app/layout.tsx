import "@/app/globals.css";
import "plyr-react/plyr.css";
import "react-toastify/dist/ReactToastify.css";

import { Inter as FontSans } from "next/font/google";

import { ThemeProvider } from "@/providers/theme-provider";

import Providers from "@/providers/query-provider";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-black font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster/>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
