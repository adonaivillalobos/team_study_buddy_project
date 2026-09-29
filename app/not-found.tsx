import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-md px-6 py-24 text-center">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Page Not Found
      </h1>
      <p className="font-body text-gray-600 mt-3">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button variant="primary">Go Home</Button>
        </Link>
      </div>
    </main>
  );
}