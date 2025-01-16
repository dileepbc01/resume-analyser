import React from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ActionBar = () => {
  return (
    <>
      <div className="border-b px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Input type="text" placeholder="Search candidate" className="w-48" />
            <Button variant="outline" className="text-sm">
              Locations
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by</span>
            <Button variant="outline" className="text-sm">
              Latest Activity
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
