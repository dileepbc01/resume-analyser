import { GetApplicationResponse } from "@repo/types";

import React from "react";

import { TableCell, TableRow } from "@/components/ui/table";

const JobApplication = ({ jobApplication }: { jobApplication: GetApplicationResponse }) => {
  return (
    <>
      <TableRow key={jobApplication.id}>
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
        <TableCell>{jobApplication.createdAt}</TableCell>
      </TableRow>
    </>
  );
};

export default JobApplication;
