"use client"
import React, { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  Wallet,
  CreditCard,
  Home,
  HelpCircle,
  Settings,
  FileText
} from "lucide-react";

// 1. The Child Component handling the dynamic search parameters
function UserJourneyLayoutContent({ children }: { children: React.ReactNode }) {
  // Read the current URL path and search params
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract the active borrower ID from the URL first, fallback to sessionStorage if available
  const urlBorrowerId = searchParams.get('id');
  const activeBorrowerId = urlBorrowerId || (typeof window !== 'undefined' ? sessionStorage.getItem('activeBorrowerId') : null);

  // Construct a persistent query string to maintain state across steps
  const queryString = activeBorrowerId ? `?id=${activeBorrowerId}` : '';

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col antialiased">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-72 bg-surface-container-low border-r border-outline-variant/10 p-6 fixed h-[calc(100vh-72px)]">
          <div className="mb-10">
            <h2 className="font-headline text-lg font-black text-primary">Application Journey</h2>
          </div>

          {/* Navigation Engine with Persistent Query Parameters */}
          <nav className="flex-1 space-y-2">
            <SidebarItem
              href={`/userjourney${queryString}`}
              icon={<User size={20} />}
              label="Borrower Info"
              pathname={pathname}
            />
            <SidebarItem
              href={`/userjourney/assets${queryString}`}
              icon={<Wallet size={20} />}
              label="Financial Assets"
              pathname={pathname}
            />
            <SidebarItem
              href={`/userjourney/liabilities${queryString}`}
              icon={<CreditCard size={20} />}
              label="Financial Liabilities"
              pathname={pathname}
            />
            <SidebarItem
              href={`/userjourney/documents${queryString}`}
              icon={<FileText size={20} />}
              label="Documents"
              pathname={pathname}
            />
          </nav>

          <div className="pt-6 border-t border-outline-variant/10 space-y-4">
            <div className="flex items-center gap-3 text-on-surface-variant hover:text-primary cursor-pointer text-sm font-medium">
              <HelpCircle size={18} /> Support
            </div>
            <div className="flex items-center gap-3 text-on-surface-variant hover:text-primary cursor-pointer text-sm font-medium">
              <Settings size={18} /> Settings
            </div>
          </div>
        </aside>

        {/* Page Content */}
        <main className="flex-1 md:ml-72 p-8 lg:p-12 bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}

// 2. The Parent Layout Component establishing the Suspense boundary
export default function UserJourneyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary font-bold animate-pulse">Loading Application Journey...</p>
      </div>
    }>
      <UserJourneyLayoutContent>
        {children}
      </UserJourneyLayoutContent>
    </Suspense>
  );
}

// Upgraded SidebarItem with Next.js Link and dynamic active state
function SidebarItem({
  href,
  icon,
  label,
  pathname
}: {
  href: string,
  icon: React.ReactNode,
  label: string,
  pathname: string
}) {
  // Extract path base (ignoring query params) to accurately determine active status
  const currentBasePath = pathname.split('?')[0];
  const targetBasePath = href.split('?')[0];
  const isActive = currentBasePath === targetBasePath;

  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer mb-1 ${isActive
        ? 'bg-white shadow-sm text-primary font-bold border border-outline-variant/10'
        : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-primary'
        }`}>
        <span className={isActive ? 'text-secondary' : 'text-on-surface-variant'}>{icon}</span>
        <span className="text-sm font-headline">{label}</span>
      </div>
    </Link>
  );
}