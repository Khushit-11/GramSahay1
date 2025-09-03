'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { User, Landmark } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-card/90 backdrop-blur-sm border-b shadow-sm z-50">
      <div className="flex justify-between items-center h-full max-w-lg mx-auto px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-full">
                <Landmark className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg font-headline text-primary">GrahSahay</span>
        </Link>
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/profile">
            <User className="h-6 w-6" />
            <span className="sr-only">Profile</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
