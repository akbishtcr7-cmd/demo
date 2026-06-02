export const Footer = () => (
  <footer className="border-t border-slate-800 bg-slate-950/90 py-6">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-sm text-slate-500 sm:px-6 lg:px-8">
      <p>© {new Date().getFullYear()} Frontend Demo. Built with React, Vite, Tailwind CSS, and modern best practices.</p>
      <p className="text-slate-400">Designed for modular apps, reusable components, and clean routing.</p>
    </div>
  </footer>
}
