import { JobResponse } from "@/types/routes/job";
import Link from "next/link";
import React from "react";

const Job: React.FC<{ job: JobResponse }> = ({ job }) => {
  const formatDate = (date: string) => {
    const days = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  const handleCheckbox = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when clicking checkbox
  };

  return (
    <div className="border-b hover:bg-gray-50">
      <Link 
        href={`/job/${job.id}`}
        className="grid grid-cols-1 md:grid-cols-5 gap-2 p-4"
        aria-label={`Job: ${job.role} at ${job.company}`}
      >
        <div className="flex items-center gap-3">
        
          <span className="text-sm font-medium">{job.role}</span>
        </div>
        
        <div className="text-sm">{job.location}</div>
        <div className="text-sm">{job.company}</div>
        
        <div className="flex gap-2 text-sm flex-wrap">
          <span className="rounded bg-blue-50 px-2 py-1 text-blue-700">
            {0} New
          </span>
          <span className="rounded bg-purple-50 px-2 py-1 text-purple-700">
            {0} Interview
          </span>
          <span className="rounded bg-green-50 px-2 py-1 text-green-700">
            {0} Qualified
          </span>
        </div>
        
        <div className="text-sm text-gray-600">
          {formatDate(job.createdAt)}
        </div>
      </Link>
    </div>
  );
};

export default Job;