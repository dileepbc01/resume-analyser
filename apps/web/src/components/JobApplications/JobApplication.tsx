import { GetApplicationResponse } from "@repo/types";
import { CheckCircle2Icon, Circle, CircleX } from "lucide-react";

import React from "react";

import { TableCell, TableRow } from "@/components/ui/table";

import { untilNow } from "@/lib/untilNow";

const JobApplication = ({ jobApplication }: { jobApplication: GetApplicationResponse }) => {
  return (
    <>
      <TableRow key={jobApplication.application_id}>
        <TableCell>
          <div>
            <div className="font-medium">{jobApplication.full_name}</div>
            <div className="text-sm text-gray-500">{jobApplication.current_role}</div>
          </div>
        </TableCell>
        <TableCell>
          {/* <Badge
                    variant={jobApplication.matchPercentage === 0 ? "destructive" : "secondary"}
                    className="font-normal">
                    {jobApplication.matchPercentage === 0
                      ? "Not a match - 0%"
                      : `Good match - ${jobApplication.matchPercentage}%`}
                  </Badge> */}
        </TableCell>
        <TableCell>{jobApplication.current_role}</TableCell>
        <TableCell>{jobApplication.location}</TableCell>
        <TableCell>{untilNow(jobApplication.createdAt)}</TableCell>
        <TableCell>
          <StatusColumn jobApplication={jobApplication} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default JobApplication;

const StatusColumn = ({ jobApplication }: { jobApplication: GetApplicationResponse }) => {
  if (
    jobApplication.parsingStatus.status == "processing" ||
    jobApplication.scoringStatus.status == "processing"
  ) {
    return (
      <div className="flex items-center">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-500 border-t-transparent" />
        <span className="ml-2 text-yellow-500">Processing...</span>
      </div>
    );
  } else if (jobApplication.parsingStatus.status == "not_started") {
    return (
      <div className="flex items-center">
        <Circle className="h-4 w-4 text-gray-500" />
        <span className="ml-2 text-gray-500">Not Started</span>
      </div>
    );
  } else if (jobApplication.scoringStatus.status == "completed") {
    return (
      <div className="flex items-center">
        <CheckCircle2Icon className="h-4 w-4 text-green-500 dark:text-green-400" />
        <span className="ml-2 text-green-500">Completed</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center">
        <CircleX className="h-4 w-4 text-red-500" />
        <span className="ml-2 text-red-500">Failed</span>
      </div>
    );
  }

  return <></>;
};
