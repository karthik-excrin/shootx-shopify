import React, { useState } from 'react';
import { Card, Button, Badge, ButtonGroup, Select } from '@shopify/polaris';
import { HeartIcon } from '@shopify/polaris-icons';

interface TryOnResultsProps {
  results: any;
  addToCart: (product: any, variant: any) => void;
  onNewTryOn: () => void;
}

export const TryOnResults: React.FC<TryOnResultsProps> = ({ 
  results, 
  addToCart, 
  onNewTryOn 
}) => {
  const [selectedView, setSelectedView] = useState('front');
  const [isFavorited, setIsFavorited] = useState(false);

  const viewOptions = [
    { label: 'Front View', value: 'front' },
    { label: 'Side View', value: 'side' },
    { label: '3/4 View', value: 'three-quarter' }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my AI try-on!',
        text: `I tried on ${results.product.title} using AI Fashion Studio`,
        url: window.location.href
      });
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = results.results[selectedView];
    link.download = `ai-tryon-${results.product.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your AI Try-On Results
          </h1>
          <p className="text-gray-600">
            See how the {results.product.title} looks on you
          </p>
        </div>
        <Button variant="secondary" onClick={onNewTryOn}>
          Try Another Item
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Try-On Results */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">AI Generated Result</h2>
                <div className="flex items-center space-x-2">
                  <Select
                    label=""
                    options={viewOptions}
                    value={selectedView}
                    onChange={setSelectedView}
                  />
                  <Badge status="success">
                    {results.fitScore}% Fit Score
                  </Badge>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src={results.results[selectedView]}
                  alt={`AI try-on result - ${selectedView} view`}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
                />
                
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="secondary"
                    size="slim"
                    icon={isFavorited ? HeartIcon : HeartIcon}
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={isFavorited ? 'text-red-500' : ''}
                  >
                    {isFavorited ? 'Favorited' : 'Favorite'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="slim"
                    onClick={handleShare}
                  >
                    Share
                  </Button>
                  <Button
                    variant="secondary"
                    size="slim"
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-2">
                {Object.entries(results.results).map(([view, imageUrl]) => (
                  <button
                    key={view}
                    onClick={() => setSelectedView(view)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedView === view 
                        ? 'border-blue-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={imageUrl as string}
                      alt={`${view} view`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Product Details & Actions */}
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex space-x-4 mb-4">
                <img
                  src={results.product.images[0]}
                  alt={results.product.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {results.product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Size: {results.variant.size}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${results.variant.price}
                  </p>
                </div>
              </div>
              
              <ButtonGroup>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => addToCart(results.product, results.variant)}
                >
                  Add to Cart
                </Button>
                <Button variant="secondary" fullWidth>
                  Save for Later
                </Button>
              </ButtonGroup>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="font-semibold mb-3">AI Fit Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Overall Fit</span>
                  <Badge status="success">{results.fitScore}%</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${results.fitScore}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="font-semibold mb-3">AI Recommendations</h3>
              <ul className="space-y-2">
                {results.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="text-sm text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};