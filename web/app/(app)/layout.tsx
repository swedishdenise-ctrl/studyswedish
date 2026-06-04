import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/auth/actions";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, streak_count, current_level")
    .eq("id", user.id)
    .single();

  const name = profile?.display_name || user.email || "Learner";

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="hidden w-60 border-r border-black/5 bg-white p-6 md:block">
        <Link
          href="/dashboard"
          className="font-display text-xl font-semibold tracking-tight text-swedish-blue"
        >
          StudySwedish
        </Link>
        <nav className="mt-8 flex flex-col gap-1 text-sm">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/learn">Learn</NavLink>
          <NavLink href="/practice/flashcards">Practice</NavLink>
          <NavLink href="/community">Community</NavLink>
          <NavLink href="/profile">Profile</NavLink>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-black/5 bg-white px-6">
          <div className="text-sm text-charcoal/70">
            Välkommen, <span className="font-medium text-charcoal">{name}</span>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-charcoal/70 hover:text-swedish-blue"
            >
              Sign out
            </button>
          </form>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="rounded-lg px-3 py-2 text-charcoal/80 hover:bg-cream">
      {children}
    </Link>
  );
}
