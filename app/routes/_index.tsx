import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '2rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          🎯 AI Fashion Try-On
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Transform your fashion store with cutting-edge AI virtual try-on technology powered by ComfyUI workflow and RunPod processing.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            to="/try-on" 
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'transform 0.2s',
              display: 'inline-block'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            🚀 Try-On Studio
          </Link>
          <Link 
            to="/products" 
            style={{
              background: 'white',
              color: '#667eea',
              padding: '1rem 2rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '2px solid #667eea',
              transition: 'all 0.2s',
              display: 'inline-block'
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
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8f9ff',
          borderRadius: '10px',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <strong>🔧 Tech Stack:</strong> ComfyUI Workflow • RunPod API • Automatic Dress Fetching • Real-time Processing
        </div>
      </div>
    </div>
  );
}