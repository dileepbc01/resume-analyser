import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">Resume Analyzer</div>
          <Button variant="default">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-card py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Image src={'/app-logo.png'} alt='app-logo' width={100} height={100} />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            AI-Powered Resume Analysis
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Score resumes against job descriptions effortlessly with our LLM-powered SaaS solution.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Try It Free
            </Button>
            <Button variant="outline" className="text-primary border-primary">
              Learn More
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose Resume Analyzer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Pricing Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Pricing
          </h2>
          <div className="text-center">
            <p className="text-xl text-muted-foreground mb-8">
              Pay only for what you use. Just $X per 1,000 resumes analyzed.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start Analyzing
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Sign up today and experience the power of AI-driven resume analysis.
          </p>
          <Button variant="outline" className="bg-background text-primary hover:bg-background/90">
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2023 Resume Analyzer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;