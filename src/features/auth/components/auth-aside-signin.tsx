import { Award, BarChart3, GraduationCap } from "lucide-react";
import { Logo } from "@/components/layout/logo";

const FEATURES = [
  { icon: GraduationCap, label: "Professional Courses & Diplomas" },
  { icon: Award, label: "Certified Programs" },
  { icon: BarChart3, label: "Career Growth & Business Impact" },
];

export function AuthAsideSignIn() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-navy-900 text-on-dark">
      <div className="relative h-44 shrink-0 bg-gradient-to-br from-navy-800 to-navy-950">
        <div className="absolute inset-0 flex items-center justify-center">
          <Logo variant="dark" className="h-12 opacity-30" />
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-10 bg-accent [clip-path:polygon(0_100%,100%_30%,100%_100%)]"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-7 p-8">
        <div>
          <h2 className="text-display-lg leading-[1.05] text-on-dark">
            Learn.
            <br />
            Develop.
            <br />
            Lead.
          </h2>
          <span className="mt-4 block h-1 w-12 rounded-full bg-accent" aria-hidden="true" />
        </div>
        <ul className="space-y-4">
          {FEATURES.map((f) => (
            <li key={f.label} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <f.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-body font-semibold text-on-dark">{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
