"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Images,
  Inbox,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/portfolio", label: "Portfolio", icon: Images },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/quotations", label: "Quotations", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({ children, user }) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("admin-app");
    return () => document.body.classList.remove("admin-app");
  }, []);

  return (
    <div className="admin-shell min-h-screen bg-[#f4f2ee] text-zinc-900">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="hidden w-64 shrink-0 border-r border-zinc-200 bg-[#0c0c0c] p-5 text-[#f3f0eb] md:block">
          <Link
            href="/admin"
            className="block font-semibold tracking-[0.15em] text-[#f3f0eb]"
          >
            RV EVENTS
          </Link>
          <p className="mt-1 text-xs text-[#8a847a]">Admin</p>
          <nav className="mt-8 space-y-1">
            {LINKS.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/admin" ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-[#f3f0eb] font-medium text-[#0c0c0c]"
                      : "text-[#c8c2b8] hover:bg-white/10 hover:text-white"
                  }`}
                  style={
                    active
                      ? { color: "#0c0c0c", backgroundColor: "#f3f0eb" }
                      : { color: "#c8c2b8" }
                  }
                >
                  <Icon size={16} color={active ? "#0c0c0c" : "#c8c2b8"} />
                  <span style={{ color: active ? "#0c0c0c" : "#c8c2b8" }}>{label}</span>
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="mt-8 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-[#c8c2b8] hover:bg-white/10 hover:text-white"
          >
            <LogOut size={16} color="#c8c2b8" />
            Sign out
          </button>
          {user?.email && (
            <p className="mt-4 truncate text-xs text-[#8a847a]">{user.email}</p>
          )}
        </aside>

        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 md:px-8">
            <p className="text-sm font-medium text-zinc-900 md:hidden">RV EVENTS Admin</p>
            <div className="flex gap-3 overflow-x-auto md:hidden">
              {LINKS.map((l) => {
                const active =
                  l.href === "/admin"
                    ? pathname === l.href
                    : pathname.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="whitespace-nowrap text-xs"
                    style={{ color: active ? "#0c0c0c" : "#71717a", fontWeight: active ? 600 : 400 }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/"
              className="ml-auto text-xs text-zinc-500 hover:text-zinc-900"
              style={{ color: "#71717a" }}
            >
              View site
            </Link>
          </header>
          <div className="p-4 md:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
