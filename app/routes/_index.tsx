import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
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

        {/* Demo Status */}
        <div style={{
          padding: '2rem',
          background: '#f8f9fa',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>
            🔧 Development Preview
          </h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            This is a development preview of the ShootX AI Fashion Try-On Shopify app.
          </p>
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
              <strong>✅ RunPod Integration:</strong> Ready for API endpoint configuration
            </div>
            <div>
              <strong>✅ ShootX Branding:</strong> Custom workflow with branding support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}