import { Application, Job } from "@repo/types";

export const calcResumeScore = (
  resumeAnalysis: Application["resume_analysis"],
  jobCriterias: Job["scoring_criteria"]
) => {
  if (!resumeAnalysis || !jobCriterias) {
    return null;
  }

  const importance: {
    [key: string]: number;
  } = {};
  jobCriterias.criterias.forEach((c) => {
    importance[c.criteria_name] = c.importance / 100;
  });

  const totalresumeScore = resumeAnalysis.criterias.reduce((total, c) => {
    const imp = importance[c.criteria_name];
    if (!imp) {
      throw new Error("invalide criteria");
    }
    const criteria_score = c.total_score * imp;
    return total + criteria_score;
  }, 0);

  return totalresumeScore;
};
