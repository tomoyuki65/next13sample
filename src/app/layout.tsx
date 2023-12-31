import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@/contexts/AuthContext'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import ToastContainerWrapper from '@/components/common/Toastify'
import { getAllCookies } from '@/utils/getCookies'
import ReCertification from '@/components/common/ReCertification'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookies = getAllCookies();
  const session = cookies.n13s;

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          { session && <ReCertification /> }
          <ToastContainerWrapper />
          <Header />
          {children}
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  )
}
