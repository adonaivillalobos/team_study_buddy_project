import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpButton } from "@clerk/nextjs";
import {
  CalendarCheck,
  CheckCircle2,
  Bell,
  BookOpen,
  TrendingUp,
  Smartphone,
} from "lucide-react";
import Card from "@/components/Card";
import RevealOnScroll from "../components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Welcome",
};

const features = [
  {
    icon: CalendarCheck,
    title: "Create Study Plans",
    description:
      "Build personalized study plans for each of your courses and goals.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: CheckCircle2,
    title: "Track Your Progress",
    description:
      "Mark study items complete and see your progress update in real time.",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    icon: Bell,
    title: "Stay on Schedule",
    description:
      "See what's overdue, what's coming up, and what you've already finished.",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    icon: BookOpen,
    title: "Manage Your Courses",
    description:
      "Keep every course and its study plans organized in one place.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "See the Big Picture",
    description:
      "A progress dashboard shows completion by course and overall.",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    icon: Smartphone,
    title: "Use It Anywhere",
    description:
      "Works from any device with a browser -- no app to install.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
];

const steps = [
  {
    number: "1",
    title: "Sign Up",
    description: "Create your free account in seconds.",
  },
  {
    number: "2",
    title: "Build Your Plan",
    description:
      "Add a course, set your dates, and list your study items.",
  },
  {
    number: "3",
    title: "Track Your Progress",
    description:
      "Check off items as you go and watch your progress grow.",
  },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background animate-[fadeIn_1s_ease-in]" />

        <div className="relative mx-auto max-w-[1200px] px-6 py-24 text-center">
          <p className="font-body text-sm font-medium uppercase tracking-wide text-primary animate-[fadeSlideUp_0.6s_ease-out]">
            Plan &middot; Study &middot; Achieve
          </p>

          <h1 className="mt-4 font-heading text-4xl font-bold text-foreground animate-[fadeSlideUp_0.6s_ease-out_0.1s_both] sm:text-5xl">
            Your Study Goals,
            <br />
            Made <span className="text-primary">Simple</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl font-body text-lg text-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.2s_both]">
            StudyBuddy helps you create study plans, stay organized, and track
            your progress -- so you can focus on what matters most: your goals.
          </p>

          <div className="mt-8 flex justify-center gap-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s_both]">
            <SignUpButton mode="modal">
              <button className="rounded-control bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary-hover hover:scale-105 active:scale-95">
                Get Started Free
              </button>
            </SignUpButton>

            <Link
              href="#how-it-works"
              className="rounded-control border border-primary px-6 py-3 font-medium text-primary transition-all hover:bg-primary/5 hover:scale-105 active:scale-95"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-6 font-body text-sm text-gray-700 animate-[fadeSlideUp_0.6s_ease-out_0.4s_both]">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Free to start
            </span>

            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-success" />
              No credit card required
            </span>

            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Works on any device
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <RevealOnScroll className="text-center">
          <p className="font-body text-sm font-medium uppercase tracking-wide text-primary">
            Features
          </p>

          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Everything you need to succeed
          </h2>

          <p className="mx-auto mt-3 max-w-xl font-body text-gray-700">
            From study plans to progress tracking, StudyBuddy gives you the
            tools to stay focused and reach your goals.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(
            (
              { icon: Icon, title, description, iconBg, iconColor },
              i,
            ) => (
              <RevealOnScroll key={title} delayMs={i * 75}>
                <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-md">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
                  >
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                  </div>

                  <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                    {title}
                  </h3>

                  <p className="mt-2 font-body text-sm text-gray-700">
                    {description}
                  </p>
                </Card>
              </RevealOnScroll>
            ),
          )}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-primary/5 py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <RevealOnScroll className="text-center">
            <p className="font-body text-sm font-medium uppercase tracking-wide text-primary">
              How It Works
            </p>

            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
              Get started in 3 easy steps
            </h2>
          </RevealOnScroll>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <RevealOnScroll key={step.number} delayMs={i * 100}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading font-bold text-white transition-transform hover:scale-110">
                  {step.number}
                </div>

                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="mt-2 font-body text-sm text-gray-700">
                  {step.description}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility Note */}
      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <RevealOnScroll>
          <Card className="flex items-start gap-4 transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/10">
              <BookOpen className="h-5 w-5 text-success" />
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Built for lifelong learners
              </h3>

              <p className="mt-2 font-body text-sm text-gray-700">
                Whether you&apos;re in high school, college, or learning
                something new on your own, StudyBuddy is here to help you stay
                organized and follow through on your goals.
              </p>
            </div>
          </Card>
        </RevealOnScroll>
      </section>

      {/* Final CTA */}
      <section className="bg-foreground py-20">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <RevealOnScroll>
            <h2 className="font-heading text-3xl font-bold text-white">
              Ready to reach your goals?
            </h2>

            <p className="mx-auto mt-3 max-w-xl font-body text-gray-300">
              Join StudyBuddy today and take the first step toward a more
              focused, organized, and successful you.
            </p>

            <div className="mt-8">
              <SignUpButton mode="modal">
                <button className="rounded-control bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary-hover hover:scale-105 active:scale-95">
                  Get Started Free
                </button>
              </SignUpButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}