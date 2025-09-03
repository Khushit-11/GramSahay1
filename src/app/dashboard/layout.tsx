import type { ReactNode } from 'react';
import BottomNav from '@/components/common/bottom-nav';
import TopNav from '@/components/common/top-nav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col flex-1">
      <TopNav />
      <main className="flex-1 pt-20 pb-24 bg-secondary/20">{children}</main>
      <BottomNav />
    </div>
  );
}
