import { useState, useCallback, useRef } from "react";
import { Link } from "@remix-run/react";

export default function TryOnStudio() {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [modelImagePreview, setModelImagePreview] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [jobId, setJobId] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock products for demo
  const products = [
    { id: '1', title: 'Summer Dress - Blue', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '2', title: 'Evening Gown - Black', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '3', title: 'Casual Dress - Red', image: 'https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setModelImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setModelImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOnSubmit = async () => {
    if (!modelImage || !selectedProduct) return;
    
    setIsProcessing(true);
    setJobId(`job_${Date.now()}`);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ 
            color: '#f5576c', 
            textDecoration: 'none',
            fontSize: '1rem',
            marginBottom: '1rem',
            display: 'inline-block'
          }}>
            ← Back to Home
          </Link>
          <h1 style={{
            fontSize: '2.5rem',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            🎯 AI Try-On Studio
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Upload your photo and select a dress to see how it looks with ComfyUI AI
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
          {/* Left Column - Product Selection */}
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>1. Select a Dress</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product.id)}
                  style={{
                    border: selectedProduct === product.id ? '3px solid #f5576c' : '2px solid #eee',
                    borderRadius: '10px',
                    padding: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'all 0.2s',
                    background: selectedProduct === product.id ? '#fff5f5' : 'white'
                  }}
                >
                  <img 
                    src={product.image} 
                    alt={product.title}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  <div>
                    <h4 style={{ margin: 0, color: '#333' }}>{product.title}</h4>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                      Click to select for try-on
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Model Image Upload */}
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>2. Upload Your Photo</h3>
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed #ddd',
                borderRadius: '10px',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: modelImagePreview ? 'transparent' : '#fafafa'
              }}
            >
              {modelImagePreview ? (
                <div>
                  <img 
                    src={modelImagePreview} 
                    alt="Model preview"
                    style={{
                      maxWidth: '200px',
                      maxHeight: '200px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      marginBottom: '1rem'
                    }}
                  />
                  <p style={{ color: '#666', margin: 0 }}>Click to change image</p>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
                  <p style={{ color: '#666', margin: 0 }}>Click to upload your photo</p>
                  <p style={{ color: '#999', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Best results with front-facing photos
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Try-On Button */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={handleTryOnSubmit}
            disabled={!modelImage || !selectedProduct || isProcessing}
            style={{
              background: (!modelImage || !selectedProduct || isProcessing) 
                ? '#ccc' 
                : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem 3rem',
              borderRadius: '50px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: (!modelImage || !selectedProduct || isProcessing) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 10px 20px rgba(245, 87, 108, 0.3)'
            }}
          >
            {isProcessing ? '🔄 Processing with ComfyUI...' : '🚀 Generate Try-On'}
          </button>
        </div>

        {/* Status Messages */}
        {jobId && (
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#e8f5e8',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, color: '#2d5a2d' }}>
              ✅ Try-on job submitted! Job ID: {jobId}
            </p>
            <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
              ComfyUI workflow is processing your request on RunPod...
            </p>
          </div>
        )}

        {/* Technical Info */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8f9ff',
          borderRadius: '10px',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <strong>🔧 How it works:</strong> Your model image + selected dress → ComfyUI Workflow → RunPod Processing → AI Try-On Result
        </div>
      </div>
    </div>
  );
}