import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-lg font-bold text-primary">
          StudyBuddy
        </Link>
        <div className="flex items-center gap-6 font-body text-sm">
          <Link href="/dashboard" className="text-foreground hover:text-primary">
            Dashboard
          </Link>
          <Link href="/progress" className="text-foreground hover:text-primary">
            Progress
          </Link>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-foreground hover:text-primary">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-control bg-primary px-4 py-1.5 text-white hover:bg-primary/90">
                Sign Up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>
    </header>
  );
}