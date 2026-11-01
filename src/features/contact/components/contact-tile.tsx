import { ArrowRight, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { cn } from "@/lib/utils";

type Variant = "whatsapp" | "email" | "call";

const config: Record<Variant, { bg: string; icon: string; Icon: typeof Mail }> = {
  whatsapp: { bg: "bg-whatsapp-50", icon: "text-whatsapp", Icon: Phone },
  email: { bg: "bg-primary-50", icon: "text-primary", Icon: Mail },
  call: { bg: "bg-accent-50", icon: "text-accent-strong", Icon: Phone },
};

/** Quick-contact row: WhatsApp (green), Email (blue), Call (gold). */
export function ContactTile({
  variant,
  href,
  title,
  description,
  external = false,
}: {
  variant: Variant;
  href: string;
  title: string;
  description: string;
  external?: boolean;
}) {
  const { bg, icon, Icon } = config[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        "group flex items-center gap-4 rounded-lg p-5 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        bg,
      )}
    >
      <span className={cn("shrink-0", icon)}>
        {variant === "whatsapp" ? (
          <WhatsAppIcon className="size-6" />
        ) : (
          <Icon className="size-6" aria-hidden="true" />
        )}
      </span>
      <div className="flex-1">
        <p className="font-display text-[17px] leading-[22px] font-bold text-ink">{title}</p>
        <p className="text-[13px] leading-[18px] text-ink-muted">{description}</p>
      </div>
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-pill bg-surface text-ink shadow-sm transition-transform group-hover:translate-x-0.5">
        <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </a>
  );
}
