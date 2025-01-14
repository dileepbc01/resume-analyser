/* eslint-disable @next/next/no-async-client-component */
"use client"
import JobDetails from "@/components/JobDetails";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const params = useParams() as {
    job_id: string;
  };

  return <>
    <JobDetails job_id={(params).job_id}/>
  </>
}