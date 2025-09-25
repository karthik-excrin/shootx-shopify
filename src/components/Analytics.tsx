import React from 'react'
import { TrendingUp, Users, ShoppingBag, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const Analytics = () => {
  const metrics = [
    {
      name: 'Total Try-Ons',
      value: '12,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Eye,
      description: 'Virtual try-ons this month'
    },
    {
      name: 'Conversion Rate',
      value: '24.3%',
      change: '+5.2%',
      changeType: 'positive',
      icon: TrendingUp,
      description: 'Try-on to purchase rate'
    },
    {
      name: 'Unique Users',
      value: '8,234',
      change: '+8.1%',
      changeType: 'positive',
      icon: Users,
      description: 'Users who tried products'
    },
    {
      name: 'Revenue Impact',
      value: '$45,231',
      change: '+18.7%',
      changeType: 'positive',
      icon: ShoppingBag,
      description: 'Revenue from try-on users'
    }
  ]

  const topProducts = [
    { name: 'Summer Floral Dress', tryOns: 1234, conversions: 298, rate: '24.1%' },
    { name: 'Classic Denim Jacket', tryOns: 987, conversions: 234, rate: '23.7%' },
    { name: 'Casual Cotton T-Shirt', tryOns: 856, conversions: 189, rate: '22.1%' },
    { name: 'High-Waist Skinny Jeans', tryOns: 743, conversions: 156, rate: '21.0%' },
    { name: 'Elegant Evening Gown', tryOns: 654, conversions: 142, rate: '21.7%' }
  ]

  const timeData = [
    { time: '00:00', tryOns: 45 },
    { time: '04:00', tryOns: 23 },
    { time: '08:00', tryOns: 89 },
    { time: '12:00', tryOns: 156 },
    { time: '16:00', tryOns: 234 },
    { time: '20:00', tryOns: 198 },
    { time: '24:00', tryOns: 87 }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Track your AI try-on performance and customer insights</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          const isPositive = metric.changeType === 'positive'
          return (
            <div key={metric.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.name}</p>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Try-On Activity Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Try-On Activity (24h)</h3>
          <div className="space-y-4">
            {timeData.map((data, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 w-12">{data.time}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(data.tryOns / 250) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{data.tryOns}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.tryOns} try-ons</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{product.rate}</p>
                  <p className="text-xs text-gray-500">{product.conversions} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Peak Hours</h4>
            <p className="text-purple-100 text-sm">Most try-ons happen between 4-8 PM, optimize your campaigns for these hours</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Best Categories</h4>
            <p className="text-purple-100 text-sm">Dresses and jackets have the highest conversion rates at 24%+</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-semibold mb-2">User Behavior</h4>
            <p className="text-purple-100 text-sm">Users who try on 2+ items are 3x more likely to make a purchase</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics