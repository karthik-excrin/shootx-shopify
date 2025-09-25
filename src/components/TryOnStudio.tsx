import React, { useState } from 'react'
import { Camera, Upload, Sparkles, Download, Share2, RotateCcw, Zap } from 'lucide-react'

const TryOnStudio = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)

  const products = [
    {
      id: '1',
      title: 'Summer Floral Dress',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Dresses'
    },
    {
      id: '2',
      title: 'Classic Denim Jacket',
      image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Jackets'
    },
    {
      id: '3',
      title: 'Casual Cotton T-Shirt',
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'T-Shirts'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Try-On Studio</h1>
        <p className="text-gray-600 text-lg">Experience the future of fashion with AI-powered virtual try-on</p>
      </div>

      {/* Main Studio Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
            Select Product
          </h3>
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedProduct?.id === product.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{product.title}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Camera className="w-5 h-5 mr-2 text-blue-600" />
            Upload Photo
          </h3>
          
          {!uploadedImage ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Upload a photo to try on</p>
              <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 10MB</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Choose File
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="aspect-w-3 aspect-h-4 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full h-64 object-cover"
                />
              </div>
              <button
                onClick={() => setUploadedImage(null)}
                className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Upload Different Photo</span>
              </button>
            </div>
          )}
        </div>

        {/* AI Processing & Results */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-600" />
            AI Try-On Result
          </h3>
          
          {selectedProduct && uploadedImage ? (
            <div className="space-y-4">
              <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-purple-700 font-medium">AI Processing...</p>
                  <p className="text-sm text-purple-600">This may take a few seconds</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-2">Ready for AI magic!</p>
              <p className="text-sm text-gray-500">
                {!selectedProduct && !uploadedImage
                  ? 'Select a product and upload a photo to begin'
                  : !selectedProduct
                  ? 'Select a product to continue'
                  : 'Upload a photo to continue'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6 text-center">AI Try-On Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-semibold mb-2">Real-time Processing</h4>
            <p className="text-purple-100 text-sm">Get instant try-on results with our advanced AI technology</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Camera className="w-6 h-6" />
            </div>
            <h4 className="font-semibold mb-2">Multiple Angles</h4>
            <p className="text-purple-100 text-sm">View how clothes look from different perspectives</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-semibold mb-2">High Accuracy</h4>
            <p className="text-purple-100 text-sm">Realistic fit and appearance with 95% accuracy</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TryOnStudio