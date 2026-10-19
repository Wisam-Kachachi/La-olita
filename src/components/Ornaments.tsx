type FlagProps = {
  color: string;
  cutout: string;
};

function Flag({ color, cutout }: FlagProps) {
  return (
    <svg viewBox="0 0 48 64" className="h-12 w-8 shrink-0" aria-hidden>
      <path fill={color} d="M0 0h48v46c-8 10-16 4-24 10C16 50 8 56 0 46Z" />
      <circle cx="14" cy="16" r="3.2" fill={cutout} />
      <circle cx="24" cy="28" r="3.2" fill={cutout} />
      <circle cx="34" cy="16" r="3.2" fill={cutout} />
    </svg>
  );
}

const boneColors = ["#F7F1E8", "#F6E6D8", "#E8A23C", "#F7F1E8", "#F26C63", "#F6E6D8"];
const fiestaColors = ["#F26C63", "#E8A23C", "#F7F1E8", "#1F7A72", "#F26C63", "#E8A23C", "#F6E6D8"];

export function PapelPicado({ tone = "bone" }: { tone?: "bone" | "fiesta" }) {
  const colors = tone === "fiesta" ? fiestaColors : boneColors;
  const cutout = tone === "fiesta" ? "#fff4e4" : "#16332c";
  const flags = Array.from({ length: 28 }, (_, index) => colors[index % colors.length]);

  return (
    <div className="overflow-hidden" aria-hidden>
      <div className={`h-px ${tone === "fiesta" ? "bg-coral/50" : "bg-bone/30"}`} />
      <div className="flex w-max min-w-full">
        {flags.map((color, index) => (
          <Flag key={`${color}-${index}`} color={color} cutout={cutout} />
        ))}
      </div>
    </div>
  );
}

export function FloralRule() {
  return (
    <svg viewBox="0 0 120 16" className="mx-auto h-4 w-28 text-marigold" aria-hidden>
      <path
        d="M4 8h36M80 8h36M60 8c0-6 8-6 8 0s-8 6-8 0zM52 8c4-5 12-2 8 3M68 8c-4-5-12-2-8 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="60" cy="8" r="1.6" fill="currentColor" />
    </svg>
  );
}
