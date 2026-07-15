import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import AdSlot from './AdSlot.jsx';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col text-on-background">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-ad-margin py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Sidebar />
        <section className="lg:col-span-8 space-y-8 min-w-0">{children}</section>
        <aside className="hidden lg:block lg:col-span-2">
          <AdSlot variant="skyscraper" />
        </aside>
      </main>
      <AdSlot variant="leaderboard" className="no-print" />
      <Footer />
    </div>
  );
}
