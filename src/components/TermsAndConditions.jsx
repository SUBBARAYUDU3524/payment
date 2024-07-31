import React from "react";

const TermsAndConditions = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
    <section className="mb-6">
      <h2 className="text-2xl font-semibold">Payment Terms</h2>
      <p>
        All payments must be made through the online system. Fees are due as per
        the schedule provided by the university.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-2xl font-semibold">Refund Policy</h2>
      <p>
        Refunds will be processed according to the university's policy,
        typically within 14 business days.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-2xl font-semibold">User Obligations</h2>
      <p>
        Users must ensure that the information provided is accurate and
        up-to-date. Misuse of the system may result in penalties.
      </p>
    </section>
  </div>
);

export default TermsAndConditions;
