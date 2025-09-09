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
import { PageTransitionProvider } from "../_client/components/layout/PageTransitionProvider";

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
            <PageTransitionProvider>
              {/* Main App Structure */}
              <div className="min-h-screen flex flex-col">
                <Header />
                
                {/* Main Content Area */}
                <main className="flex-1 relative">
                  {children}
                </main>
                
                <Footer />
              </div>

              {/* Toast Notifications with Enhanced Styling */}
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

              {/* Global Loading Overlay for Large Transitions */}
              <div id="global-loading" className="hidden fixed inset-0 z-50 bg-body dark:bg-dark_body bg-opacity-80 backdrop-blur-sm">
                <div className="flex items-center justify-center min-h-screen">
                  <div className="bg-white dark:bg-dark_heading rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple_main border-t-transparent rounded-full animate-spin"></div>
                      <h3 className="text-lg font-semibold text-heading_main dark:text-dark_heading_main mb-2">
                        Loading Page
                      </h3>
                      <p className="text-base_one dark:text-dark_base_one text-sm">
                        Please wait while we prepare your content...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </PageTransitionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default Layout