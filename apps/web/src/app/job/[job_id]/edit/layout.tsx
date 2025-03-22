"use client";

import React from "react";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { JobDetailsTab } from "@/components/EditJobDetails";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const currentTab = searchParams.get("tab") ?? JobDetailsTab.Details;

  return (
    <div className="flex">
      {/* Left sidebar */}
      <div className="border-border bg-card w-64 shrink-0 border-r">
        <div className="p-4 pb-2">
          <h3 className="text-card-foreground mb-4 text-lg font-medium">Job Configuration</h3>
          <div className="flex flex-col space-y-1">
            <Link
              href={`${pathName}?tab=${JobDetailsTab.Details}`}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                currentTab === JobDetailsTab.Details
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}>
              Job Details
            </Link>
            <Link
              href={`${pathName}?tab=${JobDetailsTab.Scoring}`}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                currentTab === JobDetailsTab.Scoring
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}>
              Scoring Parameters
            </Link>
          </div>
        </div>
      </div>

      {/* Main content - NO overflow property here */}
      <div className="flex-1">
        <div className="mx-auto h-[calc(100vh-96px)] w-full max-w-3xl overflow-y-scroll p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
