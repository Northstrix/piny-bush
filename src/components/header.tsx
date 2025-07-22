
"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import LanguageIcon from './ui/language-icon';
import { LanguageSelector, LanguageSelectorHandle } from './language-selector';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from './ui/button';
import Logo from '@/logo.jpg';

export function Header() {
  const { t, direction } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  const [langHovered, setLangHovered] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    setVisible(latest > 10);
  });

  const languageSelectorRef = useRef<LanguageSelectorHandle>(null);

  const sideMargin = isMobile ? 10 : 24;
  
  const navContent = (isSheet = false) => (
    <>
      <Link href="/" className="flex items-center group no-underline">
        <div className="w-8 h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
             <Image src={Logo} alt="Piny Bush Logo" width={32} height={32} className="rounded-md" />
        </div>
        <span className={
            `font-bold font-headline text-lg text-foreground group-hover:text-primary transition-colors ` +
            (direction === 'rtl' ? 'mr-3' : 'ml-3')
        }>
          {t('app_name') || 'Piny Bush'}
        </span>
      </Link>
      <div className={`flex items-center gap-2 ${isSheet ? 'flex-col mt-6' : ''}`}>
        <div
          className="w-10 h-10 flex items-center justify-center relative cursor-pointer transition-all rounded-md"
          aria-label="Change language"
          onClick={() => languageSelectorRef.current?.open()}
          onMouseEnter={() => setLangHovered(true)}
          onMouseLeave={() => setLangHovered(false)}
          style={{ background: langHovered ? 'hsl(var(--primary))' : 'transparent' }}
        >
          <LanguageIcon width={24} />
        </div>
      </div>
    </>
  );

  return (
    <>
      <div ref={ref} className="h-16" /> {/* Spacer div */}
      <motion.div
        animate={{
          backdropFilter: visible ? 'blur(10px)' : 'none',
          background: visible
            ? 'hsl(var(--background) / 0.8)'
            : 'transparent',
          boxShadow: visible
            ? '0 1px 2px hsl(var(--foreground) / 0.05)'
            : 'none',
          borderBottom: visible
            ? '1px solid hsl(var(--border))'
            : '1px solid transparent',
          y: 0,
          paddingLeft: sideMargin,
          paddingRight: sideMargin,
        }}
        transition={{
          type: 'tween',
          duration: 0.2,
          ease: 'easeInOut',
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          maxWidth: '100vw',
          boxSizing: 'border-box',
          pointerEvents: 'auto',
          zIndex: 50,
        }}
        className="flex justify-center"
      >
        <div 
          className="w-full max-w-7xl h-16 flex items-center justify-between"
        >
          {isMobile ? (
              <>
                <Link href="/" className="flex items-center group no-underline">
                     <div className="w-8 h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                        <Image src={Logo} alt="Piny Bush Logo" width={32} height={32} className="rounded-md" />
                    </div>
                     <span className={
                        `font-bold font-headline text-lg text-foreground group-hover:text-primary transition-colors ` +
                        (direction === 'rtl' ? 'mr-3' : 'ml-3')
                     }>
                      {t('app_name') || 'Piny Bush'}
                    </span>
                </Link>
                 <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side={direction === 'rtl' ? 'left' : 'right'}>
                    <div className="flex flex-col items-start gap-4 p-4">
                        {navContent(true)}
                    </div>
                  </SheetContent>
                </Sheet>
              </>
          ) : (
            navContent()
          )}
        </div>
      </motion.div>
      <LanguageSelector ref={languageSelectorRef} />
    </>
  );
}
