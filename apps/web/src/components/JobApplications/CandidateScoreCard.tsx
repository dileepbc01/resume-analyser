import { ApplicationResponse } from "@repo/types";
import { Sparkle } from "lucide-react";

import React from "react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#0A66C2" // LinkedIn's official color
      className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.967 0-1.75-.792-1.75-1.766s.783-1.766 1.75-1.766 1.75.792 1.75 1.766-.783 1.766-1.75 1.766zm13.5 11.268h-3v-5.604c0-1.339-.025-3.063-1.867-3.063-1.87 0-2.156 1.46-2.156 2.967v5.7h-3v-10h2.878v1.362h.041c.4-.757 1.379-1.553 2.839-1.553 3.034 0 3.605 1.996 3.605 4.591v5.6z" />
    </svg>
  );
};

// export default LinkedInIcon;

const CandidateScoreCard = ({
  jobApplication,
  open,
  setClose,
}: {
  jobApplication: ApplicationResponse | null;
  open: boolean;
  setClose: (newVal: boolean) => void;
}) => {
  const scoreBreakdown = [
    {
      category: "Experience",
      score: 4,
      maxScore: 5,
      summary: "7+ years in similar roles with progressive responsibility",
    },
    {
      category: "Education",
      score: 4,
      maxScore: 5,
      summary: "Master's degree in relevant field from top university",
    },
    {
      category: "Skills",
      score: 3,
      maxScore: 5,
      summary: "Strong technical skills but lacks leadership experience",
    },
  ];

  let content = <></>;
  if (jobApplication) {
    content = (
      <SheetContent className="w-[500px] overflow-y-auto sm:w-[640px]">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Candidate Details</SheetTitle>
          <SheetClose asChild />
        </SheetHeader>

        {/* Top section with score and name */}
        <div className="py-4">
          <div className="flex items-start">
            <div className="relative mr-3">
              <Avatar className="bg-primary/10 flex h-12 w-12 items-center justify-center">
                <span className="text-primary font-bold">71</span>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center">
                <Button variant="link" className="mr-2 h-auto p-0 font-bold" asChild>
                  <a href="#resume-link" className="hover:underline">
                    Full Name
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                  <LinkedInIcon />
                </Button>
              </div>
              <p className="text-muted-foreground">Job Role</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* AI Summary section */}
        <Card className="mt-6 border-none shadow-none">
          <CardHeader className="p-0 pb-2">
            <div className="flex items-center gap-2">
              <Sparkle className="h-5 w-5 text-emerald-500" />
              <CardTitle className="text-base">AI Summary of Candidate</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-muted-foreground">
              This candidate shows strong experience and education backgrounds, with moderate skill
              assessment. Overall score indicates a good potential fit for the role.
            </p>
          </CardContent>
        </Card>

        {/* Score Breakdown section */}
        <Card className="mt-6 border-none shadow-none">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-base">Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            {scoreBreakdown.map((item) => (
              <div key={item.category} className="mb-4">
                <div className="mb-1 flex justify-between">
                  <Badge variant="outline" className="font-medium">
                    {item.category}
                  </Badge>
                  <span>
                    {item.score}/{item.maxScore}
                  </span>
                </div>
                <Progress value={(item.score / item.maxScore) * 100} className="mb-1 h-2" />
                <p className="text-muted-foreground text-sm">{item.summary}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </SheetContent>
    );
  }
  return (
    <div>
      <Sheet open={open} onOpenChange={setClose}>
        {content}
      </Sheet>
    </div>
  );
};

export default CandidateScoreCard;
