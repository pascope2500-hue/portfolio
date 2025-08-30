import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Pascal Ndacyayisenga - Full Stack Web Developer Portfolio",
  description: "Professional portfolio of Pascal Ndacyayisenga, a Full Stack Web Developer specializing in Nodejs,php, express,mariadb...",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <GoogleReCaptchaProvider
          reCaptchaKey={process.env.RECAPTCHA_SITE_KEY!}
          scriptProps={{
            async: true,
            defer: true,
            appendTo: "head",
          }}
        >
          {children}
          </GoogleReCaptchaProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
