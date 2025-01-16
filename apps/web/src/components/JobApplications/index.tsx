import React from "react";

import ActionBar from "./ActionBar";
import Applications from "./Applications";
import TopBar from "./TopBar";

function JobApplications({ job_id }: { job_id: string }) {
  return (
    <div className="bg-white">
      <TopBar job_id={job_id} />
      <ActionBar />
      <Applications />
    </div>
  );
}

export default JobApplications;
