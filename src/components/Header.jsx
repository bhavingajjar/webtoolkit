import { Link } from 'react-router-dom';
import { MEGA_MENU_TEXT_TOOLS } from '../config/tools.js';
import ThemeToggle from './ThemeToggle.jsx';

const NAV = [
  { label: 'Text Tools', hasMenu: true },
  { label: 'Code & Data', hasMenu: false },
  { label: 'Image & Media', hasMenu: false },
  { label: 'Font Styles', hasMenu: false },
  { label: 'Random Generators', hasMenu: false },
  { label: 'Resources', hasMenu: false },
];

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function Header() {
  const columns = chunk(MEGA_MENU_TEXT_TOOLS, Math.ceil(MEGA_MENU_TEXT_TOOLS.length / 3));

  return (
    <header className="bg-surface-container/90 backdrop-blur-xl sticky top-0 z-50 border-b border-outline-variant/40 shadow-sm flex justify-between items-center w-full px-4 sm:px-6 py-3 h-16">
      <Link to="/" className="flex items-center gap-3 min-w-0">
        <img
          src={`${import.meta.env.BASE_URL}assets/logo.png`}
          alt="WebToolkit"
          className="h-8 w-8 rounded object-cover shrink-0"
        />
        <span className="text-lg sm:text-xl font-display font-bold tracking-tight text-on-surface truncate">
          WebToolkit
        </span>
      </Link>

      <div className="hidden lg:flex items-center gap-6">
        <ThemeToggle />
        <nav className="flex items-center gap-1 xl:gap-3" aria-label="Primary">
          {NAV.map((item) =>
            item.hasMenu ? (
              <div key={item.label} className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 text-primary transition-colors px-2 py-1 rounded font-medium text-sm"
                >
                  {item.label}
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
                <div className="absolute top-full left-0 mt-2 w-[min(800px,90vw)] bg-surface-container-high/95 backdrop-blur-xl border border-primary/20 rounded-xl shadow-2xl p-6 grid grid-cols-3 gap-x-6 gap-y-1 z-[100] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-opacity duration-150">
                  {columns.map((col, idx) => (
                    <div key={idx} className="space-y-1">
                      {col.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="block px-3 py-2 text-sm text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors font-display"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <span
                key={item.label}
                className="text-on-surface-variant px-2 py-1 rounded font-medium text-sm cursor-default opacity-70"
                title="Coming soon"
              >
                {item.label}
              </span>
            ),
          )}
        </nav>
      </div>

      <div className="lg:hidden">
        <ThemeToggle />
      </div>
    </header>
  );
}
