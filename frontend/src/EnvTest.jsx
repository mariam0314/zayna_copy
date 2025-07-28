import React, { useEffect, useState } from 'react';

const EnvTest = () => {
  const [envInfo, setEnvInfo] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  
  // Login component state
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    id: ''
  });

  useEffect(() => {
    setEnvInfo({
      VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
      allEnv: import.meta.env
    });
  }, []);

  // Generate a random ID - IMPROVED VERSION
  const generateID = () => {
    console.log('🎲 Starting ID generation...');
    
    // Method 1: Simple 6-digit number (more reliable)
    const simpleId = Math.floor(100000 + Math.random() * 900000);
    console.log('✅ Generated simple ID:', simpleId);
    
    // Method 2: Your original method as backup
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const combined = `${timestamp}${random}`;
    const slicedId = combined.slice(-8);
    console.log('✅ Generated complex ID:', slicedId);
    
    // Use the simple method
    return simpleId.toString();
  };

  // Handle switching to login mode - IMPROVED VERSION
  const switchToLogin = () => {
    console.log('🔄 Switching to login mode...');
    
    const newId = generateID();
    console.log('📝 Setting new ID:', newId);
    
    // Update state with a slight delay to ensure it processes
    setTimeout(() => {
      setIsLogin(true);
      setFormData(prevData => {
        const newData = {
          name: '',
          phone: '',
          id: newId
        };
        console.log('✅ Form data updated:', newData);
        return newData;
      });
    }, 50);
  };

  // Handle switching to register mode
  const switchToRegister = () => {
    console.log('🔄 Switching to register mode...');
    setIsLogin(false);
    setFormData({
      name: '',
      phone: '',
      id: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`📝 Input changed - ${name}: ${value}`);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('🚀 Form submission started');
    console.log('📊 Current form data:', formData);
    
    if (!formData.name || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    if (isLogin && !formData.id) {
      alert('ID is required for login');
      return;
    }

    console.log('Form submitted:', formData);
    console.log('Backend URL:', envInfo.VITE_BACKEND_URL);
    
    if (isLogin) {
      // Login logic here
      alert(`Login attempt with ID: ${formData.id}`);
    } else {
      // Register logic here
      alert(`Registration attempt for: ${formData.name}`);
    }
  };

  // Force generate new ID button (for testing) - IMPROVED VERSION
  const forceGenerateId = () => {
    console.log('🔧 Force generating new ID...');
    const newId = generateID();
    console.log('🎯 Force generated ID:', newId);
    
    setFormData(prev => {
      const updated = {
        ...prev,
        id: newId
      };
      console.log('✅ Updated form data:', updated);
      return updated;
    });
  };

  // Test function for the debug button
  const testIdGeneration = () => {
    const testId = Math.floor(Math.random() * 1000000);
    console.log('🧪 Test ID:', testId);
    alert(`Test ID generated: ${testId}`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Environment Variables Test</h1>
      
      {/* Environment Info Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2>VITE_BACKEND_URL:</h2>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          {JSON.stringify(envInfo.VITE_BACKEND_URL, null, 2)}
        </pre>
        <h3>All Environment Variables:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', fontSize: '12px' }}>
          {JSON.stringify(envInfo.allEnv, null, 2)}
        </pre>
      </div>

      {/* Login Test Section */}
      <div style={{ borderTop: '2px solid #ccc', paddingTop: '20px' }}>
        <h2>Login Component Test</h2>
        <button 
          onClick={() => setShowLogin(!showLogin)}
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {showLogin ? 'Hide Login Test' : 'Show Login Test'}
        </button>

        {showLogin && (
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            background: 'white',
            maxWidth: '400px'
          }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
              {isLogin ? 'Login' : 'Register as Guest'}
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                ID {isLogin && <span style={{ color: '#28a745' }}>(Auto-generated)</span>}
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  name="id"
                  placeholder={isLogin ? "Auto-generated ID" : "Enter ID (if you have one)"}
                  value={formData.id}
                  onChange={handleInputChange}
                  readOnly={isLogin}
                  style={{
                    flex: '1',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    background: isLogin ? '#f8f9fa' : 'white'
                  }}
                />
                {isLogin && (
                  <button
                    type="button"
                    onClick={forceGenerateId}
                    style={{
                      padding: '10px',
                      background: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    title="Generate new ID"
                  >
                    🔄
                  </button>
                )}
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                background: '#000',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <span style={{ color: '#666' }}>
                {isLogin ? "Don't have an account? " : "Already registered? "}
              </span>
              <button
                onClick={isLogin ? switchToRegister : switchToLogin}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {isLogin ? 'Register' : 'Back to Login'}
              </button>
            </div>
            
            {/* Enhanced Debug Info */}
            <div style={{
              marginTop: '20px',
              padding: '10px',
              background: '#f8f9fa',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              <strong>Debug Info:</strong>
              <div>Mode: {isLogin ? 'Login' : 'Register'}</div>
              <div style={{ color: formData.id ? 'green' : 'red', fontWeight: 'bold' }}>
                ID: {formData.id ? `✅ ${formData.id}` : '❌ Not generated'}
              </div>
              <div>Name: {formData.name || 'Empty'}</div>
              <div>Phone: {formData.phone || 'Empty'}</div>
              <div>Backend URL: {envInfo.VITE_BACKEND_URL || 'Not loaded'}</div>
              
              {/* Quick Test Button */}
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={testIdGeneration}
                  style={{
                    padding: '5px 10px',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    fontSize: '10px',
                    cursor: 'pointer'
                  }}
                >
                  🧪 Test ID Generation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvTest;