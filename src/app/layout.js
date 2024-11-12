
import 'core-js/stable'; 
import 'regenerator-runtime/runtime';
import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import CompanyTrust from '@/components/featureCard/CompanyTrust'
import { Providers } from '@/redux/provider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleProvider from '@/components/googleProvider/googleProvider'
import { GoogleTagManager } from '@next/third-parties/google' 
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL(process.env.FRONTENDURL),
  title: {
    default: "biyond Bazar",
    template: `%s | biyond Bazar`,
  },
  description: "biyond bazar",
};

export default function RootLayout({ children, params }) {
  const { isAdmin } = params

  return (
    <html lang="en">
      <body className={inter.className} >
      <GoogleTagManager gtmId="GTM-PN22X6ZG" />
        <GoogleProvider>
          <Providers>
            {isAdmin ? "" : <Navbar />}
            {children}
            {isAdmin ? "" : <>
              <CompanyTrust />
              <Footer />
            </>}

          </Providers>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </GoogleProvider>
      </body>
    </html>
  )
}
