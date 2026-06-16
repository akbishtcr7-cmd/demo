import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { BUTTON_LABELS, ROUTES } from '../../constants/routes'

export const Navbar = () => {
  const { token, logout } = useAuth()

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold text-slate-100">
          {BUTTON_LABELS.appName}
        </Link>
        <div className="flex items-center gap-3">
          <Link to={ROUTES.home} className="rounded-full px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800/80">
            Home
          </Link>
          {token ? (
            <>
              <Link to={ROUTES.dashboard} className="rounded-full px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800/80">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.login} className="rounded-full px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800/80">
                Login
              </Link>
              <Link to={ROUTES.register} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
