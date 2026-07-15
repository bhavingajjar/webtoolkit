import { Link } from 'react-router-dom';
import { FOOTER_COLUMNS } from '../config/tools.js';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-ad-margin py-12 max-w-7xl mx-auto">
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-on-surface mb-6 flex items-center gap-2 text-lg font-semibold">
              <span className="material-symbols-outlined text-primary">{col.icon}</span>
              {col.title}
            </h4>
            <ul className="space-y-3 text-on-surface-variant">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className="hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <span className="opacity-60">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-ad-margin py-6 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-label text-on-surface-variant">© Copyright WebToolkit.</p>
        <div className="flex gap-8 font-label text-on-surface-variant">
          <span className="hover:text-primary transition-colors cursor-default">About</span>
          <span className="hover:text-primary transition-colors cursor-default">Links</span>
          <span className="hover:text-primary transition-colors cursor-default">Blog</span>
          <button
            type="button"
            className="hover:text-primary transition-colors"
            onClick={() => window.print()}
          >
            Print
          </button>
        </div>
      </div>
    </footer>
  );
}
