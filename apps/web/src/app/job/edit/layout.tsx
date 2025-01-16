"use client";

import React, { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { JobDetailsTab } from "@/components/EditJobDetails";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") ?? JobDetailsTab.Details;

  useEffect(() => {
    if (!searchParams.get("tab")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", JobDetailsTab.Details);
      router.push(`?${params.toString()}`);
    }
  }, [searchParams, router]);

  const setActiveTab = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="mt-2 flex h-full">
        <div className="w-80 border-r border-gray-200 p-6">
          <Tabs orientation="vertical" value={currentTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex w-full flex-col space-y-2 rounded-xl bg-white p-2 shadow-sm">
              <TabsTrigger
                value={JobDetailsTab.Details}
                className="w-full justify-start rounded-lg px-6 py-4 text-lg font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                Job Details
              </TabsTrigger>
              <TabsTrigger
                value={JobDetailsTab.Scoring}
                className="w-full justify-start rounded-lg px-6 py-4 text-lg font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                Scoring Parameters
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
