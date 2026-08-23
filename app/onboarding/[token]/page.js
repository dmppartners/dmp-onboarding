import Wizard from "../../../components/Wizard";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function OnboardingPage({ params }) {
  const { token } = await params;

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-wide text-brand-accent">Onboarding riservato</p>
        <h1 className="mt-1 text-2xl font-semibold text-brand">
          Avviamo il sistema marketing di {"DMP Partners"}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Rispondi con calma: puoi tornare indietro tra i passi. Nulla viene pubblicato
          automaticamente da questo questionario — serve solo a configurare il sistema.
        </p>
      </div>
      <Wizard token={token} />
    </main>
  );
}
