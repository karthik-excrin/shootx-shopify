import { Link } from "@remix-run/react";

export default function Products() {
  // Mock products for demo
  const products = [
    { 
      id: '1', 
      title: 'Summer Dress - Blue', 
      price: '$89.99',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
      aiReady: true
    },
    { 
      id: '2', 
      title: 'Evening Gown - Black', 
      price: '$159.99',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      aiReady: true
    },
    { 
      id: '3', 
      title: 'Casual Dress - Red', 
      price: '$69.99',
      image: 'https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=400',
      aiReady: false
    },
    { 
      id: '4', 
      title: 'Floral Maxi Dress', 
      price: '$119.99',
      image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400',
      aiReady: true
    },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            color: '#667eea', 
            textDecoration: 'none',
            fontSize: '1rem',
            marginBottom: '1rem',
            display: 'inline-block'
          }}>
            ← Back to Home
          </Link>
          <h1 style={{
            fontSize: '2.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            📦 Product Management
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Configure your products for AI virtual try-on functionality
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: '2px solid #eee',
                borderRadius: '15px',
                padding: '1.5rem',
                background: 'white',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img 
                src={product.image} 
                alt={product.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{product.title}</h3>
              <p style={{ margin: '0 0 1rem 0', color: '#667eea', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {product.price}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  background: product.aiReady ? '#e8f5e8' : '#fff3cd',
                  color: product.aiReady ? '#2d5a2d' : '#856404'
                }}>
                  {product.aiReady ? '✅ AI Ready' : '⚠️ Setup Required'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  style={{
                    flex: 1,
                    background: product.aiReady ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#ccc',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    cursor: product.aiReady ? 'pointer' : 'not-allowed'
                  }}
                  disabled={!product.aiReady}
                >
                  {product.aiReady ? '🎯 Try-On Ready' : '🔧 Configure AI'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Setup Instructions */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: '#f8f9ff',
          borderRadius: '15px'
        }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>🔧 AI Try-On Setup Instructions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '10px' }}>
              <h4 style={{ color: '#667eea', margin: '0 0 0.5rem 0' }}>1. ComfyUI Workflow</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                Configure your ComfyUI workflow ID and parameters for optimal try-on results
              </p>
            </div>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '10px' }}>
              <h4 style={{ color: '#667eea', margin: '0 0 0.5rem 0' }}>2. RunPod API</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                Set up RunPod endpoint and API keys for GPU-powered processing
              </p>
            </div>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '10px' }}>
              <h4 style={{ color: '#667eea', margin: '0 0 0.5rem 0' }}>3. Image Quality</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                Ensure product images are high-resolution with clean backgrounds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}