import { useJobApplications } from "@/hooks/useJobApplications";
import { ApplicationResponse } from "@repo/types";

import React, { useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Skeleton } from "../ui/skeleton";
import CandidateScoreCard from "./CandidateScoreCard";
import JobApplication from "./JobApplication";

const LoadingRow = () => (
  <TableRow>
    <TableCell>
      <div>
        <Skeleton className="mb-2 h-5 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </TableCell>
    <TableCell>
      <Skeleton className="h-5 w-24" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-5 w-28" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-5 w-20" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-5 w-24" />
    </TableCell>
  </TableRow>
);

const Applications = ({ job_id }: { job_id: string }) => {
  const jobApplicationsQry = useJobApplications(job_id);
  const applications = jobApplicationsQry.data?.applications ?? null;
  const [selJobApplication, setSelectedJobApplication] = useState<ApplicationResponse | null>(null);

  return (
    <>
      <div className="px-6 py-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sl. NO</TableHead>
              <TableHead>Candidate</TableHead>
              <TableHead>Current Job Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Resume Score</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobApplicationsQry.isLoading &&
              Array(5)
                .fill(0)
                .map((_, i) => <LoadingRow key={i} />)}
            {applications != null &&
              applications.map((jobApp) => {
                if (
                  jobApp.parsingStatus.status === "processing" ||
                  jobApp.parsingStatus.status === "not_started" ||
                  jobApp.parsingStatus.status === "failed"
                ) {
                  return <LoadingRow key={jobApp.applicationId} />;
                }
                return (
                  <JobApplication
                    key={jobApp.applicationId}
                    jobApplication={jobApp}
                    openJobApplication={() => {
                      setSelectedJobApplication(jobApp);
                    }}
                  />
                );
              })}
          </TableBody>
        </Table>
        <CandidateScoreCard
          jobApplication={selJobApplication}
          open={selJobApplication != null}
          setClose={() => setSelectedJobApplication(null)}
        />
      </div>
    </>
  );
};

export default Applications;
