import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthModalProvider } from "@/components/auth/auth-modal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AuthModalProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </AuthModalProvider>
    </ThemeProvider>
  );
}
