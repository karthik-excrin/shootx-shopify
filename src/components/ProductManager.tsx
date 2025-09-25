import React, { useState } from 'react'
import { Search, Filter, Plus, Settings, Image, CheckCircle, AlertCircle } from 'lucide-react'

const ProductManager = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const products = [
    {
      id: '1',
      title: 'Summer Floral Dress',
      handle: 'summer-floral-dress',
      price: '$89.99',
      inventory: 45,
      aiStatus: 'ready',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Dresses',
      tryOns: 234
    },
    {
      id: '2',
      title: 'Classic Denim Jacket',
      handle: 'classic-denim-jacket',
      price: '$129.99',
      inventory: 28,
      aiStatus: 'processing',
      image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Jackets',
      tryOns: 156
    },
    {
      id: '3',
      title: 'Casual Cotton T-Shirt',
      handle: 'casual-cotton-tshirt',
      price: '$24.99',
      inventory: 120,
      aiStatus: 'ready',
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'T-Shirts',
      tryOns: 89
    },
    {
      id: '4',
      title: 'High-Waist Skinny Jeans',
      handle: 'high-waist-skinny-jeans',
      price: '$79.99',
      inventory: 67,
      aiStatus: 'needs-setup',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Jeans',
      tryOns: 0
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            AI Ready
          </span>
        )
      case 'processing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <div className="w-3 h-3 mr-1 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            Processing
          </span>
        )
      case 'needs-setup':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Setup Required
          </span>
        )
      default:
        return null
    }
  }

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Configure your products for AI virtual try-on</p>
        </div>
        <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-w-16 aspect-h-12 bg-gray-200">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                {getStatusBadge(product.aiStatus)}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium text-gray-900">{product.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Inventory:</span>
                  <span className="font-medium text-gray-900">{product.inventory}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Try-ons:</span>
                  <span className="font-medium text-gray-900">{product.tryOns}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  <Settings className="w-4 h-4" />
                  <span>Configure AI</span>
                </button>
                <button className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Image className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  )
}

export default ProductManager