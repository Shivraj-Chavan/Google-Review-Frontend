import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Building2, Images, Link2, Settings, LogOut, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { to: '/business/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/business/profile', label: 'Profile', icon: Building2 },
  // { to: '/business/images', label: 'Images', icon: Images },
  { to: '/business/review-link', label: 'Review Link', icon: Link2 },
  { to: '/business/settings', label: 'Settings', icon: Settings }
];

export default function BusinessLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-ink-100 bg-surface md:flex">
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-700 text-amber-400">
            <Star className="h-4 w-4 fill-amber-400" />
          </div>
          <span className="font-display text-lg font-semibold text-ink-900">Google Review</span>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-ink-700 text-paper' : 'text-ink-700 hover:bg-ink-50'
                }`
              }
            >
              <Icon className="h-4 w-4" /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-ink-100 p-3">
          <div className="mb-2 flex items-center gap-2 px-3 py-2">
            {user?.profileImage ? (
              <img src={user.profileImage} alt="" className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-50 text-xs font-semibold text-ink-700">
                {user?.name?.[0]?.toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink-900">{user?.name}</p>
              <p className="truncate text-xs text-ink-300">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-coral-500 hover:bg-coral-500/5"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile topbar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink-100 bg-surface/90 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-700 text-amber-400">
            <Star className="h-3.5 w-3.5 fill-amber-400" />
          </div>
          <span className="font-display text-base font-semibold text-ink-900">Google Review</span>
        </div>
        <button onClick={handleLogout} className="rounded-full p-2 text-coral-500">
          <LogOut className="h-5 w-5" />
        </button>
      </header>

      <main className="pb-20 md:ml-64 md:pb-8">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-ink-100 bg-surface/95 backdrop-blur md:hidden">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium ${
                isActive ? 'text-ink-700' : 'text-ink-300'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
