import { toast } from "sonner";

import { useMutation, useQuery, useQueryClient } from "react-query";

import { usePathname, useRouter } from "next/navigation";

import { authApi } from "@/lib/api/auth.api";
import { CustomAxiosError } from "@/lib/axios";

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathName = usePathname();

  const recruiterQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: authApi.getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: !pathName.includes("login"),
  });
  const signupMutation = useMutation({
    mutationFn: (recruiter: Parameters<typeof authApi.signup>[0]) => authApi.signup(recruiter),
    onSuccess: (d) => {
      queryClient.setQueryData(["auth-user"], () => d);
      router.push("/jobs");
    },
    onError: (err: CustomAxiosError) => {
      toast.error(err.response.data.message);
    },
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: Parameters<typeof authApi.login>[0]) => authApi.login(credentials),
    onSuccess: (resp) => {
      queryClient.setQueryData(["auth-user"], () => resp.data);
      router.push("/jobs");
    },
    onError: (err: CustomAxiosError) => {
      toast.error(err.response.data.message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      queryClient.setQueryData(["auth-user"], null);
      router.push("/login");
    },
  });

  return {
    user: recruiterQuery.data,
    isAuthenticated: !!recruiterQuery.data,
    isFetching: recruiterQuery.isFetching,
    isError: recruiterQuery.isError,
    loginMutation,
    logoutMutation,
    signupMutation,
  };
}
