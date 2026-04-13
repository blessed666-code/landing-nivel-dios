import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProgressProvider } from "@/context/ProgressContext";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Plan Maestro de Educación Nivel Dios — Bendecido",
  description:
    "Ruta estratégica Senior en IA, Datos, MLOps, IO y Gestión de Operaciones. 14 semestres, 98 proyectos facturables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-[Inter,system-ui,sans-serif] antialiased`}>
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
              <main className="pt-20" id="main-content" role="main">
                {children}
              </main>

              <footer
                className="py-16 border-t border-border/50 bg-[var(--background)]/80 backdrop-blur-sm mt-20"
                role="contentinfo"
              >
                <div className="max-w-7xl mx-auto px-6 text-center">
                  <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                    Plan Maestro de Educación Nivel Dios · Bendecido ·{" "}
                    {new Date().getFullYear()}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-2">
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
