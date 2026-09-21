interface ProgressBarProps {
  /** Completion percentage, 0–100 */
  value: number;
  label?: string;
}

export default function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="font-body text-sm text-foreground">{label}</span>
          <span className="font-body text-sm text-foreground">{clamped}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
        className="h-2 w-full rounded-full bg-gray-200 overflow-hidden"
      >
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}