import "./globals.css";

export const metadata = {
  title: "DMP Partners — Onboarding",
  description: "Questionario di avvio del sistema marketing DMP Partners",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-slate-50 text-ink antialiased">{children}</body>
    </html>
  );
}
