"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/hooks/use-language";
import { SpiralBackground } from "@/components/spiral-background";
import Logo from "@/logo.jpg";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const { t, language, direction } = useLanguage();
  const isRtl = direction === "rtl";

  const handleLinkClick = (linkUrl: string) => {
    trackEvent("footer_link_click", {
      link_url: linkUrl,
      language: language,
    });
  };

  const rtlColumnAlign = isRtl
    ? "items-end text-right"
    : "items-start text-left";
  const rtlLogoDirection = isRtl ? "flex-row-reverse" : "flex-row";
  const navAlignmentClass = isRtl ? "md:text-right md:items-end" : "md:text-left md:items-start";

  return (
    <footer className="relative w-full bg-background border-t border-border mt-20 pt-16 pb-28 overflow-hidden">
      {/* Spiral background */}
      <div className="absolute inset-0 z-0">
        <SpiralBackground />
      </div>

      {/* Blur overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10" />

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Credits Section */}
          <div className={"flex flex-col gap-4"}>
            <Link href="/" className={"flex items-center gap-3 group"}>
              <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center transition-transform group-hover:scale-110">
                <Image
                  src={Logo}
                  alt="Piny Bush Logo"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              </div>
              <span className="font-bold font-headline text-xl text-foreground group-hover:text-primary transition-colors">
                {t("app_name")}
              </span>
            </Link>

            <div className={"flex flex-col text-sm text-muted-foreground"}>
              <div>
                <span>Made by</span>{" "}
                <Link
                  href="https://maxim-bortnikov.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    handleLinkClick("https://maxim-bortnikov.netlify.app/")
                  }
                  className="underline hover:text-primary transition-colors"
                >
                  Maxim Bortnikov
                </Link>
              </div>
              <div>
                <span>using</span>{" "}
                <Link
                  href="https://firebase.google.com/products/firebasestudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    handleLinkClick(
                      "https://firebase.google.com/products/firebasestudio"
                    )
                  }
                  className="underline hover:text-primary transition-colors"
                >
                  Firebase Studio
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          {/* Navigation Section */}
          <div className={cn("flex flex-col items-center md:items-start gap-4", navAlignmentClass)}>
            <h4 className="font-headline font-semibold text-lg text-foreground w-full">
              {t("navigation") || "Navigation"}
            </h4>
            <ul className="space-y-2 w-full">
              <li>
                <Link
                  href="/components"
                  onClick={() => handleLinkClick("/components")}
                  className="underline text-muted-foreground hover:text-primary transition-colors block w-full"
                >
                  {t("components_link") || "Components"}
                </Link>
              </li>
              <li>
                <Link
                  href="/credit"
                  onClick={() => handleLinkClick("/credit")}
                  className="underline text-muted-foreground hover:text-primary transition-colors block w-full"
                >
                  {t("credit_page_title") || "Credit"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className={cn("flex flex-col items-center md:items-start gap-4", navAlignmentClass)}>
            <h4 className="font-headline font-semibold text-lg text-foreground w-full">
              {t("legal") || "Legal"}
            </h4>
            <ul className="space-y-2 w-full">
              <li>
                <Link
                  href="/terms"
                  onClick={() => handleLinkClick("/terms")}
                  className="underline text-muted-foreground hover:text-primary transition-colors block w-full"
                >
                  {t("terms_of_use") || "Terms of Use"}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  onClick={() => handleLinkClick("/privacy")}
                  className="underline text-muted-foreground hover:text-primary transition-colors block w-full"
                >
                  {t("privacy_policy") || "Privacy Policy"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
