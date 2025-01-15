import { useAuth } from "@/hooks/useAuth";
import { Briefcase, LogOut, Moon, User } from "lucide-react";

import React, { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const { logoutMutation } = useAuth();

  function handleLogout() {
    logoutMutation.mutate();
  }

  const NavItem = ({
    icon: Icon,
    label,
    tabName,
    onClick,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    tabName: string;
    onClick?: () => void;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <li
            className={`flex cursor-pointer items-center justify-center rounded-md p-3 hover:bg-gray-100 ${
              activeTab === tabName ? "bg-gray-100" : ""
            }`}
            onClick={onClick || (() => setActiveTab(tabName))}>
            <Icon className="h-5 w-5 text-gray-600" />
          </li>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="flex w-16 flex-col border-r bg-gray-100">
          <div className="flex justify-center border-b p-4">
            <Image src={"/app-logo.png"} width={30} height={30} alt="app-logo" />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <nav className="p-4">
              <ul className="space-y-2">
                <NavItem icon={Briefcase} label="Jobs" tabName="jobs" onClick={() => router.push("/jobs")} />
              </ul>
            </nav>

            <div className="space-y-2 border-t p-4">
              <NavItem
                onClick={() => {
                  //
                }}
                icon={Moon}
                label="Change Theme"
                tabName="theme"
              />
              <NavItem icon={LogOut} label="Logout" tabName="logout" onClick={handleLogout} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Top Header with Profile */}
          <div className="border-b bg-gray-100 px-6 py-3">
            <div className="flex justify-end">
              <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => router.push("/profile")}>
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex-1 p-3 ">{children}</div>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
