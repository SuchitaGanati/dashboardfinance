

import React from 'react';

type Props = { children: React.ReactNode };

type DashboardLayoutComponent = React.FC<Props> & {
  Header:  React.FC<Props>;
  Sidebar: React.FC<Props>;
  Content: React.FC<Props>;
};

const DashboardLayout: DashboardLayoutComponent = ({ children }) => (
  <div className="grid grid-rows-[64px_1fr] grid-cols-1 lg:grid-cols-[260px_1fr] min-h-screen items-start bg-background text-foreground">
    {children}
  </div>
);

/* ── HEADER ── */
const Header: React.FC<Props> = ({ children }) => (
  <header className="col-span-1 lg:col-span-2 row-start-1 border-b border-border flex items-center sticky top-0 z-50 bg-background">
    {children}
  </header>
);

/* ── SIDEBAR ── */
const Sidebar: React.FC<Props> = ({ children }) => (
  <>
    {/* Desktop grid cell — hidden on mobile */}
    <aside className="hidden lg:block row-start-2 col-start-1 sticky top-16 h-[calc(100vh-64px)] self-start border-r border-border bg-background">
      {children}
    </aside>
    {/* Mobile mount — always rendered so fixed drawer/tab-bar can exist */}
    <div className="lg:hidden contents">
      {children}
    </div>
  </>
);

/* ── CONTENT ── */
const Content: React.FC<Props> = ({ children }) => (
  <main className="row-start-2 col-start-1 lg:col-start-2 bg-muted min-h-[calc(100vh-64px)] pb-24 lg:pb-6">
    {children}
  </main>
);

DashboardLayout.Header  = Header;
DashboardLayout.Sidebar = Sidebar;
DashboardLayout.Content = Content;

export default DashboardLayout;