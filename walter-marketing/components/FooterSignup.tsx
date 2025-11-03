"use client";

import LeadCaptureForm from "@/components/LeadCaptureForm";

export default function FooterSignup() {
  return (
    <div className="bg-gradient-to-br from-[#E2C379]/10 to-transparent border border-[#E2C379]/20 rounded-xl p-6 md:p-8">
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">
          Start your transformation today
        </h3>
        <p className="text-sm text-muted-foreground">
          Join thousands on the path to clarity and purpose
        </p>
      </div>
      <LeadCaptureForm
        source="footer"
        variant="inline"
        showInterest={false}
      />
    </div>
  );
}
