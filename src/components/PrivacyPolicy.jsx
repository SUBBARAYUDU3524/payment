import React from "react";

const PrivacyPolicy = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
    <section className="mb-6">
      <h2 className="text-2xl font-semibold">Data Collection</h2>
      <p>
        We collect personal data to facilitate the payment process. This
        includes name, email, and payment details.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-2xl font-semibold">Data Usage</h2>
      <p>
        Your data is used solely for processing payments and maintaining
        transaction records.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-2xl font-semibold">Data Protection</h2>
      <p>
        We implement industry-standard security measures to protect your data.
        Compliance with GDPR and other regulations is ensured.
      </p>
    </section>
  </div>
);

export default PrivacyPolicy;
