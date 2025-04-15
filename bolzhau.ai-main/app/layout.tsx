import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bolzhau',
  description: 'Bolzhau',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet"></link>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex flex-grow items-center justify-center container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
