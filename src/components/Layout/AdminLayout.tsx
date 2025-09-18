import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const { user, signOut, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: location.pathname === '/admin'
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: Package,
      current: location.pathname.startsWith('/admin/products')
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart,
      current: location.pathname.startsWith('/admin/orders')
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: Users,
      current: location.pathname.startsWith('/admin/customers')
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      current: location.pathname.startsWith('/admin/settings')
    },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              PerfumeStudio
            </span>
          </Link>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? 'bg-purple-50 text-purple-600 border-r-2 border-purple-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      item.current ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-600'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              to="/"
              className="group flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-purple-600 transition-colors"
            >
              <Home className="mr-3 h-5 w-5 text-gray-400 group-hover:text-purple-600" />
              Back to Website
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full group flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-600" />
              Sign Out
            </button>
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600">Signed in as</p>
            <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="py-8 px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;