import React from "react";

const FAQ = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
    <section className="mb-6">
      <h2 className="text-2xl font-semibold">How do I make a payment?</h2>
      <p>
        Log in to your account, select the fees you wish to pay, and proceed to
        the payment gateway.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-2xl font-semibold">
        What payment methods are accepted?
      </h2>
      <p>We accept credit cards, debit cards, and UPI payments.</p>
    </section>
    <section className="mb-6">
      <h2 className="text-2xl font-semibold">How can I request a refund?</h2>
      <p>
        Contact the administration office for assistance with refunds as per the
        policy.
      </p>
    </section>
  </div>
);

export default FAQ;
