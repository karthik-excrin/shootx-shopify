import { Sparkles, Camera, Shirt, BarChart3 } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-yellow-400 mr-3" />
            <h1 className="text-5xl font-bold text-white">ShootX</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            AI-Powered Fashion Try-On Experience for Shopify Stores
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Camera className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">AI Try-On Studio</h3>
            <p className="text-blue-200">
              Advanced AI technology for realistic clothing visualization on customer photos
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Shirt className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Product Management</h3>
            <p className="text-blue-200">
              Seamlessly manage AI-ready products and optimize for virtual try-on
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <BarChart3 className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Analytics Dashboard</h3>
            <p className="text-blue-200">
              Track try-on performance, conversion metrics, and customer insights
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Transform Your Fashion Store
            </h2>
            <p className="text-blue-200 mb-6">
              Increase conversions with AI-powered virtual try-on technology that lets customers see how clothes look before they buy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                Get Started
              </button>
              <button className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
            <div className="space-y-3">
              <div className="flex items-center text-blue-200">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Real-time AI processing
              </div>
              <div className="flex items-center text-blue-200">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                Multiple pose angles
              </div>
              <div className="flex items-center text-blue-200">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                Fit score analysis
              </div>
              <div className="flex items-center text-blue-200">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                Mobile-optimized experience
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6">Benefits</h3>
            <div className="space-y-3">
              <div className="flex items-center text-blue-200">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Reduce return rates
              </div>
              <div className="flex items-center text-blue-200">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                Increase customer confidence
              </div>
              <div className="flex items-center text-blue-200">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                Boost conversion rates
              </div>
              <div className="flex items-center text-blue-200">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                Enhanced shopping experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}