import { CreateJobDto, UpdateJobDto, UpdateScoringPromptDto } from "@repo/types";
import { toast } from "sonner";

import { useMutation, useQuery, useQueryClient } from "react-query";

import { useRouter } from "next/navigation";

import { jobApi } from "@/lib/api/job.api";
import { CustomAxiosError } from "@/lib/axios";

export const useJob = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch all jobs
  const {
    data: jobs,
    isLoading: isLoadingJobs,
    error: jobsError,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: jobApi.getAllJobs,
  });

  // Create job mutation
  const { mutate: createJob, isLoading: isCreating } = useMutation({
    mutationFn: (newJob: CreateJobDto) => jobApi.createJob(newJob),
    onSuccess: (d) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      router.push(`/job/${d.id}`);
    },
    onError: (error: CustomAxiosError) => {
      toast.error(error.response.data.message);
    },
  });

  // Update job mutation
  const { mutate: updateJob, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateJobDto }) => jobApi.updateJob(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  return {
    // Data
    jobs,
    createJob,
    updateJob,

    // Loading states
    isLoadingJobs,
    isCreating,
    isUpdating,

    // Errors
    jobsError,
  };
};

export const useUpdateScoringPrompt = (jobId: string) => {
  const { mutateAsync: updateScoringPrompt } = useMutation({
    mutationFn: ({ scoringPrompt }: UpdateScoringPromptDto) =>
      jobApi.updateScoringCriteria(jobId, scoringPrompt),
    onSuccess: () => {
      toast.success("Scoring prompt updated successfully");
      //TODO: Add success toast
    },
    onError: (error: CustomAxiosError) => {
      toast.error(error.response.data.message);
    },
    mutationKey: ["score-settings", jobId],
  });

  return {
    updateScoringPrompt,
  };
};

export const useGetScoringPromptSettings = (jobId: string) => {
  return useQuery({
    queryKey: ["score-settings", jobId],
    queryFn: () => jobApi.getJobScoringCriteria(jobId),
    onError(err: CustomAxiosError) {
      toast.error(err.response.data.message);
    },
  });
};
