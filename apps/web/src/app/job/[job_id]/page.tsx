"use client";

import React from "react";

import { useParams } from "next/navigation";

import JobApplications from "@/components/JobApplications";

export default function Page() {
  const params = useParams() as {
    job_id: string;
  };

  return (
    <>
      <JobApplications job_id={params.job_id} />
    </>
  );
}
