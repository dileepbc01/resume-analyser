import { ApplicationResponse } from "@repo/types";
import { Briefcase, Code, GraduationCap, Layers, Link as LinkIcon, Sparkle } from "lucide-react";

import React from "react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import CircularProgress from "./CircularProgress";

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
const CandidateScoreCard = ({
  jobApplication,
  open,
  setClose,
}: {
  jobApplication: ApplicationResponse | null;
  open: boolean;
  setClose: (newVal: boolean) => void;
}) => {
  let content = <></>;
  if (jobApplication) {
    // Calculate average score from resume analysis if available
    const averageScore =
      jobApplication.resumeScore ||
      (jobApplication.resumeAnalysis?.criterias.reduce((sum, criteria) => sum + criteria.totalScore, 0) ||
        0) / (jobApplication.resumeAnalysis?.criterias.length || 1);

    // Get the top 3 skills for the quick view
    const topSkills = jobApplication.skills.sort((a, b) => b.level - a.level).slice(0, 3);
    content = (
      <SheetContent className="w-500 overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Candidate Details</SheetTitle>
          <SheetClose asChild />
        </SheetHeader>

        {/* Top section with score and name */}
        <div className="py-4">
          <div className="flex items-start">
            <div className="relative mr-3">
              <Avatar className="bg-primary/10 flex h-12 w-12 items-center justify-center">
                <CircularProgress value={Math.round(averageScore)} />
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center">
                <Button variant="link" className="mr-2 h-auto p-0 font-bold" asChild>
                  <a href={jobApplication.resumeUrl} className="hover:underline">
                    {jobApplication.fullName}
                  </a>
                </Button>
                {jobApplication.profile.map(
                  (profile) =>
                    profile.network.toLowerCase().includes("linkedin") && (
                      <Button
                        key={profile.url}
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full p-0"
                        asChild>
                        <a href={profile.url} target="_blank" rel="noopener noreferrer">
                          <LinkedInIcon />
                        </a>
                      </Button>
                    )
                )}
              </div>
              <p className="text-muted-foreground">{jobApplication.currentRole}</p>
              <p className="text-muted-foreground text-sm">
                {jobApplication.location} • {jobApplication.email}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* AI Summary section */}
        <Card className="mt-6 border-none shadow-none">
          <CardHeader className="p-0 pb-2">
            <div className="flex items-center gap-2">
              <Sparkle className="h-5 w-5 text-emerald-500" />
              <CardTitle className="text-base">Candidate Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Applied On</p>
                <p className="text-muted-foreground text-sm">
                  {new Date(jobApplication.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Current Role</p>
                <p className="text-muted-foreground text-sm">{jobApplication.currentRole}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-muted-foreground text-sm">{jobApplication.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-muted-foreground text-sm">{jobApplication.location}</p>
              </div>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Top Skills</p>
              <div className="flex flex-wrap gap-1">
                {topSkills.map((skill) => (
                  <Badge key={skill.name} variant="outline">
                    {skill.name} - {skill.level}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resume Score Breakdown section - Updated with circular progress */}
        {jobApplication.resumeAnalysis && (
          <Card className="mt-6 border-none shadow-none">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-base">Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-2">
              {jobApplication.resumeAnalysis.criterias.map((criteria) => {
                return (
                  <div key={criteria.criteriaName} className="mb-6">
                    <div className="mb-2 flex items-center">
                      <div className="ml-2 flex flex-row items-center space-x-2">
                        <Layers className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-800">{criteria.criteriaName}</span>
                        {/* <p className="text-muted-foreground text-sm">{criteria.justification}</p> */}
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-between px-5">
                      {criteria.parameters.length > 0 && (
                        <div className="mt-2">
                          <p className="text-muted-foreground text-xs font-medium">Parameters:</p>
                          {criteria.parameters.map((param) => (
                            <div key={param.name} className="flex items-center justify-between text-xs">
                              <span className="mr-3 truncate">{param.name}</span>
                              <div className="flex items-center space-x-1">
                                <span
                                  className={`h-2 w-2 rounded-full ${
                                    param.score >= 0.7
                                      ? "bg-green-500"
                                      : param.score >= 0.4
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}></span>
                                <span className="whitespace-nowrap">{param.score.toFixed(2)} / 1</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <CircularProgress value={criteria.totalScore} />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Experience section */}
        {jobApplication.experience.length > 0 && (
          <Card className="mt-6 border-none shadow-none">
            <CardHeader className="p-0 pb-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-base">Experience</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 pt-2">
              {jobApplication.experience
                .sort((a, b) => {
                  // Sort by currently working first, then by start date
                  if (a.isCurrentlyWorking && !b.isCurrentlyWorking) return -1;
                  if (!a.isCurrentlyWorking && b.isCurrentlyWorking) return 1;
                  return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                })
                .map((exp, index) => (
                  <div key={index} className="mb-4 border-b pb-4 last:mb-0 last:border-0 last:pb-0">
                    <div className="mb-1 flex justify-between">
                      <h4 className="font-medium">{exp.title}</h4>
                      {exp.employmentType && (
                        <Badge variant="outline" className="text-xs">
                          {exp.employmentType}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {exp.location} • {exp.locationType}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(exp.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}{" "}
                      -
                      {exp.isCurrentlyWorking
                        ? " Present"
                        : ` ${new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}`}
                    </p>
                    {exp.description && <p className="mt-2 text-sm">{exp.description}</p>}
                  </div>
                ))}
            </CardContent>
          </Card>
        )}

        {/* Education section */}
        {jobApplication.education.length > 0 && (
          <Card className="mt-6 border-none shadow-none">
            <CardHeader className="p-0 pb-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-base">Education</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 pt-2">
              {jobApplication.education
                .sort((a, b) => {
                  // Sort by currently studying first, then by start date
                  if (a.isCurrentlyStudying && !b.isCurrentlyStudying) return -1;
                  if (!a.isCurrentlyStudying && b.isCurrentlyStudying) return 1;
                  return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                })
                .map((edu, index) => (
                  <div key={index} className="mb-4 border-b pb-4 last:mb-0 last:border-0 last:pb-0">
                    <div className="mb-1 flex justify-between">
                      <h4 className="font-medium">{edu.institution}</h4>
                      {edu.type && (
                        <Badge variant="outline" className="text-xs">
                          {edu.type}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm">
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(edu.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}{" "}
                      -
                      {edu.isCurrentlyStudying
                        ? " Present"
                        : ` ${new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}`}
                    </p>
                    {edu.grade && <p className="text-muted-foreground text-sm">Grade: {edu.grade}</p>}
                    {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
                  </div>
                ))}
            </CardContent>
          </Card>
        )}

        {/* Skills section */}
        {jobApplication.skills.length > 0 && (
          <Card className="mt-6 border-none shadow-none">
            <CardHeader className="p-0 pb-2">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-orange-500" />
                <CardTitle className="text-base">Skills</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <div className="flex flex-wrap gap-2">
                {jobApplication.skills
                  .sort((a, b) => b.level - a.level)
                  .map((skill) => (
                    <Badge key={skill.name} variant="secondary" className="flex items-center gap-1">
                      {skill.name}
                      <span className="bg-primary/10 ml-1 rounded-full px-1.5 py-0.5 text-xs">
                        {skill.level}
                      </span>
                    </Badge>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profiles section */}
        {jobApplication.profile.length > 0 && (
          <Card className="mt-6 border-none shadow-none">
            <CardHeader className="p-0 pb-2">
              <div className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-teal-500" />
                <CardTitle className="text-base">Online Profiles</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <div className="grid grid-cols-1 gap-2">
                {jobApplication.profile.map((profile, idx) => (
                  <Button key={idx} variant="outline" size="sm" className="justify-start" asChild>
                    <a href={profile.url} target="_blank" rel="noopener noreferrer">
                      {profile.network}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resume link at bottom */}
        <div className="mt-6">
          <Button variant="outline" className="w-full" asChild>
            <a href={jobApplication.resumeUrl} target="_blank" rel="noopener noreferrer">
              View Original Resume
            </a>
          </Button>
        </div>
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
