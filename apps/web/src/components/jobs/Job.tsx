import { GetJobResponse } from "@repo/types";

import React from "react";

import Link from "next/link";

const Job: React.FC<{ job: GetJobResponse }> = ({ job }) => {
  const formatDate = (date: string) => {
    const days = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  };

  return (
    <div className="border-b hover:bg-gray-50">
      <Link
        href={`/job/${job.id}`}
        className="grid grid-cols-1 gap-2 p-4 md:grid-cols-5"
        aria-label={`Job: ${job.role} at ${job.company}`}>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">{job.role}</span>
        </div>

        <div className="text-sm">{job.location}</div>
        <div className="text-sm">{job.company}</div>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded bg-blue-50 px-2 py-1 text-blue-700">{0} New</span>
          <span className="rounded bg-purple-50 px-2 py-1 text-purple-700">{0} Interview</span>
          <span className="rounded bg-green-50 px-2 py-1 text-green-700">{0} Qualified</span>
        </div>

        <div className="text-sm text-gray-600">{formatDate(job.createdAt)}</div>
      </Link>
    </div>
  );
};

export default Job;
