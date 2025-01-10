import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isFetching, isError, } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      router.push('/login');
    }
  }, [isError, isFetching, router]);

  if (isFetching) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? <>{children}</> : null;
}
