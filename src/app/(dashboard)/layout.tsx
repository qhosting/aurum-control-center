import { Sidebar } from '@/presentation/components/layout/sidebar';
import { Header } from '@/presentation/components/layout/header';
import { getCurrentUser } from '@/lib/session';
import { SessionProvider } from '@/presentation/components/providers/session-provider';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verificar autenticación
  await getCurrentUser();

  return (
    <SessionProvider>
      <div className="flex h-screen bg-cyber-dark cyber-grid-bg">
        <Sidebar />
        <div className="flex-1 pl-64">
          <Header />
          <main className="h-[calc(100vh-4rem)] overflow-y-auto pt-16 cyber-scrollbar">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
