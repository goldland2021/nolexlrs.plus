"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { trackWhatsAppLeadConversion } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/seo";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type TokyoRoamingDemoProps = {
  locale: Locale;
};

const scenes = [
  {
    id: "narita-t2",
    image: "/images/pickupjp/pickupjp-airport-arrival-hall-meeting-point.jpg",
    imageAlt: "Narita Airport arrival hall meeting point for a private pickup",
    label: "Narita T2",
    title: "Narita T2 Arrival",
    line: "Welcome to Japan. Your private airport transfer starts at Narita Terminal 2.",
    hint: "Flight tracked",
    score: 500
  },
  {
    id: "shibuya",
    image: "/images/pickupjp/pickupjp-shibuya-crossing-night-city-view.jpeg",
    imageAlt: "Shibuya crossing night city view for a Tokyo private driver route",
    label: "Shibuya",
    title: "Shibuya Night",
    line: "Pass through Tokyo's bright city streets after arrival.",
    hint: "City lights",
    score: 1000
  },
  {
    id: "mt-fuji",
    image: "/images/pickupjp/pickupjp-mt-fuji-chureito-pagoda-day-trip.jpeg",
    imageAlt: "Mt Fuji and Chureito Pagoda day trip scenery",
    label: "Mt Fuji",
    title: "Mt Fuji View",
    line: "A private driver can take you beyond Tokyo for classic Japan scenery.",
    hint: "Day trip",
    score: 1500
  },
  {
    id: "tokyo-tower",
    image: "/images/pickupjp/pickupjp-tokyo-tower-skyline-night.jpeg",
    imageAlt: "Tokyo Tower night skyline for a private city transfer",
    label: "Tokyo Tower",
    title: "Tokyo Night",
    line: "Cruise into the city lights with a comfortable private car.",
    hint: "Night ride",
    score: 1800
  },
  {
    id: "theme-park",
    image: "/images/pickupjp/pickupjp-alphard-black-city-hotel-transfer-side.jpg",
    imageAlt: "Tokyo hotel arrival private airport transfer with black luxury van",
    label: "Hotel",
    title: "Hotel Arrival",
    line: "Door to door, straight to your hotel after a long flight.",
    hint: "Direct drop-off",
    score: 1900
  },
  {
    id: "reward",
    image: "/images/pickupjp/pickupjp-airport-terminal-information-counter.jpg",
    imageAlt: "Airport terminal information counter for private pickup support",
    label: "Reward",
    title: "VIP Pickup Credit",
    line: "You unlocked a JPY 2,000 VIP pickup credit for your first ride.",
    hint: "Reward unlocked",
    score: 2000
  }
] as const;

const routeTrackWidthPercent = 150;
const edgeCarPositionPercent = 12.5;
const centerCarPositionPercent = 50;
const finalCarPositionPercent = 87.5;

function routeStopPercent(index: number) {
  if (scenes.length <= 1) return 8;
  return (index / (scenes.length - 1)) * 100;
}

function playUnlockTone() {
  if (typeof window === "undefined") return;

  const audioWindow = window as Window & { webkitAudioContext?: typeof AudioContext };
  const AudioContextCtor = window.AudioContext || audioWindow.webkitAudioContext;
  if (!AudioContextCtor) return;

  const context = new AudioContextCtor();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(740, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(1120, context.currentTime + 0.12);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.06, context.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.18);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.2);
}

function CarIcon({ className = "h-7 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" className={className} aria-hidden="true">
      <path
        d="M4.5 13.5 7 8.25A4 4 0 0 1 10.6 6h8.9a4 4 0 0 1 3.55 2.16l2.82 5.34H27a2 2 0 0 1 2 2v3h-3.25a3.25 3.25 0 0 1-6.5 0h-6.5a3.25 3.25 0 0 1-6.5 0H3v-3a2 2 0 0 1 1.5-1.94Z"
        fill="currentColor"
      />
      <path
        d="M9.2 8.8 7.8 12h7.1V8.5h-4.3c-.6 0-1.13.34-1.4.3Zm8.1-.3V12h5.6l-1.62-3.07a.75.75 0 0 0-.66-.43H17.3Z"
        fill="#fff8e6"
        opacity="0.86"
      />
      <circle cx="9.5" cy="18.5" r="1.7" fill="#fff8e6" />
      <circle cx="22.5" cy="18.5" r="1.7" fill="#fff8e6" />
    </svg>
  );
}

function formatAwardedAt(value: string) {
  return new Date(value).toLocaleString("en-US", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export default function TokyoRoamingDemo({ locale }: TokyoRoamingDemoProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [rewardUnlocked, setRewardUnlocked] = useState(false);
  const [rewardAwardedAt, setRewardAwardedAt] = useState<string | null>(null);
  const [rewardCode, setRewardCode] = useState<string | null>(null);
  const rewardSyncRequestedRef = useRef(false);
  const activeScene = scenes[sceneIndex];
  const carPosition =
    sceneIndex === 0
      ? edgeCarPositionPercent
      : sceneIndex === scenes.length - 1
        ? finalCarPositionPercent
        : centerCarPositionPercent;
  const routeTranslate = carPosition / (routeTrackWidthPercent / 100) - routeStopPercent(sceneIndex);
  const shownRewardCode = rewardCode ?? "01";
  const rewardClaimMessage = `Hello, I earned the Tokyo Roaming JPY 2,000 reward. Reward No. ${shownRewardCode}.`;

  function driveRoute() {
    playUnlockTone();
    setSceneIndex((current) => {
      if (current === scenes.length - 1) {
        return 0;
      }

      const next = current + 1;

      if (next === scenes.length - 1) {
        setRewardUnlocked(true);
      }

      return next;
    });
  }

  useEffect(() => {
    if (!rewardUnlocked || rewardSyncRequestedRef.current) return;

    let cancelled = false;
    rewardSyncRequestedRef.current = true;

    fetch("/api/tokyo-roaming/reward", {
      method: "POST"
    })
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;

        setRewardCode(typeof data?.code === "string" ? data.code : "01");
        setRewardAwardedAt(typeof data?.awardedAt === "string" ? data.awardedAt : new Date().toISOString());
      })
      .catch(() => {
        if (cancelled) return;

        setRewardCode("01");
        setRewardAwardedAt(new Date().toISOString());
      });

    return () => {
      cancelled = true;
    };
  }, [rewardUnlocked]);

  return (
    <main className="min-h-screen bg-ink text-white">
      <section className="relative min-h-screen overflow-hidden">
        <Image
          key={activeScene.image}
          src={activeScene.image}
          alt={activeScene.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/16 via-transparent to-black/62" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(207,160,82,0.12),transparent_30%)]" />

        {sceneIndex === scenes.length - 1 ? (
          <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
            {Array.from({ length: 18 }).map((_, index) => (
              <span
                key={index}
                className="absolute h-2 w-1.5 animate-ping rounded-sm bg-gold/80"
                style={{
                  left: `${8 + ((index * 19) % 86)}%`,
                  top: `${8 + ((index * 23) % 72)}%`,
                  animationDelay: `${index * 80}ms`,
                  animationDuration: "1.4s"
                }}
              />
            ))}
          </div>
        ) : null}

        <div
          className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl cursor-pointer flex-col px-4 py-5 sm:px-6 lg:px-8"
          onClick={driveRoute}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              driveRoute();
            }
          }}
          aria-label="Advance Tokyo Roaming route"
        >
          <header className="flex items-start justify-between gap-3">
            <Link
              href={localizedPath(locale)}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex h-10 shrink-0 items-center rounded-md border border-white/20 bg-black/20 px-4 text-sm font-semibold text-white shadow-soft transition hover:border-gold hover:text-gold"
            >
              nolexlrs Airport Pickup
            </Link>
            {rewardUnlocked ? (
              <div className="max-w-[58vw] rounded-lg border-2 border-gold bg-black/88 px-3 py-2 text-right text-xs font-bold leading-5 text-gold shadow-[0_0_28px_rgba(207,160,82,0.38)]">
                JPY 2,000 Reward. No. {shownRewardCode}
                {rewardAwardedAt ? (
                  <span className="block text-[10px] font-semibold text-white/70">
                    {formatAwardedAt(rewardAwardedAt)}
                  </span>
                ) : null}
              </div>
            ) : null}
          </header>

          {rewardUnlocked && sceneIndex === scenes.length - 1 ? (
            <section className="flex flex-1 items-center justify-center px-1 pb-24 pt-8 sm:pb-28">
              <div
                className="relative w-full max-w-sm overflow-hidden rounded-lg border-2 border-gold bg-black/90 p-5 text-center text-white shadow-[0_0_46px_rgba(207,160,82,0.48)]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="pointer-events-none absolute inset-x-4 top-3 h-px bg-gold/70" />
                <div className="pointer-events-none absolute inset-x-4 bottom-3 h-px bg-gold/70" />

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-gold text-ink shadow-lift">
                  <CarIcon className="h-7 w-8" />
                </div>
                <p className="mt-5 text-xs font-bold uppercase text-gold">VIP Reward Unlocked</p>
                <h1 className="mt-3 text-6xl font-semibold text-white">JPY 2,000</h1>
                <p className="mt-3 text-sm font-semibold leading-6 text-white/80">
                  Show this reward number to our support team on WhatsApp.
                </p>

                <div className="mt-5 rounded-lg border-2 border-gold/70 bg-gold/20 p-4 shadow-[inset_0_0_20px_rgba(207,160,82,0.16)]">
                  <p className="text-xs font-bold uppercase text-gold">Reward No.</p>
                  <p className="mt-1 text-4xl font-semibold text-gold">{shownRewardCode}</p>
                  <p className="mt-2 text-xs font-medium text-white/60">
                    {rewardAwardedAt ? formatAwardedAt(rewardAwardedAt) : "Syncing reward time..."}
                  </p>
                </div>

                <a
                  href={buildWhatsAppLink(rewardClaimMessage)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => {
                    event.stopPropagation();
                    trackWhatsAppLeadConversion("tokyo_roaming_reward_claim");
                  }}
                  className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-md bg-gold px-5 text-sm font-bold text-ink shadow-[0_14px_30px_rgba(207,160,82,0.34)] transition hover:-translate-y-0.5"
                >
                  Claim on WhatsApp
                </a>

                <p className="mt-4 text-xs font-medium text-white/50">Tap outside this card to play again.</p>
              </div>
            </section>
          ) : null}

          <div className={`${rewardUnlocked && sceneIndex === scenes.length - 1 ? "hidden" : "flex"} flex-1 items-end pb-5 pt-10 sm:pb-10 sm:pt-14`}>
            <div className="mx-auto w-full max-w-4xl">
              <div className="relative h-16 overflow-hidden rounded-lg bg-black/40 px-2 shadow-soft">
                <div
                  className="absolute left-0 top-0 h-full w-[150%] transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(${routeTranslate}%)` }}
                >
                  <div className="absolute left-0 right-0 top-5 h-1.5 rounded-full bg-white/60 shadow-[0_2px_14px_rgba(0,0,0,0.35)]" />
                  <div
                    className="absolute left-0 top-5 h-1.5 rounded-full bg-gold shadow-lift"
                    style={{ width: `${routeStopPercent(sceneIndex)}%` }}
                  />

                  {scenes.map((entry, index) => {
                    const unlocked = rewardUnlocked || sceneIndex >= index;
                    const active = sceneIndex === index;
                    const left = routeStopPercent(index);

                    return (
                      <div
                        key={entry.id}
                        className="absolute top-0 flex w-10 -translate-x-1/2 flex-col items-center"
                        style={{ left: `${left}%` }}
                      >
                        <span
                          className={`mt-[13px] h-5 w-5 rounded-full border-2 transition ${
                            active
                              ? "border-gold bg-gold shadow-lift"
                              : unlocked
                                ? "border-gold bg-gold/70"
                            : "border-white/70 bg-black/55"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    driveRoute();
                  }}
                  className="absolute top-[-2px] z-10 flex h-14 w-16 -translate-x-1/2 items-center justify-center rounded-md border-2 border-gold bg-black/80 text-gold shadow-lift ring-4 ring-gold/20 transition-all duration-700 hover:scale-105 disabled:pointer-events-none"
                  style={{ left: `${carPosition}%` }}
                  aria-label={sceneIndex === scenes.length - 1 ? "Restart road trip" : "Drive car forward"}
                >
                  <CarIcon className="h-7 w-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
