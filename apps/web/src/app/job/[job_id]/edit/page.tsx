"use client";

import React from "react";

import { useParams } from "next/navigation";

import JobDetails from "@/components/EditJobDetails";

const Page = () => {
  const params = useParams();
  const job_id = params.job_id as string;
  if (!job_id) {
    return <>404</>; //TODO:
  }
  return (
    <>
      <JobDetails job_id={job_id} />
    </>
  );
};

export default Page;
