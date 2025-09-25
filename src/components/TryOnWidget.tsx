import React, { useState, useRef, useEffect } from 'react';
import { 
  Card, 
  Button, 
  ProgressBar, 
  Badge, 
  Select, 
  ButtonGroup,
  Text,
  Box,
  InlineStack,
  BlockStack,
  Divider
} from '@shopify/polaris';
import { MaximizeIcon, MinimizeIcon, SearchIcon, ArrowDownIcon, XIcon } from '@shopify/polaris-icons';
import { Product, ProductVariant, TryOnResult } from '../types';
import { POSE_OPTIONS } from '../utils/constants';
import { MockAPIService, handleAPIError } from '../services/api';
import { handleFileUpload, downloadImage, getImageQualityStatus, getImageQualityMessage, generateId } from '../utils/helpers';

interface TryOnWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
  selectedVariant: ProductVariant | null;
  onProductChange: (product: Product, variant: ProductVariant) => void;
  addToCart: (product: Product, variant: ProductVariant) => void;
}

export const TryOnWidget: React.FC<TryOnWidgetProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  selectedVariant,
  onProductChange,
  addToCart
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State management
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<TryOnResult | null>(null);
  const [selectedPose, setSelectedPose] = useState('front');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showUploadTip, setShowUploadTip] = useState(false);
  const [imageScore, setImageScore] = useState<number | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const photoData = await handleFileUpload(file);
      setUserPhoto(photoData);
      
      // TODO: Replace with actual image quality API call
      const score = MockAPIService.generateImageQualityScore();
      setImageScore(score);
    } catch (error) {
      console.error('Error uploading file:', error);
      // TODO: Show error toast notification
    }
  };

  const processAITryOn = async () => {
    if (!selectedProduct || !selectedVariant || !userPhoto) return;

    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Simulate processing stages for better UX
      const stages = [
        { progress: 20, message: 'Analyzing your photo...' },
        { progress: 40, message: 'Detecting body measurements...' },
        { progress: 60, message: 'Fitting the garment...' },
        { progress: 80, message: 'Applying realistic lighting...' },
        { progress: 100, message: 'Generating final result...' }
      ];
      
      for (const stage of stages) {
        setProgress(stage.progress);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // TODO: Replace with actual API call
      // const apiResponse = await apiClient.generateTryOn({
      //   userPhoto,
      //   productId: selectedProduct.id,
      //   variantId: selectedVariant.id,
      //   pose: selectedPose
      // });
      
      // Mock API call for development
      const apiResponse = await MockAPIService.generateTryOn({
        userPhoto,
        productId: selectedProduct.id,
        variantId: selectedVariant.id,
        pose: selectedPose
      });
      
      const tryOnResult: TryOnResult = {
        id: parseInt(generateId()),
        product: selectedProduct,
        variant: selectedVariant,
        pose: selectedPose,
        userPhoto,
        processedAt: new Date().toISOString(),
        results: apiResponse.resultImages,
        fitScore: apiResponse.fitScore,
        recommendations: apiResponse.recommendations
      };
      
      setResults(tryOnResult);
      
      // TODO: Save to user history via API
      // await apiClient.saveTryOnResult(tryOnResult);
      
    } catch (error) {
      console.error('Try-on processing failed:', error);
      const errorMessage = handleAPIError(error);
      // TODO: Show error toast notification with errorMessage
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const resetTryOn = () => {
    setResults(null);
    setProgress(0);
    setIsMaximized(false);
    setIsZoomed(false);
    setShowAccordion(false);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setIsMinimized(false);
    }
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleDownload = () => {
    if (!results) return;
    
    const filename = `ai-tryon-${results.product.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.jpg`;
    downloadImage(results.results[selectedPose], filename);
  };

  const handleShare = async () => {
    if (!results) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my AI try-on!',
          text: `I tried on ${results.product.title} using AI Fashion Studio`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  // Auto-minimize when user interacts with other parts of the page
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const widget = document.getElementById('tryon-widget');
      if (widget && !widget.contains(event.target as Node) && isOpen && !isMinimized && !isMaximized) {
        setIsMinimized(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMinimized, isMaximized]);

  if (!isOpen) return null;

  // Zoom overlay
  if (isZoomed && results) {
    return (
      <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center p-4">
        <div className="relative max-w-4xl max-h-full">
          <img
            src={results.results[selectedPose]}
            alt="Zoomed try-on result"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <button
            onClick={toggleZoom}
            className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
          >
            <XIcon />
          </button>
        </div>
      </div>
    );
  }

  const getWidgetSize = () => {
    if (isMaximized) return 'inset-4 w-auto h-auto';
    if (isMinimized) return 'bottom-4 right-4 w-16 h-16';
    return 'bottom-4 right-4 w-72 h-[480px]';
  };

  return (
    <>
      <div
        id="tryon-widget"
        className={`fixed z-50 transition-all duration-500 ease-in-out ${getWidgetSize()}`}
      >
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden h-full flex flex-col">
            {/* Header */}
            <div className={`bg-black text-white transition-all duration-500 ease-in-out ${
              isMinimized ? 'p-3 rounded-xl cursor-pointer hover:from-gray-800 hover:to-gray-700' : 'p-4 rounded-t-xl'
            }`}>
              <div className={`flex items-center justify-between ${isMinimized ? 'flex-col space-y-1' : ''}`}>
                <div className={`flex items-center transition-all duration-500 ${
                  isMinimized ? 'space-x-2' : 'space-x-3'
                }`}>
                  <svg 
                    width={isMinimized ? "60" : "80"} 
                    height={isMinimized ? "15" : "20"} 
                    viewBox="0 0 238 58" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-all duration-300"
                  >
                    <g clipPath="url(#clip0_3703_10142)">
                      <mask id="mask0_3703_10142" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="238" height="58">
                        <path d="M237.885 0H0.00390625V58H237.885V0Z" fill="white"/>
                      </mask>
                      <g mask="url(#mask0_3703_10142)">
                        <path d="M18.3377 57.8386C15.4174 57.8386 12.8216 57.5141 10.5503 56.8651C8.27894 56.2703 6.38617 55.405 4.87194 54.2693C3.35774 53.0795 2.19502 51.6735 1.38384 50.0512C0.572651 48.4288 0.140017 46.6442 0.0859375 44.6973L6.33208 43.0749C6.22393 44.8595 6.65656 46.4278 7.62999 47.7798C8.6575 49.0777 10.0906 50.0781 11.9293 50.7812C13.8221 51.4843 16.0934 51.8358 18.7433 51.8358C21.934 51.8358 24.3945 51.2949 26.125 50.2134C27.9096 49.1319 28.8019 47.6446 28.8019 45.7519C28.8019 44.2376 28.3152 43.0749 27.3418 42.2637C26.3684 41.3984 25.0165 40.7225 23.2858 40.2358C21.6095 39.6949 19.6085 39.2082 17.2831 38.7756C15.3363 38.3431 13.3894 37.8564 11.4426 37.3155C9.49572 36.7746 7.7111 36.0717 6.08873 35.2064C4.52044 34.2871 3.24957 33.0973 2.27614 31.6372C1.30272 30.177 0.816008 28.3654 0.816008 26.2022C0.816008 23.6605 1.492 21.4703 2.84397 19.6316C4.19596 17.7929 6.11578 16.3598 8.60341 15.3323C11.0911 14.3048 14.0654 13.791 17.5265 13.791C20.9875 13.791 23.9348 14.3318 26.3684 15.4134C28.8019 16.4409 30.7218 17.901 32.1278 19.7938C33.534 21.6865 34.318 23.9039 34.4803 26.4456L28.0719 28.0679C28.0179 26.2833 27.5312 24.769 26.6117 23.5253C25.7466 22.2815 24.5026 21.362 22.8803 20.7672C21.2579 20.1183 19.3652 19.7938 17.202 19.7938C14.3358 19.7938 12.0645 20.3347 10.388 21.4162C8.71158 22.4977 7.87334 23.985 7.87334 25.8777C7.87334 27.2837 8.36006 28.4194 9.33348 29.2847C10.361 30.1501 11.74 30.826 13.4705 31.3127C15.2011 31.7994 17.1209 32.2861 19.23 32.7728C21.3931 33.2054 23.4481 33.6921 25.3949 34.233C27.3959 34.7738 29.1806 35.4767 30.7488 36.3421C32.3172 37.2074 33.561 38.37 34.4803 39.8302C35.3997 41.2362 35.8593 43.048 35.8593 45.2651C35.8593 48.0232 35.1292 50.3487 33.6691 52.2414C32.2089 54.0801 30.154 55.4861 27.504 56.4595C24.9082 57.3788 21.8529 57.8386 18.3377 57.8386Z" fill="white"/>
                        <path d="M39.3711 56.7832V0H46.9963V13.0601C46.9963 14.2499 46.9423 15.4667 46.834 16.7105C46.7801 17.9002 46.6718 19.117 46.5096 20.3608C46.4015 21.6046 46.2662 22.8755 46.104 24.1734C45.9417 25.4172 45.7525 26.881 45.5361 27.986H46.9151C47.7263 24.7954 48.7539 22.1724 49.9977 20.1175C51.2416 18.0084 52.7829 16.4401 54.6214 15.4126C56.5144 14.331 58.7585 13.7902 61.3543 13.7902C66.1133 13.7902 69.6556 15.4667 71.9809 18.8196C74.3605 22.1185 75.5501 27.0667 75.5501 33.6643V56.7832H68.0872V34.3944C68.0872 29.5273 67.3301 25.985 65.8158 23.7678C64.3557 21.4965 62.1385 20.3608 59.1641 20.3608C56.6766 20.3608 54.5675 21.0909 52.8368 22.551C51.1064 24.0112 49.7273 25.985 48.6998 28.4727C47.7263 30.9604 47.0774 33.7996 46.7529 36.9902V56.7832H39.3711Z" fill="white"/>
                        <path d="M99.2094 57.8386C95.2074 57.8386 91.6654 56.9732 88.5828 55.2428C85.5543 53.4581 83.1748 50.9165 81.4444 47.6176C79.7678 44.3187 78.9297 40.3169 78.9297 35.612C78.9297 30.7449 79.822 26.7159 81.6066 23.5253C83.4452 20.2805 85.8787 17.847 88.9073 16.2246C91.9357 14.6022 95.3157 13.791 99.0472 13.791C102.941 13.791 106.402 14.6563 109.43 16.3868C112.513 18.0633 114.946 20.5509 116.731 23.8498C118.516 27.0945 119.408 31.1235 119.408 35.9365C119.408 40.7495 118.516 44.7784 116.731 48.0232C115 51.2679 112.594 53.7285 109.512 55.405C106.483 57.0274 103.049 57.8386 99.2094 57.8386ZM99.5339 51.7547C102.13 51.7547 104.347 51.1327 106.186 49.8889C108.078 48.591 109.512 46.7794 110.485 44.454C111.512 42.1285 112.026 39.3704 112.026 36.1798C112.026 32.8809 111.485 30.0418 110.404 27.6623C109.376 25.2288 107.889 23.363 105.942 22.0651C103.995 20.7131 101.643 20.0372 98.8849 20.0372C96.3431 20.0372 94.1259 20.632 92.2332 21.8218C90.3944 23.0116 88.9613 24.769 87.9339 27.0945C86.9063 29.3658 86.3926 32.1509 86.3926 35.4498C86.3926 40.5333 87.5553 44.5351 89.8807 47.4554C92.2602 50.3215 95.4779 51.7547 99.5339 51.7547Z" fill="white"/>
                        <path d="M141.44 57.8386C137.438 57.8386 133.896 56.9732 130.813 55.2428C127.785 53.4581 125.405 50.9165 123.675 47.6176C121.998 44.3187 121.16 40.3169 121.16 35.612C121.16 30.7449 122.052 26.7159 123.837 23.5253C125.676 20.2805 128.109 17.847 131.138 16.2246C134.166 14.6022 137.546 13.791 141.278 13.791C145.171 13.791 148.632 14.6563 151.661 16.3868C154.743 18.0633 157.177 20.5509 158.962 23.8498C160.746 27.0945 161.638 31.1235 161.638 35.9365C161.638 40.7495 160.746 44.7784 158.962 48.0232C157.231 51.2679 154.824 53.7285 151.742 55.405C148.714 57.0274 145.279 57.8386 141.44 57.8386ZM141.764 51.7547C144.36 51.7547 146.577 51.1327 148.416 49.8889C150.309 48.591 151.742 46.7794 152.715 44.454C153.743 42.1285 154.257 39.3704 154.257 36.1798C154.257 32.8809 153.716 30.0418 152.634 27.6623C151.607 25.2288 150.12 23.363 148.173 22.0651C146.226 20.7131 143.873 20.0372 141.115 20.0372C138.574 20.0372 136.356 20.632 134.464 21.8218C132.625 23.0116 131.192 24.769 130.164 27.0945C129.137 29.3658 128.623 32.1509 128.623 35.4498C128.623 40.5333 129.786 44.5351 132.111 47.4554C134.491 50.3215 137.708 51.7547 141.764 51.7547Z" fill="white"/>
                        <path d="M178.717 57.5941C174.824 57.5941 171.93 56.5395 170.038 54.4304C168.145 52.3213 167.198 49.1036 167.198 44.7773V21.0095H160.871L160.952 14.8444H164.927C166.279 14.8444 167.253 14.6011 167.847 14.1144C168.496 13.6276 168.875 12.8165 168.983 11.6808L169.794 5.35352H174.337V14.8444H186.424V21.0906H174.337V44.6151C174.337 46.7783 174.824 48.3465 175.797 49.3199C176.825 50.2392 178.285 50.699 180.177 50.699C181.205 50.699 182.26 50.5637 183.341 50.2934C184.477 50.023 185.585 49.4822 186.667 48.671V56.0528C185.099 56.6476 183.639 57.0532 182.286 57.2696C180.989 57.486 179.799 57.5941 178.717 57.5941Z" fill="white"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M237.709 11.0512L230.767 18.2955C225.827 23.4374 223.647 25.8692 223.268 26.7558C222.963 27.4145 222.507 28.9851 222.254 30.2518C222 31.5185 221.949 33.3933 222.128 34.4828C222.331 35.5468 222.761 37.1431 223.115 38.0552C223.697 39.4487 224.685 40.589 237.707 54.1208L236.77 55.2099C236.212 55.8685 235.579 56.2991 235.2 56.2737C234.768 56.2482 232.438 54.1703 227.396 49.2288C220.58 42.5642 220.151 42.1842 218.479 41.5758C217.465 41.2209 215.565 40.891 214.196 40.8401C212.803 40.8145 210.929 41.0167 209.966 41.3205C209.029 41.6496 207.508 42.3588 206.622 42.9412C205.709 43.549 202.416 46.5885 192.358 56.6444L189.824 53.857L204.265 38.9125L205 36.4045C205.405 35.0364 205.685 33.035 205.608 31.9963C205.557 30.9322 205.154 29.1587 204.748 28.0438C204.038 26.0168 203.886 25.8649 189.826 11.2941L192.359 8.50781L199.605 15.6032C206.091 21.9383 207.003 22.7493 208.548 23.4338C209.485 23.8138 211.588 24.1945 213.184 24.2707C214.983 24.3472 216.883 24.1196 218.149 23.6637C220.228 22.9548 220.228 22.9548 227.396 15.9386L235.304 9C235.304 9 236.5 10 237.709 11.0512Z" fill="#AB0908"/>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_3703_10142">
                        <rect width="237.881" height="58" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                
                {/* Show restore button when minimized */}
                {isMinimized ? (
                  <div
                    onClick={() => setIsMinimized(false)}
                    className="text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Tap to open
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    {results && !isMinimized && (
                      <>
                        <button
                          onClick={handleDownload}
                          className="p-1.5 text-white hover:bg-gray-700 rounded-lg transition-colors"
                          title="Download result"
                        >
                          <ArrowDownIcon />
                        </button>
                        <button
                          onClick={toggleZoom}
                          className="p-1.5 text-white hover:bg-gray-700 rounded-lg transition-colors"
                          title="Zoom image"
                        >
                          <SearchIcon />
                        </button>
                      </>
                    )}
                    {!isMinimized && (
                      <button
                        onClick={toggleMaximize}
                        className="p-1.5 text-white hover:bg-gray-700 rounded-lg transition-colors"
                        title={isMaximized ? "Restore size" : "Maximize"}
                      >
                        {isMaximized ? <MinimizeIcon /> : <MaximizeIcon />}
                      </button>
                    )}
                    <button
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="p-1.5 text-white hover:bg-gray-700 rounded-lg transition-colors"
                      title={isMinimized ? "Expand" : "Minimize"}
                    >
                      {isMinimized ? <MaximizeIcon /> : <MinimizeIcon />}
                    </button>
                    <button
                      onClick={onClose}
                      className="p-1.5 text-white hover:bg-gray-700 rounded-lg transition-colors"
                      title="Close widget"
                    >
                      <XIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-500 ${
              isMinimized ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
            }`}>
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Results View - Image takes center stage */}
                {results ? (
                  <div className="flex-1 flex flex-col">
                    {/* Main Image - Smaller Size */}
                    <div className="relative bg-gray-50 h-48 border-b border-gray-100">
                      <img
                        src={results.results[selectedPose]}
                        alt="Try-on result"
                        className="w-full h-48 object-cover cursor-pointer"
                        onClick={toggleZoom}
                      />
                      
                      {/* Overlay Controls */}
                      <div className="absolute top-3 left-3">
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {results.fitScore}% Perfect Fit
                        </div>
                      </div>

                      {/* Bottom Action Bar */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black to-transparent">
                        <div className="space-y-3">
                          <div className="flex gap-2 items-center">
                            <button
                              onClick={() => addToCart(selectedProduct, selectedVariant)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                            >
                              Add to Cart
                            </button>
                            <button
                              onClick={() => setShowAccordion(!showAccordion)}
                              className="w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white rounded-lg flex items-center justify-center transition-colors"
                            >
                              <span className="text-sm font-bold">{showAccordion ? '−' : '+'}</span>
                            </button>
                          </div>
                          
                          {/* Powered by ShootX watermark */}
                          <div className="text-center">
                            <span className="text-xs text-gray-400">
                              Powered by ShootX AI
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Accordion Panel */}
                    {showAccordion && (
                      <div className="bg-white border-t border-gray-100 p-4 max-h-40 overflow-y-auto">
                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <img
                              src={selectedProduct.images[0]}
                              alt={selectedProduct.title}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-gray-900 truncate">
                                {selectedProduct.title}
                              </h4>
                              <p className="text-xs text-gray-500 truncate">
                                Size {selectedVariant?.size} • ${selectedVariant?.price}
                              </p>
                            </div>
                          </div>
                        
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-700">
                                AI Fit Score
                              </span>
                              <span className="text-sm font-semibold text-green-600">
                                {results.fitScore}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${results.fitScore}%` }}
                              />
                            </div>
                          </div>
                        
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-gray-700">
                              AI Style Recommendations
                            </h5>
                            {results.recommendations.slice(0, 2).map((rec: string, index: number) => (
                              <div key={index} className="flex gap-2 items-start">
                                <span className="text-green-500 flex-shrink-0 mt-0.5">
                                  ✓
                                </span>
                                <span className="text-xs text-gray-600 leading-tight">
                                  {rec}
                                </span>
                              </div>
                            ))}
                          </div>
                        
                          <div className="flex gap-2">
                            <button
                              onClick={handleDownload}
                              className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex-1 transition-colors"
                            >
                              Download
                            </button>
                            <button
                              onClick={handleShare}
                              className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex-1 transition-colors"
                            >
                              Share
                            </button>
                            <button
                              onClick={resetTryOn}
                              className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex-1 transition-colors"
                            >
                              Try Another
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Setup View */
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-5">
                    {/* Selected Product */}
                    {selectedProduct && (
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex gap-3">
                          <img
                            src={selectedProduct.images[0]}
                            alt={selectedProduct.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {selectedProduct.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              Size {selectedVariant?.size} • ${selectedVariant?.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Photo Upload */}
                    {!userPhoto ? (
                      <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 bg-blue-50">
                        <div className="space-y-3 text-center">
                          <div className="flex justify-between items-center">
                            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                              <span className="text-2xl">
                                📸
                              </span>
                            </div>
                            <button
                              onClick={() => setShowUploadTip(!showUploadTip)}
                              className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-700 transition-colors"
                            >
                              ?
                            </button>
                          </div>
                        
                        {showUploadTip && (
                          <div className="p-4 bg-white rounded-xl border border-gray-200 text-left">
                            <div className="space-y-3 text-xs">
                              <h5 className="text-sm font-semibold text-green-600 text-center">
                                ✅ Best Practices:
                              </h5>
                              <div className="space-y-1 text-green-600">
                                <p>• Full body, front-facing pose</p>
                                <p>• Good lighting (natural preferred)</p>
                                <p>• Plain background</p>
                                <p>• Minimal loose clothing</p>
                                <p>• High resolution image</p>
                              </div>
                              <h5 className="text-sm font-semibold text-red-600 text-center">
                                ❌ Avoid:
                              </h5>
                              <div className="space-y-1 text-red-600">
                                <p>• Blurry or dark images</p>
                                <p>• Side poses or sitting</p>
                                <p>• Busy backgrounds</p>
                                <p>• Oversized clothing</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="space-y-2 text-center">
                          <h4 className="font-semibold text-gray-900">
                            Upload Your Photo
                          </h4>
                          <p className="text-xs text-gray-600">
                            Best with front-facing, full body pose in good lighting
                          </p>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                          >
                            Choose Photo
                          </button>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative">
                          <img
                            src={userPhoto}
                            alt="User photo"
                            className="w-full h-32 object-cover rounded-xl"
                          />
                          <button
                            onClick={() => setUserPhoto(null)}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Photo uploaded successfully!
                          </div>
                          {imageScore && (
                            <div className="flex gap-2 items-center">
                              <span className="text-xs text-gray-500">
                                Quality Score:
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  imageScore >= 85 ? 'bg-green-100 text-green-800' :
                                  imageScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}
                              >
                                {imageScore}%
                              </span>
                            </div>
                          )}
                        </div>
                        {imageScore && imageScore < 85 && (
                          <div className="p-3 bg-yellow-50 rounded-xl">
                            <p className="text-xs text-yellow-700">
                              {getImageQualityMessage(imageScore)}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pose Selection */}
                    {userPhoto && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium text-gray-900">
                            Photo Pose Selection
                          </label>
                        </div>
                        <select
                          value={selectedPose}
                          onChange={(e) => setSelectedPose(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {POSE_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500">
                          Match your photo's angle for better results.
                        </p>
                      </div>
                    )}

                    {/* Processing */}
                    {isProcessing && (
                      <div className="space-y-3 p-4 bg-blue-50 rounded-xl">
                        <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} /></div>
                        <p className="text-xs text-gray-600 text-center">
                          Generating your AI try-on...
                        </p>
                      </div>
                    )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Try-On Button - Fixed at bottom */}
              {!results && selectedProduct && userPhoto && !isMinimized && (
                <div className="border-t border-gray-100 bg-white p-4 flex-shrink-0">
                  <button
                    onClick={processAITryOn}
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      isProcessing 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isProcessing ? 'Processing...' : '✨ Generate AI Try-On'}
                  </button>
                </div>
              )}
            </div>
        </div>
      </div>
    </>
  );
};