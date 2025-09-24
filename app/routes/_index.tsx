import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

export const loader = async () => {
  // Simple loader for WebContainer environment
  return json({
    message: "ShootX AI Fashion Try-On App",
    environment: "development"
  });
};

export default function Index() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '3rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            🎯 ShootX
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            color: '#333',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            AI Fashion Try-On for Shopify
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: '1.2rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Revolutionary ComfyUI-powered virtual try-on technology running on RunPod. 
            Upload your photo, select any dress, and see instant AI-generated results.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            padding: '2rem',
            background: '#f8f9ff',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>ComfyUI Workflow</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Advanced AI processing with ComfyUI workflows optimized for fashion try-on scenarios
            </p>
          </div>
          
          <div style={{
            padding: '2rem',
            background: '#f0fff4',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>RunPod Processing</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              High-performance GPU processing on RunPod for fast, high-quality results
            </p>
          </div>
          
          <div style={{
            padding: '2rem',
            background: '#fff5f5',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>Auto Dress Fetch</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Automatically fetches dress images from product pages - users only upload their photo
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link 
            to="/app/try-on"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            🚀 Try-On Studio
          </Link>
          
          <Link 
            to="/app/products"
            style={{
              background: 'white',
              color: '#667eea',
              border: '2px solid #667eea',
              padding: '1rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#667eea';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#667eea';
            }}
          >
            📦 Manage Products
          </Link>
        </div>

        {/* Technical Info */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: '#f8f9fa',
          borderRadius: '15px'
        }}>
          <h3 style={{ color: '#333', marginBottom: '1rem', textAlign: 'center' }}>
            🔧 Ready for RunPod Integration
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1rem',
            fontSize: '0.9rem',
            color: '#666'
          }}>
            <div>
              <strong>✅ ComfyUI Service:</strong> Pre-configured for workflow submission
            </div>
            <div>
              <strong>✅ Image Processing:</strong> Automatic product image fetching
            </div>
            <div>
              <strong>✅ API Routes:</strong> Ready for RunPod endpoint integration
            </div>
            <div>
              <strong>✅ Database:</strong> Job tracking and result storage
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}