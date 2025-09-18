import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  TrendingUp,
  Eye,
  Plus,
  Settings
} from 'lucide-react';
import AnimatedButton from '../../components/UI/AnimatedButton';

const AdminDashboard = () => {
  // Mock data - in a real app, this would come from your database
  const stats = {
    totalProducts: 24,
    totalOrders: 156,
    totalCustomers: 1234,
    totalRevenue: 45678,
    ordersThisMonth: 45,
    revenueThisMonth: 12450
  };

  const recentOrders = [
    {
      id: '1',
      customer: 'Alice Johnson',
      total: 89,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: '2',
      customer: 'Bob Smith',
      total: 156,
      status: 'shipped',
      date: '2024-01-14'
    },
    {
      id: '3',
      customer: 'Carol Davis',
      total: 203,
      status: 'delivered',
      date: '2024-01-13'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/products/new">
            <AnimatedButton className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </AnimatedButton>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+2.1%</span>
            <span className="text-sm text-gray-600 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+5.4%</span>
            <span className="text-sm text-gray-600 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+3.2%</span>
            <span className="text-sm text-gray-600 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">+8.1%</span>
            <span className="text-sm text-gray-600 ml-1">from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <Link to="/admin/orders">
              <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium">
                <Eye className="w-4 h-4" />
                View All
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link 
          to="/admin/products" 
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                Manage Products
              </h3>
              <p className="text-gray-600">Add, edit, and organize your fragrances</p>
            </div>
            <Package className="w-8 h-8 text-gray-400 group-hover:text-purple-600" />
          </div>
        </Link>

        <Link 
          to="/admin/orders" 
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                View Orders
              </h3>
              <p className="text-gray-600">Track and manage customer orders</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-gray-400 group-hover:text-purple-600" />
          </div>
        </Link>

        <Link 
          to="/admin/customers" 
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                Customer List
              </h3>
              <p className="text-gray-600">View customer information and history</p>
            </div>
            <Users className="w-8 h-8 text-gray-400 group-hover:text-purple-600" />
          </div>
        </Link>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                Settings
              </h3>
              <p className="text-gray-600">Configure store settings</p>
            </div>
            <Settings className="w-8 h-8 text-gray-400 group-hover:text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;