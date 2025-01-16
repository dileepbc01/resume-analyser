import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isFetching, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      router.push("/login");
    }
  }, [isError, isFetching, router]);

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
