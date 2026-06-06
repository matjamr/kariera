import AppHeader from '~/components/app/AppHeader';
import AppSidebar from '~/components/app/AppSidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-violet-50/50 dark:bg-slate-900">
      <AppHeader />
      <AppSidebar />
      <main className="pl-64 pt-16">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
