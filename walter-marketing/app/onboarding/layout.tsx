import { OnboardingProvider } from "@/lib/onboarding/context";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-gradient-to-br from-[var(--camino-ivory)] via-white to-[var(--camino-sandstone)]">
        {children}
      </div>
    </OnboardingProvider>
  );
}
