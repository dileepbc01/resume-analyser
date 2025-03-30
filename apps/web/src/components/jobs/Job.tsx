import { GetJobResponse } from "@repo/types";

import React from "react";

import Link from "next/link";

import { untilNow } from "@/lib/untilNow";

const Job: React.FC<{ job: GetJobResponse }> = ({ job }) => {
  return (
    <div className="hover:bg-secondary border-b">
      <Link
        href={`/job/${job.id}`}
        className="text-foreground grid grid-cols-4 gap-2 p-4"
        aria-label={`Job: ${job.role} at ${job.company}`}>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">{job.role}</span>
        </div>

        <div className="text-sm">{job.location}</div>
        <div className="text-sm">{job.company}</div>

        <div className="text-muted-foreground text-sm">{untilNow(job.createdAt)}</div>
      </Link>
    </div>
  );
};
export default Job;
