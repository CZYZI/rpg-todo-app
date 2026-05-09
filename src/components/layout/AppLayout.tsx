import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface AppLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  showTopBar?: boolean;
  title?: string;
}

export function AppLayout({
  children,
  showSidebar = true,
  showTopBar = true,
  title,
}: AppLayoutProps) {
  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}
      <div className="flex-1 overflow-auto">
        {showTopBar && <TopBar title={title} />}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
