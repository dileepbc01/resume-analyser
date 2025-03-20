import React from "react";

import ActionBar from "./ActionBar";
import Applications from "./Applications";
import { PaginationDemo } from "./PaginationFooter";
import TopBar from "./TopBar";

function JobApplications({ job_id }: { job_id: string }) {
  return (
    <div className="bg-background flex h-full flex-col overflow-hidden">
      <TopBar job_id={job_id} />
      <ActionBar />
      <div className="flex-grow overflow-y-auto">
        <Applications job_id={job_id} />
      </div>
      <PaginationDemo />
    </div>
  );
}

export default JobApplications;
