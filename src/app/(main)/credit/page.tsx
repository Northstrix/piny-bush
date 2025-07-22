
"use client";
import React from "react";
import { useLanguage } from "@/hooks/use-language";

const creditsMarkdown = `
[Text Rotate](https://www.fancycomponents.dev/docs/components/text/text-rotate) by [fancy components](https://www.fancycomponents.dev/)

[motion](https://github.com/motiondivision/motion) by [motiondivision](https://github.com/motiondivision)

[GSAP](https://github.com/greensock/GSAP) by [greensock](https://github.com/greensock)

[radix-ui](https://www.npmjs.com/package/radix-ui) by [Radix](https://www.radix-ui.com/primitives)

[Chronicle Button](https://codepen.io/Haaguitos/pen/OJrVZdJ) by [Haaguitos](https://codepen.io/Haaguitos)

[Input Floating Label animation](https://codepen.io/Mahe76/pen/qBQgXyK) by [Elpeeda](https://codepen.io/Mahe76)

[react-i18next](https://github.com/i18next/react-i18next) by [i18next](https://github.com/i18next)

[Bento Grid](https://ui.aceternity.com/components/bento-grid) by [Aceternity UI](https://ui.aceternity.com/)

[lucide](https://github.com/lucide-icons/lucide) by [lucide-icons](https://github.com/lucide-icons)

[Radix Checkbox](https://21st.dev/animate-ui/radix-checkbox/radix-checkbox-demo) by [Animate UI](https://21st.dev/animate-ui)

[Custom Checkbox](https://21st.dev/Edil-ozi/custom-checkbox/default) by [Edil Ozi](https://21st.dev/Edil-ozi)

[チェックしないと押せないボタン](https://codepen.io/ash_creator/pen/JjZReNm) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[すりガラスなプロフィールカード](https://codepen.io/ash_creator/pen/zYaPZLB) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[Color Picker](https://21st.dev/uplusion23/color-picker/color-picker-with-swatches-and-onchange) by [Trevor McIntire](https://21st.dev/uplusion23)

[UZUMAKI](https://codepen.io/Alansdead/pen/zxGyOmx) by [Jules](https://codepen.io/Alansdead)

[Glowing Effect](https://ui.aceternity.com/components/glowing-effect) by [Aceternity UI](https://ui.aceternity.com/)

[Animated Tooltip](https://ui.aceternity.com/components/animated-tooltip) by [Aceternity UI](https://ui.aceternity.com/)

[Wheel Picker](https://21st.dev/ncdai/wheel-picker/default) by [Chánh Đại](https://21st.dev/ncdai)

[React Wheel Picker](https://www.npmjs.com/package/@ncdai/react-wheel-picker) by [Chánh Đại](https://github.com/ncdai)

[Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar) by [Aceternity UI](https://ui.aceternity.com/)

[Splashed Toast Notifications - CSS](https://codepen.io/josetxu/pen/OJGXdzY) by [Josetxu](https://codepen.io/josetxu/pen/OJGXdzY)

[Push Notifications](https://codepen.io/FlorinPop17/pen/xxORmaB) by [Florin Pop](https://codepen.io/FlorinPop17)

[Perplexity](https://www.perplexity.ai/)

⠀

Used [Namer UI](https://namer-ui.netlify.app/) components:

[Chronicle Button](https://namer-ui.netlify.app/components)

[Circular Testimonials](https://codepen.io/Northstrix/pen/QwWoYzZ)

⠀

Used toast: [Splashed Push Notifications](https://21st.dev/Northstrix/splashed-push-notifications/default)
`;

function parseMarkdownEntry(entry: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  const elements = [];
  let key = 0;

  while ((match = regex.exec(entry)) !== null) {
    if (match.index > lastIndex) {
      elements.push(<span key={key++}>{entry.slice(lastIndex, match.index)}</span>);
    }
    elements.push(
      <a
        key={key++}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80 transition-colors mx-1"
      >
        {match[1]}
      </a>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < entry.length) {
    elements.push(<span key={key++}>{entry.slice(lastIndex)}</span>);
  }

  return elements;
}

export default function CreditPage() {
  const { t } = useLanguage();

  const creditEntries = creditsMarkdown
    .split(/\n\s*\n/)
    .map((e) => e.trim())
    .filter(Boolean);

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline text-primary">
          {t("credit_page_title") || "Credit"}
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          {t("credit_page_description") || "The existence of this project (at least in its current form) wouldn't have been possible without the following:"}
        </p>
      </div>

      <div dir="ltr" className="flex flex-col items-center gap-4">
        {creditEntries.map((entry, idx) => (
          <div
            key={idx}
            className="text-center text-lg leading-relaxed text-foreground/90"
          >
            {parseMarkdownEntry(entry)}
          </div>
        ))}
      </div>
    </div>
  );
}
