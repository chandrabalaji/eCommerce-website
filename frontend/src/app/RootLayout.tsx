"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function AppRootLayout({ children }: any) {
  const pathname = usePathname();
  const isAdminPanale = pathname.startsWith("/admin");

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {isAdminPanale ? (
          <>{children}</>
        ) : (
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        )}
      </QueryClientProvider>
    </>
  );
}
