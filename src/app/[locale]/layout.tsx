import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { inter_sans } from "../_client/libs/fonts";
import { Header } from "../_client/components/layout/header";
import { Footer } from "../_client/components/layout/footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "VDA - YouTube Video Downloader",
  description: "Download YouTube videos in various formats quickly and easily",
};

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

const Layout = async({ children, params }: LayoutProps) => {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning lang={locale}>
      <body 
        className={`${inter_sans} font-inter bg-body dark:bg-dark_body transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <NextIntlClientProvider messages={messages}>
            {/* Main App Structure - No PageTransitionProvider */}
            <div className="min-h-screen flex flex-col">
              <Header />
              
              {/* Main Content Area - No animations */}
              <main className="flex-1 relative">
                {children}
              </main>
              
              <Footer />
            </div>

            {/* Toast Notifications */}
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              className="toast-container"
              toastClassName="toast-item"
              bodyClassName="toast-body"
              progressClassName="toast-progress"
            />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default Layout