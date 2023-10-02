import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import CompanyTrust from '@/components/featureCard/CompanyTrust'
import { Providers } from '@/redux/provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BeyondBazar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} > 
        <Providers>
          <Navbar/>
          {children}
          <CompanyTrust/>
          <Footer/>
        </Providers>
      </body>
    </html>
  )
}
