import AppHeader from '~/components/app/AppHeader';
import AppSidebar from '~/components/app/AppSidebar';
import MobileTabBar from '~/components/app/MobileTabBar';
import AuthGuard from '~/components/app/AuthGuard';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-violet-50/50 dark:bg-slate-900">
        <AppHeader />
        <AppSidebar />
        <main className="lg:pl-64 pt-16 pb-20 lg:pb-0">
          <div className="p-4 sm:p-8">{children}</div>
        </main>
        <MobileTabBar />
      </div>
    </AuthGuard>
  );
}
