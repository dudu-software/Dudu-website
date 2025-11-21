/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState("intro");

  const sections = [
    { id: "intro", title: "Introduction", label: "Introduction" },
    { id: "definitions", title: "1. Definitions", label: "Definitions" },
    {
      id: "accounts",
      title: "2. User Accounts and Registration",
      label: "Accounts & Registration",
    },
    {
      id: "location",
      title: "3. Location Data and Third-Party Services",
      label: "Location Data",
    },
    {
      id: "merchant",
      title: "4. Merchant Responsibilities and Conduct",
      label: "Merchant Conduct",
    },
    {
      id: "ip",
      title: "5. Intellectual Property",
      label: "Intellectual Property",
    },
    { id: "termination", title: "6. Termination", label: "Termination" },
    { id: "governing", title: "7. Governing Law", label: "Governing Law" },
    {
      id: "liability",
      title: "8. Limitation of Liability",
      label: "Liability",
    },
    { id: "changes", title: "9. Changes to Terms", label: "Changes" },
    { id: "contact", title: "10. Contact Information", label: "Contact" },
  ];

  return (
    <div className="flex flex-col lg:flex-row bg-background text-foreground min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="lg:w-64 lg:fixed lg:h-screen lg:overflow-y-auto border-b lg:border-r border-border bg-card">
        <div className="p-6 lg:p-8">
          <h2 className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wider">
            Table of Contents
          </h2>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`block w-full text-left px-4 py-2.5 rounded-md text-sm transition-colors ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <div className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
          {/* Header */}
          <header className="mb-12">
            <p className="text-sm text-muted-foreground mb-2">
              Last Updated: November 21, 2025
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-pretty">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Welcome to DuDu! These Terms of Service ("Terms") govern your
              access to and use of the DuDu website, mobile applications, and
              services (collectively, the "Service").
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              By accessing or using the Service, you agree to be bound by these
              Terms. If you disagree with any part of the terms, then you may
              not access the Service.
            </p>
          </header>

          {/* Sections */}
          <div className="space-y-16">
            {/* Definitions */}
            <section id="definitions" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-4">1. Definitions</h2>
              <div className="space-y-3 text-foreground leading-relaxed">
                <p>
                  <span className="font-semibold">"App" or "Service"</span>{" "}
                  refers to [Your App Name] and all associated platforms.
                </p>
                <p>
                  <span className="font-semibold">
                    "User," "You," or "Your"
                  </span>{" "}
                  refers to the individual or entity accessing or using the
                  Service.
                </p>
                <p>
                  <span className="font-semibold">"Merchant"</span> refers to a
                  specific type of User who creates an account to list, sell, or
                  provide goods and services through the App.
                </p>
                <p>
                  <span className="font-semibold">"Customer"</span> refers to a
                  specific type of User who uses the App to browse, purchase, or
                  order goods and services from a Merchant.
                </p>
              </div>
            </section>

            {/* Accounts */}
            <section id="accounts" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-4">
                2. User Accounts and Registration
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    2.1 Eligibility
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You must be at least 18 years old or the age of legal
                    majority in your jurisdiction to register for an account and
                    use the Service.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    2.2 Merchant Accounts
                  </h3>
                  <p className="text-foreground leading-relaxed mb-3">
                    To create a Merchant account, you must provide accurate and
                    complete information, including, but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-foreground">
                    <li>Legal business name and contact information.</li>
                    <li>
                      A valid email address, which will be used for
                      verification, account administration, and service
                      notifications.
                    </li>
                    <li>
                      Payment and banking information for processing
                      transactions.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    2.3 Account Security
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You are responsible for safeguarding the password that you
                    use to access the Service and for any activities or actions
                    under your password. You agree not to disclose your password
                    to any third party. You must notify us immediately upon
                    becoming aware of any breach of security or unauthorized use
                    of your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    2.4 Email Verification
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    You agree that the email address provided during
                    registration is the primary method of verification and
                    communication. Failure to maintain a valid, verifiable email
                    address may result in the suspension or termination of your
                    account.
                  </p>
                </div>
              </div>
            </section>

            {/* Location Data */}
            <section id="location" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-4">
                3. Use of Location Data and Third-Party Services (Google Maps
                API)
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    3.1 Data Collection and Consent
                  </h3>
                  <p className="text-foreground leading-relaxed mb-3">
                    The Service utilizes location data to facilitate
                    transactions, enable map displays (e.g., store locations,
                    delivery estimates), and provide localized services.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-foreground">
                    <li>
                      By using the Service, you consent to the collection and
                      use of your real-time geographic location data.
                    </li>
                    <li>
                      If you are a Merchant, you consent to the Service
                      displaying the location of your business premises or
                      defined service area.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    3.2 Google Maps Platform
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    The Service uses the Google Maps Platform (including the
                    Google Maps API) for mapping and location-based services. By
                    using the Service, you are also bound by the Google Maps
                    Platform Terms of Service, which can be found at:{" "}
                    <a href="#" className="text-primary hover:underline">
                      [Google Maps Platform Terms of Service Link]
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    3.3 Data Accuracy
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    While we strive to provide accurate location services, we do
                    not guarantee the accuracy of any location data or mapping
                    information. You acknowledge that all digital map data and
                    services are provided "as-is" and we bear no liability for
                    errors in location or distance calculations.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    3.4 Data Sharing
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Your location data will be shared with relevant parties
                    strictly to facilitate the requested transaction (e.g.,
                    Customer location shared with a Merchant's delivery
                    service).
                  </p>
                </div>
              </div>
            </section>

            {/* Merchant Responsibilities */}
            <section id="merchant" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-4">
                4. Merchant Responsibilities and Conduct
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">4.1 Compliance</h3>
                  <p className="text-foreground leading-relaxed">
                    Merchants must ensure that all products, services, and
                    content listed on the App comply with all applicable local,
                    state, national, and international laws, including but not
                    limited to regulations regarding sales, consumer protection,
                    and intellectual property.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    4.2 Product Information
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Merchants are solely responsible for the accuracy, quality,
                    and legality of all products or services offered. This
                    includes pricing, taxes, descriptions, images, and inventory
                    levels.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    4.3 Transaction Fulfillment
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Merchants are responsible for timely fulfillment of all
                    orders, managing returns, and providing customer support
                    related to their goods or services.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    4.4 Prohibited Content and Sales
                  </h3>
                  <p className="text-foreground leading-relaxed mb-3">
                    You agree not to list or sell items that are:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-foreground">
                    <li>
                      Illegal, harmful, threatening, defamatory, obscene,
                      harassing, racially or ethnically offensive
                    </li>
                    <li>
                      Items that violate any third party's rights, including
                      copyright, trademark, and privacy
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section id="ip" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-foreground leading-relaxed">
                The Service and its original content (excluding User Content),
                features, and functionality are and will remain the exclusive
                property of [Your App Name] and its licensors. Our trademarks
                and trade dress may not be used in connection with any product
                or service without the prior written consent of [Your App Name].
              </p>
            </section>

            {/* Termination */}
            <section id="termination" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-4">6. Termination</h2>
              <p className="text-foreground leading-relaxed">
                We may terminate or suspend your account immediately, without
                prior notice or liability, for any reason whatsoever, including
                without limitation if you breach the Terms. Upon termination,
                your right to use the Service will immediately cease.
              </p>
            </section>

            {/* Governing Law */}
            <section id="governing" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-4">7. Governing Law</h2>
              <p className="text-foreground leading-relaxed">
                These Terms shall be governed and construed in accordance with
                the laws of [Your Jurisdiction/State/Country], without regard to
                its conflict of law provisions.
              </p>
            </section>

            {/* Liability */}
            <section id="liability" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-foreground leading-relaxed">
                In no event shall [Your App Name], nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from (i)
                your access to or use of or inability to access or use the
                Service; (ii) any conduct or content of any third party on the
                Service; (iii) any content obtained from the Service; and (iv)
                unauthorized access, use or alteration of your transmissions or
                content, whether based on warranty, contract, tort (including
                negligence) or any other legal theory, whether or not we have
                been informed of the possibility of such damage.
              </p>
            </section>

            {/* Changes */}
            <section id="changes" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
              <p className="text-foreground leading-relaxed">
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will try to provide at least 30 days' notice prior to any new
                terms taking effect. By continuing to access or use our Service
                after those revisions become effective, you agree to be bound by
                the revised terms.
              </p>
            </section>

            {/* Contact */}
            <section id="contact" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-4">
                10. Contact Information
              </h2>
              <p className="text-foreground leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:legal@yourapp.com"
                    className="text-primary hover:underline"
                  >
                    software.dudu@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Footer Spacing */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Last updated: November 21, 2025
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
