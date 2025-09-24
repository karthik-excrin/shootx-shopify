import { Link } from "@remix-run/react";

export default function Index() {
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

        {/* Navigation Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginTop: '3rem'
        }}>
          <Link to="/try-on" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              padding: '2rem',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>AI Try-On Studio</h3>
              <p style={{ margin: 0, opacity: 0.9 }}>
                Upload your photo and try on dresses with AI
              </p>
            </div>
          </Link>

          <Link to="/products" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '2rem',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>Product Management</h3>
              <p style={{ margin: 0, opacity: 0.9 }}>
                Configure products for AI try-on functionality
              </p>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div style={{ 
          marginTop: '4rem',
          padding: '2rem',
          background: '#f8f9ff',
          borderRadius: '15px'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
            🚀 Powered by Advanced AI
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧠</div>
              <h4 style={{ color: '#667eea', margin: '0 0 0.5rem 0' }}>ComfyUI Workflows</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                Advanced AI workflows for realistic try-on results
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
              <h4 style={{ color: '#667eea', margin: '0 0 0.5rem 0' }}>RunPod Processing</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                GPU-powered processing for fast results
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛍️</div>
              <h4 style={{ color: '#667eea', margin: '0 0 0.5rem 0' }}>Shopify Integration</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                Seamless integration with your Shopify store
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}