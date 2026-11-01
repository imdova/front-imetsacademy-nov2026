import { Check, GraduationCap } from "lucide-react";

const BENEFITS = [
  "Access a wide range of business courses",
  "Earn professional certificates",
  "Track your learning progress",
  "Be part of a growing professional community",
];

export function AuthAsideRegister() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-navy-800 to-navy-950 text-on-dark">
      <div className="relative flex h-48 shrink-0 items-center justify-center">
        <GraduationCap className="size-24 text-white/15" aria-hidden="true" />
        <div
          className="absolute inset-x-0 bottom-0 h-10 bg-accent [clip-path:polygon(0_100%,100%_30%,100%_100%)]"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-5 p-8">
        <ul className="space-y-5">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
                <Check className="size-4" aria-hidden="true" />
              </span>
              <span className="text-body font-medium text-on-dark">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
