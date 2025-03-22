import { useJob } from "@/hooks/useJob";
import { useJobApplications } from "@/hooks/useJobApplications";

import React from "react";

import ActionBar from "./ActionBar";
import Applications from "./Applications";
import { PaginationDemo } from "./PaginationFooter";
import TopBar from "./TopBar";

function JobApplications({ job_id }: { job_id: string }) {
  const { jobs, isLoadingJobs } = useJob();
  const jobApplicationsQry = useJobApplications(job_id);

  if (isLoadingJobs || jobApplicationsQry.isLoading) {
    return <> </>; // loading Skeleton
  }

  if (!jobs || !jobApplicationsQry.data) {
    return <></>; // error state
  }
  const currentJob = jobs.find((j) => j.id == job_id);

  if (!currentJob) {
    return <></>; //error state
  }

  const totalPages = Math.ceil((jobApplicationsQry.data.totalCandidates ?? 0) / 10);
  return (
    <div className="bg-background flex h-full flex-col overflow-hidden">
      <TopBar jobDetails={currentJob} />
      <ActionBar />
      <div className="flex-grow overflow-y-auto">
        <Applications job_id={job_id} />
      </div>
      <PaginationDemo totalPages={totalPages} />
    </div>
  );
}

export default JobApplications;
