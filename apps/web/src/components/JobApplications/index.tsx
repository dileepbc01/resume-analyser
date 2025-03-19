import React from "react";

import ActionBar from "./ActionBar";
import Applications from "./Applications";
import TopBar from "./TopBar";

function JobApplications({ job_id }: { job_id: string }) {
  return (
    <div className="bg-background">
      <TopBar job_id={job_id} />
      <ActionBar />
      <Applications job_id={job_id} />
    </div>
  );
}

export default JobApplications;
