
"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import * as WheelPickerPrimitive from "@ncdai/react-wheel-picker";
import "@ncdai/react-wheel-picker/style.css";
import ChronicleButton from "@/components/ui/ChronicleButton/ChronicleButton";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { Language, LANGUAGES } from "@/lib/translations";
import { ModalOverlay } from "./modal-overlay";
import { GlowingEffect } from '../components/ui/GlowingEffect';

export interface LanguageSelectorHandle {
  open: () => void;
  close: () => void;
}

interface LanguageSelectorProps {
  onClose?: () => void;
}

const ANIMATION_DURATION = 0.3;

function WheelPicker({ classNames, ...props }: React.ComponentProps<typeof WheelPickerPrimitive.WheelPicker>) {
  return (
    <WheelPickerPrimitive.WheelPicker
      classNames={{
        optionItem: "text-muted-foreground",
        highlightWrapper: "bg-[var(--language-selector-highlight-background)] text-secondary-foreground",
        ...classNames,
      }}
      {...props}
    />
  );
}

export const LanguageSelector = React.forwardRef<LanguageSelectorHandle, LanguageSelectorProps>(
  function LanguageSelector({ onClose }, ref) {
    const { t, language, setLanguage } = useLanguage();
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(language);
    const [isMobile, setIsMobile] = useState(false);

    React.useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 412);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
      setSelectedValue(language);
    }, [language]);

    const handleValueChange = useCallback(
      (value: string) => {
        setSelectedValue(value);
        if (value !== language) {
          setLanguage(value as Language);
        }
      },
      [language, setLanguage]
    );

    const handleClose = () => {
      setOpen(false);
      onClose?.();
    };

    const options = LANGUAGES.map((lang) => ({
      label: lang.label,
      value: lang.code,
    }));

    return (
      <AnimatePresence>
        {open && (
          <ModalOverlay onClose={handleClose}>
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: ANIMATION_DURATION, ease: "easeInOut" }}
              className="relative bg-[var(--language-selector-body-background)] rounded-lg shadow-xl p-4 md:p-6 min-w-[240px] max-w-[90vw] border border-border flex flex-col items-center outline-none"
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ✅ Glowing effect */}
              <GlowingEffect
                glow
                spread={40}
                proximity={64}
                inactiveZone={0.01}
                disabled={false}
              />

              <div
                className="w-full rounded-md border border-border transition-colors mb-4 md:mb-7 bg-[var(--language-selector-list-background)] overflow-hidden flex justify-center"
              >
                <WheelPicker
                  options={options}
                  value={selectedValue}
                  onValueChange={handleValueChange}
                />
              </div>

              <ChronicleButton
                onClick={handleClose}
                className="w-full"
                variant="default"
              >
                {t("ok_button") || "OK"}
              </ChronicleButton>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    );
  }
);
