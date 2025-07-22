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

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold font-headline text-center mb-10 text-primary">
        Privacy Policy
      </h1>
      <div
        className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground font-body text-left"
        dir="ltr"
      >
        <LegalSection title="1. Introduction">
          <p>
            This Privacy Policy outlines the types of data that may be collected during use of the Piny Bush web application ("the Application"), along with information on how that data is handled.
          </p>
        </LegalSection>

        <LegalSection title="2. Data Collection and Analytics">
          <p>
            The Application may automatically collect non-personal technical and usage data through the use of Vercel Analytics. The specific data points collected may vary based on factors such as browser configuration, device, and access context.
          </p>
          <p>Examples of such data may include, but are not limited to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Browser type and version</li>
            <li>Device type and screen size</li>
            <li>Operating system details</li>
            <li>Language settings</li>
            <li>Referring domains or sources</li>
            <li>Pages visited within the Application</li>
            <li>Time spent on views and navigation behavior</li>
            <li>Timestamp of access and interactions</li>
            <li>Approximate geographic location (e.g., country)</li>
            <li>Anonymized technical identifiers or metadata</li>
          </ul>
          <p>
            Other technical or usage information not listed here may also be collected. Collection may vary depending on factors outside the control of the Application.
          </p>
          <p>
            For more details, refer to the{' '}
            <a
              href="https://vercel.com/docs/analytics/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Vercel Analytics Privacy Documentation
            </a>.
          </p>
        </LegalSection>

        <LegalSection title="3. Use of Open Source Software">
          <p>
            The Application incorporates open-source software components, including but not limited to publicly available libraries and packages.
          </p>
        </LegalSection>

        <LegalSection title="4. Policy Updates">
          <p>
            This Privacy Policy may be updated periodically to reflect technical, legal, or operational changes. The most recent version is effective immediately upon publication on this page.
          </p>
          <p>
            Continued use of the Application constitutes acknowledgement and acceptance of the current version of this policy.
          </p>
        </LegalSection>
      </div>
    </div>
  );
}
