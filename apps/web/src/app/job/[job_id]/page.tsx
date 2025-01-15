/* eslint-disable @next/next/no-async-client-component */
"use client"
import JobApplications from "@/components/JobApplications";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const params = useParams() as {
    job_id: string;
  };

  return <>
  <JobApplications job_id={params.job_id}/>
  </>
}