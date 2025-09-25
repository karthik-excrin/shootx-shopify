import React from 'react'
import { TrendingUp, Users, ShoppingBag, Sparkles, ArrowUpRight, Camera, Shirt } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      name: 'Total Try-Ons',
      value: '12,847',
      change: '+12%',
      changeType: 'positive',
      icon: Camera,
    },
    {
      name: 'Conversion Rate',
      value: '24.3%',
      change: '+5.2%',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      name: 'Active Products',
      value: '156',
      change: '+8',
      changeType: 'positive',
      icon: Shirt,
    },
    {
      name: 'Revenue Impact',
      value: '$45,231',
      change: '+18%',
      changeType: 'positive',
      icon: ShoppingBag,
    },
  ]

  const recentActivity = [
    { id: 1, customer: 'Sarah Johnson', product: 'Summer Dress', action: 'tried on', time: '2 minutes ago' },
    { id: 2, customer: 'Mike Chen', product: 'Casual Jeans', action: 'purchased after try-on', time: '5 minutes ago' },
    { id: 3, customer: 'Emma Wilson', product: 'Blazer Set', action: 'tried on', time: '8 minutes ago' },
    { id: 4, customer: 'David Brown', product: 'T-Shirt Pack', action: 'shared try-on', time: '12 minutes ago' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to AI Fashion Try-On! 🎉</h1>
            <p className="text-purple-100 text-lg">
              Transform your fashion store with cutting-edge AI virtual try-on technology
            </p>
          </div>
          <div className="hidden md:block">
            <Sparkles className="w-24 h-24 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600 ml-1">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Shirt className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900">Configure New Product</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-purple-600" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Camera className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Test Try-On Studio</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-blue-600" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">View Analytics</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-green-600" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.customer} {activity.action} {activity.product}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard