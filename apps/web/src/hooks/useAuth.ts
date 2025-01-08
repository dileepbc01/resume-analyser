import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useRouter, usePathname } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { LoginCredentials } from '@/types/auth';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathName = usePathname();
  const {
    data: user,
    isFetching,
    isError,
    status,
  } = useQuery({
    queryKey: ['auth-user'],
    queryFn: authApi.getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    enabled: !pathName.includes('login'), //TODO:
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], () => data.recruiterDetails);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(['auth-user'], null);
      router.push('/login');
    },
  });

  console.log('authed user', status);

  return {
    user,
    isAuthenticated: !!user,
    isFetching,
    isError,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isLoading,
    loginError: loginMutation.error,
  };
}
