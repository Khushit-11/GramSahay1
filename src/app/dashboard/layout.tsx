import type { ReactNode } from 'react';
import BottomNav from '@/components/common/bottom-nav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
