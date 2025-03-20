import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function App() {
  return (
    <div className="bg-background min-h-screen">
      {/* Navbar */}
      <nav className="bg-card shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-primary text-2xl font-bold">Resume Analyzer</div>
          <Button variant="default">Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-center">
            <Image src={"/app-logo.png"} alt="app-logo" width={100} height={100} />
          </div>
          <h1 className="text-foreground mb-6 text-5xl font-bold">AI-Powered Resume Analysis</h1>
          <p className="text-muted-foreground mb-8 text-xl">
            Score resumes against job descriptions effortlessly with our LLM-powered SaaS solution.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/login">Try It Free</Link>
            </Button>
            <Button variant="outline" className="text-primary border-primary">
              Learn More
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-foreground mb-12 text-center text-3xl font-bold">
            Why Choose Resume Analyzer?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>LLM-Powered Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Leverage state-of-the-art language models to analyze resumes with unmatched accuracy.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Scalable & Cost-Effective</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Process thousands of resumes at just $X per 1,000 resumes. No hidden costs.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Easy Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Seamlessly integrate with your existing HR systems via our API.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Try It Out Section */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-foreground mb-6 text-3xl font-bold">Try It Out for Free</h2>
          <p className="text-muted-foreground mb-8 text-xl">
            Upload a job description and resumes to see how Resume Analyzer works—no sign-up required!
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Analyze Resumes Now
          </Button>
        </div>
      </section>
      {/* Pricing Section */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-foreground mb-12 text-center text-3xl font-bold">Pricing</h2>
          <div className="text-center">
            <p className="text-muted-foreground mb-8 text-xl">
              Pay only for what you use. Just $X per 1,000 resumes analyzed.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start Analyzing
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-card py-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-sm">&copy; 2023 Resume Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
