import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyse Resumes",
  description: "Try Resume Analyzer for free without any signup",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
