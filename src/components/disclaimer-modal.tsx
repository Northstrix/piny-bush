"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ModalOverlay } from "./modal-overlay";
import ChronicleButton from "./ui/ChronicleButton/ChronicleButton";
import CustomCheckbox from "./ui/CustomCheckbox";

interface DisclaimerModalProps {
  onAccept: () => void;
}

export function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const isBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      if (isBottom) setHasScrolledToBottom(true);
    };

    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      <ModalOverlay onClose={() => {}}>
        <motion.div
          key="disclaimer-modal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-card rounded-lg shadow-xl p-6 md:p-8 max-w-lg w-full border border-border flex flex-col outline-none"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          dir="ltr"
        >
          <h2 className="text-2xl font-bold font-headline mb-4 text-foreground">
            Welcome to Piny Bush
          </h2>

          <div
            ref={scrollContainerRef}
            className="text-foreground/90 space-y-4 text-sm max-h-[50vh] overflow-y-auto pr-4 border border-border rounded p-4"
          >
            <p>
              The Application is provided "AS IS" and "AS AVAILABLE", without any warranty of any kind,
              express or implied, including but not limited to warranties of merchantability, fitness
              for a particular purpose, or non-infringement. There is no guarantee the Application
              will be uninterrupted, error-free, or secure.
            </p>

            <p>
              To the fullest extent permitted by law, the creator shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits,
              revenues, data, use, goodwill, or other intangible losses, resulting from your access to,
              use of, or inability to access or use the Application.{" "}
              <b>
                The creator bears absolutely no responsibility for the way this application is used, nor
                for any damage, claim, or dispute that may arise from any individual's or entity's use or
                misuse of the Application or its outputs.
              </b>
            </p>

            <p>
              All product names, company names, trade names, trademarks, service marks, trade dress,
              logos, symbols, images, copyrighted materials, brand identifiers, and other proprietary
              content (collectively referred to as "Brand Elements") that may be displayed, referenced,
              or otherwise incorporated within the Application are the sole property of their respective
              owners. These Brand Elements are presented for demonstrative, illustrative, and educational
              purposes only.
            </p>

            <p>
              The Application isn't affiliated with, associated with, endorsed by, sponsored by, or
              approved by any of the companies, organizations, or entities whose Brand Elements—
              including but not limited to trademarks, logos, brand names, product images, trade dress, or
              any other forms of intellectual property—may appear within the Application. The presence or
              use of any such Brand Elements does not imply or suggest any relationship, authorization,
              partnership, approval, or association of any kind with the respective rights holders, nor
              does it imply that any such company or entity has reviewed, approved, or supports the
              Application. The same applies to all similar, analogous, or related forms of third-party
              intellectual property, whether specifically listed here or otherwise.
            </p>

            <p>
              By continuing, you acknowledge that you have read and accept to the full{" "}
              <Link href="/terms" className="underline hover:text-primary">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <CustomCheckbox
              checked={isChecked}
              onChange={setIsChecked}
              disabled={!hasScrolledToBottom}
              label={
                <span className="text-xs">
                  I've read the terms of use and privacy policy and accept them.
                </span>
              }
              direction="ltr"
              accentColor="hsl(var(--primary))"
              backgroundColor="hsl(var(--muted))"
              borderColor="hsl(var(--border))"
            />

            <div className="relative w-full">
              <ChronicleButton
                onClick={onAccept}
                disabled={!isChecked}
                className="w-full"
              >
                Continue
              </ChronicleButton>

              {!isChecked && (
                <div className="absolute inset-0 w-full h-full bg-black/50 rounded-[inherit] cursor-not-allowed z-10" />
              )}
            </div>
          </div>
        </motion.div>
      </ModalOverlay>
    </AnimatePresence>
  );
}
