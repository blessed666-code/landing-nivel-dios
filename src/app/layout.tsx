import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProgressProvider } from "@/context/ProgressContext";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plan Maestro de Educación Nivel Dios — Bendecido",
  description: "Senior en IA, Datos, MLOps, IO y Gestión de Operaciones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} antialiased selection:bg-gold/30`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ProgressProvider>
            <div className="relative min-h-screen">
              <Navbar />
              <AnimatedBackground />
              <main className="pt-20">
                {children}
              </main>
              
              <footer className="py-20 border-t border-border/50 bg-background/50 backdrop-blur-sm mt-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                  <p className="text-muted-foreground text-sm">
                    Plan Maestro de Educación Nivel Dios · Bendecido · {new Date().getFullYear()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Construido con Next.js, Tailwind y Amor por la Ingeniería.
                  </p>
                </div>
              </footer>
            </div>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
