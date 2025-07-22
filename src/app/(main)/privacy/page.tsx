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
            This Privacy Policy sets forth the types of information that may be collected via the Piny Bush application (“the Application”) and how such information is processed and handled.
          </p>
        </LegalSection>

        <LegalSection title="2. Information Collected">
          <p>
            When you interact with the Application, certain technical and usage information may be automatically collected through the use of Google Analytics or similar analytics services. The types of data that may be collected include, but are not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Device and operating system information</li>
            <li>Browser type and version</li>
            <li>IP address (processed and anonymized where applicable by analytics providers)</li>
            <li>Pages visited, actions taken, and features used within the Application</li>
            <li>General geographic region (such as country or city)</li>
            <li>Referring website or source</li>
            <li>Usage times and session duration</li>
            <li>Other technical or device-identifying data</li>
            <li>Aggregated usage metrics</li>
            <li>
              Any other data collected by Google Analytics and other third-party services, which may include technical identifiers, interaction logs, and related information as determined by those service providers.
            </li>
          </ul>
          <p>
            This information is collected automatically and generally compiled in an aggregated, statistical form by analytics providers. The Application does not seek to collect data that directly identifies individuals.
          </p>
          <p>
            Component configurations and application settings you adjust within the editor operate within your browser. These changes are processed locally and are not actively transmitted to, or stored on, servers managed by the Application, except as may be incidentally captured by analytics services or third-party providers.
          </p>
        </LegalSection>

        <LegalSection title="3. Use of Analytics Services">
          <p>
            The Application utilizes Google Analytics, which collects and analyzes non-personally identifiable information about overall usage patterns and technical characteristics of users' devices and interactions. Details about the specific data collected and its subsequent handling are governed by the Google Privacy Policy and applicable terms of service.
          </p>
        </LegalSection>

        <LegalSection title="4. Data Disclosure and Sharing">
          <p>
            Information collected through analytics tools is used in accordance with this Privacy Policy and is not knowingly sold, licensed, or disclosed to third parties, except as may be required by law, regulation, or legal process, or as necessary to maintain or improve the Application’s functionality and security. Anonymous or aggregated analytics data may be shared with service providers, such as analytics partners, in the ordinary operation of the Application.
          </p>
        </LegalSection>

        <LegalSection title="5. Data Security">
          <p>
            The Application employs reasonable technical and organizational measures intended to safeguard the integrity, confidentiality, and security of data collected during your use of the Application. Nonetheless, no method of transmission over the Internet or electronic storage can be guaranteed to be fully secure or error-free. Users are encouraged to take appropriate precautions when using web applications.
          </p>
        </LegalSection>

        <LegalSection title="6. Policy Updates">
          <p>
            This Privacy Policy may be revised periodically. Users are advised to review this page regularly in order to stay informed of any changes. Continued use of the Application after updates are posted signifies acceptance of the revised policy.
          </p>
        </LegalSection>

        <LegalSection title="7. Contact">
          <p>
            For any questions, requests, or concerns regarding this Privacy Policy, please contact the creator of the Application.
          </p>
        </LegalSection>
      </div>
    </div>
  );
}