import { GetApplicationsDto } from "@repo/types";
import { toast } from "sonner";

import { useQuery } from "react-query";

import { applicationApi } from "@/lib/api/application.api";
import { CustomAxiosError } from "@/lib/axios";

export const useJobApplications = ({ job_id }: GetApplicationsDto) => {
  const applicationsQry = useQuery({
    refetchInterval: 2000,
    queryFn: () =>
      applicationApi.getApplications({
        job_id,
      }),
    queryKey: ["applications", job_id],
    onError: (error: CustomAxiosError) => {
      toast.error(error.response.data.message);
    },
  });
  return applicationsQry;
};
