import { GetApplicationResponse } from "@repo/types";
import { CheckCircle2Icon, Circle, CircleX } from "lucide-react";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";

import { untilNow } from "@/lib/untilNow";

import { Badge } from "../ui/badge";

const JobApplication = ({
  jobApplication,
}: {
  jobApplication: GetApplicationResponse["applications"][0];
}) => {
  return (
    <>
      <TableRow key={jobApplication.applicationId}>
        <TableCell>{jobApplication.slNo}</TableCell>
        <TableCell>
          <div className="flex items-center">
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src={""} alt={jobApplication.fullName} />
              <AvatarFallback>{jobApplication.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="font-medium">{jobApplication.fullName}</div>
          </div>
        </TableCell>

        <TableCell>{jobApplication.currentRole}</TableCell>
        <TableCell>{jobApplication.location}</TableCell>
        {/* <TableCell>
          {jobApplication.resumeScore && <>mjknjn</>}
          {jobApplication.resumeScore && jobApplication.resumeScore >= 0 && (
            <Badge
              variant={jobApplication.resumeScore === 0 ? "destructive" : "secondary"}
              className="font-normal">
              {jobApplication.resumeScore === 0
                ? "Not a match - 0%"
                : `Good match - ${jobApplication.resumeScore}%`}
              smss
            </Badge>
          )}
          <Badge
            variant={jobApplication.resumeScore === 0 ? "destructive" : "secondary"}
            className="font-normal">
            {jobApplication.resumeScore === 0
              ? "Not a match - 0%"
              : `Good match - ${jobApplication.resumeScore}%`}
          </Badge>
        </TableCell> */}
        <TableCell>
          <StatusColumn jobApplication={jobApplication} />
        </TableCell>
        <TableCell>{untilNow(jobApplication.createdAt)}</TableCell>
      </TableRow>
    </>
  );
};

export default JobApplication;

const StatusColumn = ({ jobApplication }: { jobApplication: GetApplicationResponse["applications"][0] }) => {
  console.log(jobApplication.resumeScore, "score");
  let content;
  switch (true) {
    case jobApplication.parsingStatus.status === "not_started":
      content = (
        <div className="flex items-center">
          <Circle className="h-4 w-4 text-gray-500" />
          <span className="ml-2 text-gray-500">Queueing For Parsing</span>
        </div>
      );
      break;
    case jobApplication.parsingStatus.status === "processing":
      content = (
        <div className="flex items-center">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-500 border-t-transparent" />
          <span className="ml-2 text-yellow-500">Parsing</span>
        </div>
      );
      break;
    case jobApplication.parsingStatus.status === "failed":
      content = (
        <div className="flex items-center">
          <CircleX className="h-4 w-4 text-red-500" />
          <span className="ml-2 text-red-500">Parsing Failed</span>
        </div>
      );
      break;
    case jobApplication.scoringStatus.status === "not_started":
      content = (
        <div className="flex items-center">
          <Circle className="h-4 w-4 text-gray-500" />
          <span className="ml-2 text-gray-500">Queueing For Scoring</span>
        </div>
      );
      break;
    case jobApplication.scoringStatus.status === "processing":
      content = (
        <div className="flex items-center">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-500 border-t-transparent" />
          <span className="ml-2 text-yellow-500">Scoring</span>
        </div>
      );
      break;
    case jobApplication.scoringStatus.status === "failed":
      content = (
        <div className="flex items-center">
          <CircleX className="h-4 w-4 text-red-500" />
          <span className="ml-2 text-red-500">Scoring Failed</span>
        </div>
      );
      break;
    case jobApplication.scoringStatus.status === "completed":
      content = (
        <div className="flex items-center">
          {jobApplication.resumeScore && jobApplication.resumeScore >= 0 && (
            <Badge
              variant={jobApplication.resumeScore === 0 ? "destructive" : "secondary"}
              className="font-normal">
              {jobApplication.resumeScore === 0
                ? "Not a match - 0%"
                : `Good match - ${jobApplication.resumeScore}%`}
              smss
            </Badge>
          )}
          <CheckCircle2Icon className="h-4 w-4 text-green-500 dark:text-green-400" />
        </div>
      );
      break;
    default:
      content = null;
  }

  return content;
};
