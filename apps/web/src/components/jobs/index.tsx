"use client";

import { useJob } from "@/hooks/useJob";

import React from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Job from "./Job";

const Jobs: React.FC = () => {
  const router = useRouter();
  const { jobs } = useJob();

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Jobs List</CardTitle>
              <p className="text-sm text-gray-500">Manage your job postings and applications</p>
            </div>
            <Button
              onClick={() => {
                router.push("/job/new");
              }}>
              Add New Job
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full">
            <div className="border-b">
              <div className="grid grid-cols-5">
                <div className="p-4 text-sm font-medium text-gray-600">Job Title</div>
                <div className="p-4 text-sm font-medium text-gray-600">Location</div>
                <div className="p-4 text-sm font-medium text-gray-600">Company</div>
                <div className="p-4 text-sm font-medium text-gray-600">Candidates</div>
                <div className="p-4 text-sm font-medium text-gray-600">Created at</div>
              </div>
            </div>
            {jobs?.map((job) => {
              return <Job job={job} key={job.id} />;
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Jobs;
