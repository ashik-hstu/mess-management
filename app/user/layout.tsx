import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/user">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/user/history">
            <Button variant="ghost">Booking History</Button>
          </Link>
          {/* Add more user nav links here as needed */}
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
