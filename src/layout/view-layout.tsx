"use client";

import { useState } from 'react';
import { CardBreadcrumb } from '@/components/cards/card-breadcrumb';
import { Aside } from '@/components/ui/aside';
import { Header } from '@/components/ui/header';

interface AppLayoutProps {
  children: React.ReactNode;
  itemActive: string;
  disableHistoryRoute?: any;
}

export function ViewLayout({
  children,
  itemActive,
  disableHistoryRoute,
}: AppLayoutProps) {
  const [asideOpen, setAsideOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`fixed inset-y-0 left-0 transform ${asideOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 z-40 bg-gray-800 lg:bg-transparent`}>
        <Aside active={itemActive} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden p-4 fixed top-0 left-0 z-50">
          <button
            onClick={() => setAsideOpen(!asideOpen)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto mt-12 lg:mt-0 p-5 lg:p-10">
          <Header />
          {!disableHistoryRoute && <CardBreadcrumb />}
          {children}
        </div>
      </div>
    </div>
  );
}
