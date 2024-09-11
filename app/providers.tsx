'use client';
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";
function Providers({children}:Readonly<{children:React.ReactNode}>) {
  return (
    <>
      {/* THIS IS For SHAD CN TOAST. */}
      <Toaster />
      <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange >
        {children}
      </ThemeProvider>
    </>
  )
}

export default Providers
