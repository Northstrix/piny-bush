
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { Header } from '@/components/header';
import { SpiralBackground } from '@/components/spiral-background';
import TextSwap from '@/components/ui/TextSwap';
import ChronicleButton from '@/components/ui/ChronicleButton/ChronicleButton';
import { Sparkles, Zap, Repeat, ArrowRight, ArrowLeft } from 'lucide-react';
import { GlowingEffect } from '../components/ui/GlowingEffect';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────
// ✅ FeatureCard with working Glow + Proximity
// ─────────────────────────────────────────────
const FeatureCard = ({
  icon,
  title,
  description,
  className = '',
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <li className={cn('min-h-[14rem] list-none', className)}>
      <div className="relative h-full transition-transform rounded-2xl border p-2 md:rounded-3xl md:p-3 bg-[hsl(var(--card))] border-[hsl(var(--border))]">
        {/* Glow inside card */}
        <GlowingEffect
          proximity={64}
          spread={40}
          glow
          disabled={false}
          inactiveZone={0.01}
        />

        <div className="flex h-full flex-col justify-between rounded-xl p-6 shadow-[0px_0px_27px_0px_#111]">
          <div className="flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-primary bg-background p-2">
              <div className="text-primary">{icon}</div>
            </div>
            <div className="space-y-3">
              <h3 className="font-headline text-xl md:text-2xl font-semibold text-white leading-tight">
                {title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const initialContent = {
  buildFormsFor: "Make websites for",
  inMinutes: "faster.",
  heroSubtext: "Piny Bush simplifies and speeds up website development by making it possible to quickly make custom components.",
  getStarted: "Get Started",
  features: "Features",
  featuresInscription: "Explore what Piny Bush has to offer.",
  feature1Name: "Real-Time Visual Editor",
  feature1Desc: "Easily adjust component properties and styles in a simple, user-friendly editor that instantly reflects the changes and provides a live preview. No coding skills required!",
  feature3Name: "One-Click Code Export",
  feature3Desc: "Skip the setup and export clean, production-ready HTML/CSS/JavaScript code for any customized component — all with a single click.",
  feature5Name: "Reusable Configuration",
  feature5Desc: "Save, load, and share component configurations to avoid repetitive tweaks and ensure design consistency across projects.",
  animatedWords: [
    "Restaurants",
    "Clubs",
    "Cafes",
    "Stores",
    "Startups",
    "Whatever you want",
  ]
};

// ─────────────────────────────────────────────
// ✅ Landing Page
// ─────────────────────────────────────────────
export default function Home() {
  const { t, direction } = useLanguage();
  const isRtl = direction === 'rtl';
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContent({
        buildFormsFor: t("build_forms_for") || initialContent.buildFormsFor,
        inMinutes: t("in_minutes") || initialContent.inMinutes,
        heroSubtext: t("hero_subtext_new") || initialContent.heroSubtext,
        getStarted: t("get_started") || initialContent.getStarted,
        features: t("features") || initialContent.features,
        featuresInscription: t("featuresInscription") || initialContent.featuresInscription,
        feature1Name: t("feature-1-name") || initialContent.feature1Name,
        feature1Desc: t("feature-1-desc") || initialContent.feature1Desc,
        feature3Name: t("feature-3-name") || initialContent.feature3Name,
        feature3Desc: t("feature-3-desc") || initialContent.feature3Desc,
        feature5Name: t("feature-5-name") || initialContent.feature5Name,
        feature5Desc: t("feature-5-desc") || initialContent.feature5Desc,
        animatedWords: [
          t("hero_word_slider_0") || "Restaurants",
          t("hero_word_slider_1") || "Clubs",
          t("hero_word_slider_2") || "Cafes",
          t("hero_word_slider_3") || "Stores",
          t("hero_word_slider_4") || "Startups",
          t("hero_word_slider_5") || "Whatever you want",
        ]
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [t]);

  return (
    <div className="flex flex-col flex-1">
      <Header />

      {/* ── Hero Section ─ */}
      <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden flex items-center justify-center bg-background">
        <SpiralBackground />
        <main className="relative z-10 flex flex-col items-center text-center px-4 py-12 sm:py-20">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-headline text-foreground">
            {content.buildFormsFor}
          </h1>
          <div className="mt-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-headline h-20 flex items-center justify-center">
            <TextSwap
              texts={content.animatedWords}
              mainClassName="text-primary-foreground px-3 bg-primary overflow-hidden justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              rotationInterval={2000}
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                fontWeight: 700,
                fontSize: "inherit",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "unset",
                width: "auto",
                paddingTop: 4,
                paddingBottom: 4,
              }}
            />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-headline text-foreground mt-4">
            {content.inMinutes}
          </h1>
          <p className="mt-6 max-w-2xl text-[clamp(1rem,3vw,1.35rem)] text-foreground/80">
            {content.heroSubtext}
          </p>
          <div className="mt-10">
            <Link href="/components" passHref>
              <ChronicleButton size="lg" variant="default">
                {content.getStarted}
                {isRtl ? (
                  <ArrowLeft className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </ChronicleButton>
            </Link>
          </div>
        </main>
      </div>

      {/* ── Features Section ─ */}
      <div className="w-full py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline text-primary">
              {content.features}
            </h2>
            <p className="mt-2 text-lg text-foreground/80">
              {content.featuresInscription}
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureCard
              className="md:col-span-2"
              icon={<Sparkles className="h-5 w-5" />}
              title={content.feature1Name}
              description={content.feature1Desc}
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title={content.feature3Name}
              description={content.feature3Desc}
            />
            <FeatureCard
              icon={<Repeat className="h-5 w-5" />}
              title={content.feature5Name}
              description={content.feature5Desc}
            />
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
