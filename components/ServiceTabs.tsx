"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const localePattern = /^\/(en|ja|zh)(?=\/|$)/;

function localeFromPath(pathname: string) {
  return pathname.match(localePattern)?.[1] ?? "en";
}

function serviceModeFromPath(pathname: string) {
  return pathname.includes("/japan-homestay") ? "stay" : "transfer";
}

function tabClass(active: boolean) {
  return `relative flex h-14 items-center justify-center border-b-2 px-5 text-sm font-semibold transition sm:px-8 ${
    active
      ? "border-champagne text-champagne"
      : "border-transparent text-white/40 hover:text-white/75"
  }`;
}

export default function ServiceTabs() {
  const pathname = usePathname() || "/en";
  const locale = localeFromPath(pathname);
  const mode = serviceModeFromPath(pathname) as "transfer" | "stay";
  const transferActive = mode === "transfer";
  const stayActive = mode === "stay";
  const barClass = mode === "stay" ? "bg-stay-stone/95" : "bg-ink/95";

  useEffect(() => {
    document.documentElement.dataset.serviceMode = mode;

    return () => {
      delete document.documentElement.dataset.serviceMode;
    };
  }, [mode]);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 border-b border-champagne/30 backdrop-blur ${barClass}`} aria-label="Service switcher">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-center px-4">
        <div className="flex h-full items-center gap-1">
          <Link href={`/${locale}`} className={tabClass(transferActive)} aria-current={transferActive ? "page" : undefined}>
            接机 · TRANSFER
          </Link>
          <Link
            href={`/${locale}/japan-homestay`}
            className={tabClass(stayActive)}
            aria-current={stayActive ? "page" : undefined}
          >
            民宿 · STAY
          </Link>
        </div>
      </div>
    </nav>
  );
}
