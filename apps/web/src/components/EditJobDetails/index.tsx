"use client";

import React from "react";
import { useQuery } from "react-query";

import { useSearchParams } from "next/navigation";

import { jobApi } from "@/lib/api/job.api";

import JobForm from "../jobs/JobForm";
import ParameterSlider from "../jobs/ParameterSlider";

export enum JobDetailsTab {
  Details = "details",
  Scoring = "scoring",
}

const JobDetails = ({ job_id }: { job_id: string }) => {
  const searchParams = useSearchParams();

  // Fetch all jobs
  const {
    data: job,
    isLoading: isLoadingJob,
    error: jobError,
  } = useQuery({
    queryKey: ["job", job_id],
    queryFn: () => {
      return jobApi.getJobById(job_id);
    },
  });

  if (isLoadingJob) {
    return <div>Loading...</div>; //TODO:
  }

  if (jobError) {
    return <div>{jobError as string}</div>; //TODO:
  }

  if (!job) {
    return <div>Job not found</div>; //TODO:
  }

  const currentTab = searchParams.get("tab") ?? JobDetailsTab.Details;

  return (
    <>
      {currentTab === JobDetailsTab.Details && (
        <JobForm
          onSubmit={() => {}}
          disabled={true}
          defaultValues={{
            company: job.company,
            role: job?.role,
            description: job.description,
            location: job.location,
            type: job.type,
          }}
          isEdit
        />
      )}
      {currentTab === JobDetailsTab.Scoring && <ParameterSlider jobId={job.id} />}
    </>
  );
};

export default JobDetails;
