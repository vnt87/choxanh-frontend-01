import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

export function RootLayout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 transition-colors duration-200 flex flex-col">
      <div className="mx-auto max-w-7xl flex-grow w-full">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}