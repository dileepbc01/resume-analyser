"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useJob } from "@/hooks/useJob";

import React from "react";

import JobForm from "./JobForm";

export const New = () => {
  const { createJob } = useJob();

  const onSubmit = (data: any) => {
    createJob({ ...data });
  };
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Create New Job</h1>
      <JobForm
        onSubmit={onSubmit}
        defaultValues={{
          role: "",
          type: "full-time",
          location: "",
          company: "",
          description: "",
        }}
        disabled={false}
        isEdit={false}
      />
    </div>
  );
};
