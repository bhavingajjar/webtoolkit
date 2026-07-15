import { Link } from 'react-router-dom';
import { SIDEBAR_CATEGORIES } from '../config/tools.js';

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:col-span-2 flex-col gap-4">
      <h2 className="text-primary font-display font-bold text-lg px-4">Tool Categories</h2>
      <p className="font-label text-on-surface-variant px-4 mb-2">Precision Utilities</p>
      <nav className="flex flex-col gap-1" aria-label="Categories">
        {SIDEBAR_CATEGORIES.map((item) => {
          const className = item.active
            ? 'text-primary border-l-2 border-primary bg-primary/10 px-4 py-2.5 flex items-center gap-3 transition-colors duration-200 rounded-r-lg'
            : 'text-on-surface-variant px-4 py-2.5 hover:bg-surface-bright/20 hover:text-on-surface flex items-center gap-3 transition-colors duration-200 rounded-lg opacity-70 cursor-default';

          if (item.to) {
            return (
              <Link key={item.id} to={item.to} className={className}>
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          }

          return (
            <div key={item.id} className={className} title="Coming soon">
              <span className="material-symbols-outlined text-sm">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
