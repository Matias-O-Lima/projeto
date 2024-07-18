import { Header } from "@/components/ui/header";
import { Aside } from "@/components/ui/aside";

interface AppLayoutProps {
  children: React.ReactNode;
  itemActive: string;
}

export function AppLayout({ children, itemActive }: AppLayoutProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen">
      <Aside active={itemActive} />
      <div className="flex flex-col">
        <main className="overflow-auto h-screen">
          <Header />
          {children}
        </main>
      </div>
    </div>
  );
}
