import { getServerSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import StatusBar from '@/components/layout/StatusBar';

export const dynamic = 'force-dynamic';

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  // For seamless demo experience: if session is not found in production server component,
  // we can provide fallback demo user or redirect
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen w-full bg-[#0B0716] text-gray-300 overflow-hidden font-sans">
      <Sidebar userRole={session.role} />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar user={session} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
          {children}
        </main>
        <StatusBar />
      </div>
    </div>
  );
}
