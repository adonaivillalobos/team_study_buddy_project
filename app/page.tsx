import Button from "@/components/Button";
import Card from "@/components/Card";
import ProgressBar from "@/components/ProgressBar";
import EmptyState from "@/components/EmptyState";

// Temporary component showcase for issue #9 (reusable UI components).
// Will be replaced by the real landing page in a future issue.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 bg-background py-12">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
        UI Component Showcase
      </h1>

      <div className="flex gap-4">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
      </div>

      <Card className="w-80">
        <h2 className="font-heading text-lg font-semibold">Sample Card</h2>
        <p className="font-body text-sm text-gray-600 mt-2">
          This is a reusable card component.
        </p>
        <div className="mt-4">
          <ProgressBar value={65} label="Course Progress" />
        </div>
      </Card>

      <Card className="w-80">
        <EmptyState
          title="No study plans yet"
          description="Create your first study plan to get started."
          action={<Button variant="primary">Create Study Plan</Button>}
        />
      </Card>
    </main>
  );
}