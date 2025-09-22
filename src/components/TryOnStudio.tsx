import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button, ProgressBar, Badge, Select, ButtonGroup } from '@shopify/polaris';
import { TryOnResults } from './TryOnResults';

interface TryOnStudioProps {
  addToCart: (product: any, variant: any) => void;
  addToTryOnHistory: (tryOnData: any) => void;
}

export const TryOnStudio: React.FC<TryOnStudioProps> = ({ addToCart, addToTryOnHistory }) => {
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedProduct, setSelectedProduct] = useState(location.state?.selectedProduct || null);
  const [selectedVariant, setSelectedVariant] = useState(location.state?.selectedVariant || null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [selectedPose, setSelectedPose] = useState('front');

  const poseOptions = [
    { label: 'Front View', value: 'front' },
    { label: 'Side View', value: 'side' },
    { label: '3/4 View', value: 'three-quarter' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIProcessing = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate AI processing stages
    const stages = [
      { progress: 20, message: 'Analyzing your photo...' },
      { progress: 40, message: 'Detecting body measurements...' },
      { progress: 60, message: 'Fitting the garment...' },
      { progress: 80, message: 'Applying realistic lighting...' },
      { progress: 100, message: 'Generating final result...' }
    ];
    
    for (const stage of stages) {
      setProgress(stage.progress);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Generate mock results
    const tryOnResult = {
      id: Date.now(),
      product: selectedProduct,
      variant: selectedVariant,
      pose: selectedPose,
      userPhoto,
      processedAt: new Date().toISOString(),
      results: {
        front: `https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400`,
        side: `https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=400`,
        'three-quarter': `https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400`
      },
      fitScore: Math.floor(Math.random() * 20) + 80, // 80-100%
      recommendations: [
        'Great fit! This size looks perfect on you.',
        'The color complements your skin tone beautifully.',
        'Consider pairing with neutral accessories.'
      ]
    };
    
    setResults(tryOnResult);
    addToTryOnHistory(tryOnResult);
    setIsProcessing(false);
    setProgress(0);
  };

  const handleTryOn = () => {
    if (selectedProduct && selectedVariant && userPhoto) {
      simulateAIProcessing();
    }
  };

  const resetTryOn = () => {
    setResults(null);
    setUserPhoto(null);
    setProgress(0);
  };

  if (results) {
    return (
      <TryOnResults
        results={results}
        addToCart={addToCart}
        onNewTryOn={resetTryOn}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Try-On Studio
        </h1>
        <p className="text-gray-600">
          Upload your photo and see how clothes look on you with advanced AI technology
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Step 1: Upload Your Photo</h2>
            
            {!userPhoto ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📷</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Upload a clear photo of yourself
                </h3>
                <p className="text-gray-500 mb-4">
                  Best results with full body, front-facing photos in good lighting
                </p>
                <Button
                  variant="primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={userPhoto}
                    alt="User uploaded photo"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    variant="secondary"
                    size="slim"
                    onClick={() => setUserPhoto(null)}
                    className="absolute top-2 right-2"
                  >
                    Change Photo
                  </Button>
                </div>
                <Badge status="success">Photo uploaded successfully!</Badge>
              </div>
            )}
          </div>
        </Card>

        {/* Product Selection */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Step 2: Select Product</h2>
            
            {!selectedProduct ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👗</span>
                </div>
                <p className="text-gray-500 mb-4">
                  Go to the product catalog to select an item for try-on
                </p>
                <Button variant="secondary" url="/">
                  Browse Products
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {selectedProduct.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Size: {selectedVariant?.size} | ${selectedVariant?.price}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Photo Pose Selection
                    </label>
                  </div>
                  <Select
                    label=""
                    options={poseOptions}
                    value={selectedPose}
                    onChange={setSelectedPose}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Match your photo's angle for better results.
                  </p>
                </div>
                
                <Button
                  variant="secondary"
                  size="slim"
                  url="/"
                >
                  Change Product
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Try-On Section */}
      {selectedProduct && userPhoto && (
        <Card sectioned>
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Ready to Try On!</h2>
            <p className="text-gray-600">
              Our AI will analyze your photo and show you how the {selectedProduct.title} looks on you
            </p>
            
            {isProcessing && (
              <div className="max-w-md mx-auto space-y-3">
                <ProgressBar progress={progress} />
                <p className="text-sm text-gray-500">
                  Processing your try-on... This may take a few seconds
                </p>
              </div>
            )}
            
            <ButtonGroup>
              <Button
                variant="primary"
                size="large"
                onClick={handleTryOn}
                loading={isProcessing}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Generate AI Try-On'}
              </Button>
            </ButtonGroup>
          </div>
        </Card>
      )}
    </div>
  );
};