import AdminPanel from "../../../components/AdminPanel";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminPage({ params }) {
  const { token } = await params;
  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-xl font-semibold text-brand">
          Revisione onboarding — {token}
        </h1>
        <AdminPanel token={token} />
      </div>
    </main>
  );
}
