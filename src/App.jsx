import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Loader } from './components/Basics';

import Landing from './pages/Landing';
import PublicReviewPage from './pages/public/ReviewPage';

import BusinessLayout from './layouts/BusinessLayout';
import Dashboard from './pages/business/Dashboard';
import Profile from './pages/business/Profile';
import Images from './pages/business/Images';
import ReviewLink from './pages/business/ReviewLink';
import Settings from './pages/business/Settings';

import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBusinesses from './pages/admin/AdminBusinesses';
import AdminUsers from './pages/admin/AdminUsers';

function LegacyDashboardRedirect() {
  const location = useLocation();
  return <Navigate to={{ pathname: '/business/dashboard', search: location.search }} replace />;
}

function RequireBusinessUser({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader label="Loading…" />;
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader label="Loading…" />;
  if (!user || user.role !== 'ADMIN') return <Navigate to="/admin/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/review/:slug" element={<PublicReviewPage />} />

      <Route
        path="/business"
        element={<RequireBusinessUser><BusinessLayout /></RequireBusinessUser>}
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="images" element={<Images />} />
        <Route path="review-link" element={<ReviewLink />} />
        <Route path="settings" element={<Settings />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={<RequireAdmin><AdminLayout /></RequireAdmin>}
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="businesses" element={<AdminBusinesses />} />
        <Route path="users" element={<AdminUsers />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      <Route path="/dashboard" element={<LegacyDashboardRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
