"use client";

import { useId, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bold,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Eye,
  Italic,
  Layers,
  Link2,
  List as ListIcon,
  ListOrdered,
  Palette,
  Plus,
  Settings,
  Strikethrough,
  Underline,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  CATEGORY_COLOR_HEX,
  CATEGORY_COLOR_KEYS,
  CATEGORY_ICONS,
  colorTint,
} from "@/features/categories/icons";
import type { CategoryColorKey, CategoryIconKey } from "@/features/categories/data";
import { createCategoryAction } from "@/features/categories/actions";

const ICON_ENTRIES = Object.entries(CATEGORY_ICONS) as [CategoryIconKey, LucideIcon][];

function kebab(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function CategoryForm({
  mode,
  parents,
}: {
  mode: "category" | "subcategory";
  parents: { name: string; slug: string }[];
}) {
  const isSub = mode === "subcategory";
  const noun = isSub ? "Subcategory" : "Category";
  const uid = useId();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState<{ ok: boolean; message: string } | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [parent, setParent] = useState(isSub ? (parents[0]?.slug ?? "") : "");
  const [order, setOrder] = useState(1);
  const [active, setActive] = useState(true);
  const [showInNav, setShowInNav] = useState(true);
  const [iconKey, setIconKey] = useState<CategoryIconKey>(ICON_ENTRIES[0]![0]);
  const [color, setColor] = useState<CategoryColorKey>("navy");
  const [iconTab, setIconTab] = useState<"library" | "upload">("library");

  const SelectedIcon = CATEGORY_ICONS[iconKey];

  function onName(v: string) {
    setName(v);
    if (!slugEdited) setSlug(kebab(v));
  }

  function handleCreate() {
    setNote(null);
    startTransition(async () => {
      const res = await createCategoryAction({
        name,
        slug,
        description: shortDesc,
        icon: iconKey,
        color,
        order,
        active,
        parent: isSub ? parent : parent || undefined,
      });
      setNote(res);
      if (res.ok) {
        router.push(routes.admin.categories);
        router.refresh();
      }
    });
  }

  const rtButtons = [Bold, Italic, Underline, Strikethrough];

  return (
    <div className="space-y-6">
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      {/* Form column */}
      <div className="space-y-6">
        <section className="rounded-xl border border-border bg-surface p-5 md:p-6">
          <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
            <Layers className="size-5 text-primary" aria-hidden="true" />
            {noun} Information
          </h2>

          <div className="mt-5 space-y-5">
            {isSub && (
              <Field label="Parent Category" required htmlFor={`${uid}-parent`}>
                <SelectControl id={`${uid}-parent`} value={parent} onChange={setParent} icon={Layers}>
                  {parents.map((p) => (<option key={p.slug} value={p.slug}>{p.name}</option>))}
                </SelectControl>
              </Field>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={`${noun} Name`} required htmlFor={`${uid}-name`}>
                <input id={`${uid}-name`} value={name} onChange={(e) => onName(e.target.value)} placeholder={isSub ? "e.g. Business Strategy" : "e.g. Business & Management"} className={inputCls} />
              </Field>
              <Field label="Slug (URL)" required htmlFor={`${uid}-slug`}>
                <div className="relative flex items-center">
                  <input id={`${uid}-slug`} value={slug} onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }} placeholder="business-management" className={cn(inputCls, "pe-10")} />
                  <Link2 className="pointer-events-none absolute end-3 size-4 text-ink-subtle" aria-hidden="true" />
                </div>
              </Field>
            </div>

            <Field label="Short Description" required htmlFor={`${uid}-short`}>
              <div className="relative">
                <textarea id={`${uid}-short`} value={shortDesc} onChange={(e) => setShortDesc(e.target.value.slice(0, 200))} rows={3} placeholder="A short summary shown on category cards and listings." className={cn(inputCls, "h-auto resize-none pt-3")} />
                <span className="pointer-events-none absolute bottom-2 end-3 text-caption text-ink-subtle">{shortDesc.length} / 200</span>
              </div>
            </Field>

            <Field label="Full Description (Optional)" htmlFor={`${uid}-full`}>
              <div className="overflow-hidden rounded-lg border border-border-input">
                <div className="flex items-center gap-1 border-b border-border bg-surface-alt px-2 py-1.5">
                  {rtButtons.map((Icon, i) => (
                    <button key={i} type="button" aria-label="Format" className="inline-flex size-8 items-center justify-center rounded text-ink-muted hover:bg-surface hover:text-ink"><Icon className="size-4" aria-hidden="true" /></button>
                  ))}
                  <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
                  <button type="button" aria-label="Bulleted list" className="inline-flex size-8 items-center justify-center rounded text-ink-muted hover:bg-surface hover:text-ink"><ListIcon className="size-4" aria-hidden="true" /></button>
                  <button type="button" aria-label="Numbered list" className="inline-flex size-8 items-center justify-center rounded text-ink-muted hover:bg-surface hover:text-ink"><ListOrdered className="size-4" aria-hidden="true" /></button>
                  <button type="button" aria-label="Insert link" className="inline-flex size-8 items-center justify-center rounded text-ink-muted hover:bg-surface hover:text-ink"><Link2 className="size-4" aria-hidden="true" /></button>
                </div>
                <textarea id={`${uid}-full`} value={fullDesc} onChange={(e) => setFullDesc(e.target.value)} rows={4} placeholder="A longer description covering what this category includes…" className="w-full resize-none bg-surface p-3 text-body-sm text-ink outline-none placeholder:text-ink-subtle" />
              </div>
            </Field>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-5 md:p-6">
          <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
            <Settings className="size-5 text-primary" aria-hidden="true" />
            {noun} Settings
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {!isSub && (
              <Field label="Parent Category (Optional)" htmlFor={`${uid}-parent2`}>
                <SelectControl id={`${uid}-parent2`} value={parent} onChange={setParent} icon={Layers}>
                  <option value="">None (Top Level Category)</option>
                  {parents.map((p) => (<option key={p.slug} value={p.slug}>{p.name}</option>))}
                </SelectControl>
              </Field>
            )}
            <Field label="Display Order" htmlFor={`${uid}-order`}>
              <div className="flex items-center gap-2">
                <input id={`${uid}-order`} type="number" min={1} value={order} onChange={(e) => setOrder(Math.max(1, Number(e.target.value) || 1))} className={cn(inputCls, "w-24")} />
              </div>
            </Field>
            <ToggleRow label="Active" hint={`Make this ${noun.toLowerCase()} visible on the platform.`} checked={active} onChange={setActive} />
            <ToggleRow label="Show in Navigation" hint={isSub ? "Display in the category menu (under its parent category)." : "Display in the main course categories menu."} checked={showInNav} onChange={setShowInNav} />
          </div>
        </section>
      </div>

      {/* Preview + icon/color column */}
      <div className="space-y-6">
        <section className="rounded-xl border border-border bg-surface p-5">
          <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
            <Eye className="size-5 text-primary" aria-hidden="true" />
            {noun} Preview
          </h2>
          <div className="mt-4 rounded-xl border border-border bg-surface-alt/50 p-5">
            <div className="flex items-start gap-4">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-xl" style={colorTint(color)} aria-hidden="true">
                <SelectedIcon className="size-8" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-h4 text-ink">{name || `${noun} Name`}</p>
                <p className="mt-1 text-body-sm text-ink-muted">
                  {shortDesc || `A short description of this ${noun.toLowerCase()} will appear here.`}
                </p>
                {isSub ? (
                  <div className="mt-3 inline-flex flex-wrap items-center gap-1.5 rounded-pill bg-primary-50 px-2.5 py-1 text-caption font-semibold text-primary">
                    <Layers className="size-3.5" aria-hidden="true" />
                    {parents.find((p) => p.slug === parent)?.name || "Parent"}
                    <ChevronRight className="size-3.5" aria-hidden="true" />
                    {name || noun}
                  </div>
                ) : (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-pill bg-primary-50 px-2.5 py-1 text-caption font-semibold text-primary">
                    <BookOpen className="size-3.5" aria-hidden="true" />
                    0 Courses
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-5">
          <h2 className="inline-flex items-center gap-2 text-h4 text-ink">
            <Palette className="size-5 text-primary" aria-hidden="true" />
            {isSub ? "Icon & Color" : `${noun} Icon & Color`}
          </h2>

          <div className="mt-4 flex gap-1 border-b border-border">
            <button type="button" onClick={() => setIconTab("library")} className={cn("flex items-center gap-2 border-b-2 px-3 py-2 text-body-sm font-semibold transition-colors", iconTab === "library" ? "border-primary text-primary" : "border-transparent text-ink-muted hover:text-ink")}>
              <Layers className="size-4" aria-hidden="true" />
              Icon Library
            </button>
            <button type="button" onClick={() => setIconTab("upload")} className={cn("flex items-center gap-2 border-b-2 px-3 py-2 text-body-sm font-semibold transition-colors", iconTab === "upload" ? "border-primary text-primary" : "border-transparent text-ink-muted hover:text-ink")}>
              <Upload className="size-4" aria-hidden="true" />
              Upload Icon
            </button>
          </div>

          {iconTab === "library" ? (
            <div className="mt-4 grid grid-cols-6 gap-2">
              {ICON_ENTRIES.map(([key, Icon]) => {
                const selected = key === iconKey;
                return (
                  <button key={key} type="button" aria-label={`${key} icon`} aria-pressed={selected} onClick={() => setIconKey(key)} className={cn("flex aspect-square items-center justify-center rounded-lg border transition-colors", selected ? "border-primary bg-primary-50 text-primary" : "border-border-input text-ink-muted hover:border-primary hover:text-primary")}>
                    <Icon className="size-5" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          ) : (
            <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border-input bg-surface-alt px-4 py-8 text-center">
              <Upload className="size-6 text-ink-subtle" aria-hidden="true" />
              <span className="text-body-sm font-semibold text-ink">Upload a custom icon</span>
              <span className="text-caption text-ink-subtle">SVG or PNG, up to 1MB</span>
              <input type="file" accept="image/*" className="sr-only" />
            </label>
          )}

          <p className="mt-5 text-body-sm font-semibold text-ink">{noun} Color</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {CATEGORY_COLOR_KEYS.map((key) => {
              const selected = key === color;
              return (
                <button key={key} type="button" aria-label={`${key} color`} aria-pressed={selected} onClick={() => setColor(key)} className={cn("flex size-9 items-center justify-center rounded-full ring-offset-2 transition-shadow", selected && "ring-2 ring-primary")} style={{ background: CATEGORY_COLOR_HEX[key] }}>
                  {selected && (
                    <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>

      {note && (
        <p role="status" className={cn("rounded-lg px-4 py-2 text-body-sm", note.ok ? "bg-primary-50 text-primary" : "bg-danger-50 text-danger")}>
          {note.message}
        </p>
      )}

      <div className="flex items-center justify-end gap-3">
        <Button asChild variant="outline" size="lg">
          <Link href={routes.admin.categories}>Cancel</Link>
        </Button>
        <Button size="lg" onClick={handleCreate} disabled={pending}>
          <Plus className="size-5" aria-hidden="true" />
          {pending ? "Saving…" : `Create ${noun}`}
        </Button>
      </div>
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-lg border border-border-input bg-surface px-4 text-body-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50";

function Field({ label, required, htmlFor, children }: { label: string; required?: boolean; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-body-sm font-semibold text-ink">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      {children}
    </div>
  );
}

function SelectControl({ id, value, onChange, icon: Icon, children }: { id: string; value: string; onChange: (v: string) => void; icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="relative flex items-center">
      <Icon className="pointer-events-none absolute start-3 size-4 text-ink-subtle" aria-hidden="true" />
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-border-input bg-surface ps-9 pe-9 text-body-sm font-medium text-ink outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-50">
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute end-3 size-4 text-ink-subtle" aria-hidden="true" />
    </div>
  );
}

function ToggleRow({ label, hint, checked, onChange }: { label: string; hint: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border border-border p-3">
      <div className="min-w-0">
        <p className="text-body-sm font-semibold text-ink">{label}</p>
        <p className="text-caption text-ink-subtle">{hint}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
    </div>
  );
}
