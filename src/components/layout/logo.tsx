import Image from "next/image";
import { cn } from "@/lib/utils";

/** IMETS wordmark. Use `variant="dark"` on navy grounds. */
export function Logo({
  variant = "light",
  className,
  priority = false,
}: {
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  const src = variant === "dark" ? "/brand/imets-logo-on-dark.png" : "/brand/imets-logo.png";
  return (
    <Image
      src={src}
      alt="IMETS Academy"
      width={1152}
      height={310}
      priority={priority}
      className={cn("h-10 w-auto", className)}
    />
  );
}
