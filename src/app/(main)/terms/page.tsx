"use client";
import React from "react";

const LegalSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-primary">{title}</h2>
    <div className="space-y-4 text-foreground/90">{children}</div>
  </section>
);

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold font-headline text-center mb-10 text-primary">
        Terms of Use
      </h1>
      <div
        className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground font-body text-left"
        dir="ltr"
      >
        <LegalSection title="1. Acceptance of Terms">
          <p>
            By accessing or using Piny Bush web application (“the Application”), you agree to comply with and be bound by these Terms of Use. If you do not accept these Terms, you may not use the Application.
          </p>
        </LegalSection>

        <LegalSection title="2. Description of Service">
          <p>
            Piny Bush is a web-based visual editor that enables users to customize, and export web components. Users can modify component settings, preview changes in real time, and export generated code.
          </p>
        </LegalSection>

        <LegalSection title="3. Intellectual Property and Third-Party Content">
          <p>
            All product names, company names, trade names, trademarks, service marks, trade dress, logos, symbols, images, copyrighted materials, brand identifiers, and other proprietary content (collectively referred to as "Brand Elements") that may be displayed, referenced, or otherwise incorporated within the Application are the sole property of their respective owners. These Brand Elements are presented for demonstrative, illustrative, and educational purposes only.
          </p>
          <p>
            The Application isn't affiliated with, associated with, endorsed by, sponsored by, or approved by any of the companies, organizations, or entities whose Brand Elements—including but not limited to trademarks, logos, brand names, product images, trade dress, or any other forms of intellectual property—may appear within the Application. The presence or use of any such Brand Elements does not imply or suggest any relationship, authorization, partnership, approval, or association of any kind with the respective rights holders, nor does it imply that any such company or entity has reviewed, approved, or supports the Application. The same applies to all similar, analogous, or related forms of third-party intellectual property, whether specifically listed here or otherwise.
          </p>
        </LegalSection>

        <LegalSection title="4. Disclaimer of Warranties and Limitation of Liability">
          <p>
            The Application is provided "AS IS" and "AS AVAILABLE", without any warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. There is no guarantee the Application will be uninterrupted, error-free, or secure.
          </p>
          <p>
            To the fullest extent permitted by law, the creator shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenues, data, use, goodwill, or other intangible losses, resulting from your access to, use of, or inability to access or use the Application. <b>The creator bears absolutely no responsibility for the way this application is used, nor for any damage, claim, or dispute that may arise from any individual's or entity's use or misuse of the Application or its outputs.</b>
          </p>
        </LegalSection>

        <LegalSection title="5. Modifications to Terms">
          <p>
            The creator reserves the right to update, modify, or replace these Terms at any time. By continuing to access or use the Application after changes become effective, you agree to be bound by the revised Terms. You are encouraged to review these Terms regularly for any updates.
          </p>
        </LegalSection>
      </div>
    </div>
  );
}
