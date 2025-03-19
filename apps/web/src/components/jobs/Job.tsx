import { GetJobResponse } from "@repo/types";

import React from "react";

import Link from "next/link";

import { untilNow } from "@/lib/untilNow";

const Job: React.FC<{ job: GetJobResponse }> = ({ job }) => {
  return (
    <div className="hover:bg-secondary border-b">
      <Link
        href={`/job/${job.id}`}
        className="text-foreground grid grid-cols-1 gap-2 p-4 md:grid-cols-5"
        aria-label={`Job: ${job.role} at ${job.company}`}>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">{job.role}</span>
        </div>

        <div className="text-sm">{job.location}</div>
        <div className="text-sm">{job.company}</div>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="bg-primary/20 text-primary rounded px-2 py-1">{0} New</span>
          <span className="bg-accent/20 text-accent-foreground rounded px-2 py-1">{0} Interview</span>
          <span className="bg-secondary/30 text-secondary-foreground rounded px-2 py-1">{0} Qualified</span>
        </div>

        <div className="text-muted-foreground text-sm">{untilNow(job.createdAt)}</div>
      </Link>
    </div>
  );
};
export default Job;
