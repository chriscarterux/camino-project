"use client";

import { Check, X } from "lucide-react";

const comparisonData = [
  {
    feature: "Phase 1: Foundation",
    free: true,
    workshop: true,
    deep: true,
  },
  {
    feature: "Phase 2: Psychometrics",
    free: false,
    workshop: true,
    deep: true,
  },
  {
    feature: "Phase 3: Personal History",
    free: false,
    workshop: false,
    deep: true,
  },
  {
    feature: "Phase 4: Context Engineering",
    free: false,
    workshop: false,
    deep: true,
  },
  {
    feature: "Phase 5: AI Integration",
    free: false,
    workshop: false,
    deep: true,
  },
  {
    category: "Time Investment",
  },
  {
    feature: "Daily commitment",
    free: "15-20 min",
    workshop: "30 min",
    deep: "45 min",
  },
  {
    feature: "Total duration",
    free: "7 days",
    workshop: "14 days",
    deep: "30 days",
  },
  {
    category: "AI Personalization",
  },
  {
    feature: "Basic pattern recognition",
    free: true,
    workshop: true,
    deep: true,
  },
  {
    feature: "Psychometric integration",
    free: false,
    workshop: true,
    deep: true,
  },
  {
    feature: "Full Life Model AI",
    free: false,
    workshop: false,
    deep: true,
  },
  {
    category: "Support",
  },
  {
    feature: "Self-guided",
    free: true,
    workshop: true,
    deep: false,
  },
  {
    feature: "Community forum",
    free: false,
    workshop: true,
    deep: true,
  },
  {
    feature: "8-week cohort coaching",
    free: false,
    workshop: false,
    deep: true,
  },
];

export default function PricingComparisonTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-border">
            <th className="text-left py-4 px-4 font-semibold">Feature</th>
            <th className="text-center py-4 px-4 font-semibold min-w-[120px]">
              Free Discovery
            </th>
            <th className="text-center py-4 px-4 font-semibold min-w-[120px] bg-[#E2C379]/10">
              Workshop
            </th>
            <th className="text-center py-4 px-4 font-semibold min-w-[120px]">
              Deep Discovery
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((row, idx) => {
            if (row.category) {
              return (
                <tr key={idx} className="border-t-2 border-border">
                  <td
                    colSpan={4}
                    className="py-3 px-4 font-semibold text-sm bg-muted/50"
                  >
                    {row.category}
                  </td>
                </tr>
              );
            }

            return (
              <tr key={idx} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-4 text-sm">{row.feature}</td>
                <td className="py-3 px-4 text-center">
                  {typeof row.free === "boolean" ? (
                    row.free ? (
                      <Check className="h-5 w-5 text-[#E2C379] mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm text-muted-foreground">{row.free}</span>
                  )}
                </td>
                <td className="py-3 px-4 text-center bg-[#E2C379]/5">
                  {typeof row.workshop === "boolean" ? (
                    row.workshop ? (
                      <Check className="h-5 w-5 text-[#E2C379] mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {row.workshop}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {typeof row.deep === "boolean" ? (
                    row.deep ? (
                      <Check className="h-5 w-5 text-[#E2C379] mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm text-muted-foreground">{row.deep}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Available Q1 2026 note */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p className="font-medium">All tiers available Q1 2026</p>
        <p className="mt-1">Waitlist members get early access priority and locked-in pricing</p>
      </div>
    </div>
  );
}
