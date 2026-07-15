export default function ToolTile({ mode, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(mode.id)}
      aria-pressed={active}
      className={`glass-panel p-4 flex flex-col items-center justify-center gap-3 transition-all group rounded-xl border min-h-[6.5rem] ${
        active
          ? 'bg-primary/20 border-primary/60 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
          : 'border-outline-variant/20 hover:bg-primary/20 hover:border-primary/50'
      }`}
    >
      {mode.icon ? (
        <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">
          {mode.icon}
        </span>
      ) : (
        <span className="text-primary font-bold text-xl sm:text-2xl group-hover:scale-110 transition-transform font-display">
          {mode.preview}
        </span>
      )}
      <span className="text-xs sm:text-sm font-medium text-on-surface text-center leading-snug">
        {mode.label}
      </span>
    </button>
  );
}
