import { auth } from "@/auth";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin | RV EVENTS",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }) {
  const session = await auth();
  // Login page renders without shell
  if (!session?.user) {
    return <div className="min-h-screen bg-zinc-100">{children}</div>;
  }
  return <AdminShell user={session.user}>{children}</AdminShell>;
}
