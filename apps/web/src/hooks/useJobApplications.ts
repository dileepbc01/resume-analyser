import { GetApplicationsDto } from "@repo/types";
import { toast } from "sonner";

import { useQuery } from "react-query";

import { useSearchParams } from "next/navigation";

import { applicationApi } from "@/lib/api/application.api";
import { CustomAxiosError } from "@/lib/axios";

export const useJobApplications = (jobId: string) => {
  const searchParams = useSearchParams();
  const pageNo = searchParams.get("page_number") as GetApplicationsDto["sort_order"];
  const searchBy = searchParams.get("search_by") as GetApplicationsDto["search_by"];
  const searchTerm = searchParams.get("search_term") as GetApplicationsDto["search_term"];
  const sortBy = searchParams.get("sort_by") as GetApplicationsDto["sort_by"];
  const sortOrder = searchParams.get("sort_order") as GetApplicationsDto["sort_order"];

  const dto: GetApplicationsDto = {
    job_id: jobId,
    sort_by: sortBy ?? "Name",
    sort_order: sortOrder ?? "Asc",
    page_number: pageNo ? Number(pageNo) : 1,
    search_by: searchBy,
    search_term: searchTerm,
  };
  const applicationsQry = useQuery({
    refetchInterval: 2000,
    queryFn: () => applicationApi.getApplications(dto),
    queryKey: ["applications", dto.job_id],
    onError: (error: CustomAxiosError) => {
      toast.error(error.response.data.message);
    },
  });
  return applicationsQry;
};
