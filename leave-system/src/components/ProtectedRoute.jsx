import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/authhook';
import { checkUserRole } from '../utils/authorize';

/**
 * ProtectedRoute - Wraps routes that require the user to be authenticated.
 * Redirects unauthenticated users to /login.
 */
export function ProtectedRoute() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

/**
 * AdminRoute - Wraps routes that require the user to have an admin role.
 * Redirects unauthenticated users to /login.
 * Redirects authenticated non-admin users to /dashboard.
 */
export function AdminRoute() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!checkUserRole(user, 'admin')) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
