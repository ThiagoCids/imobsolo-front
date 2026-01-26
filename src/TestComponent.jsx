import React from 'react';

export default function TestComponent() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#f0f0f0'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>✅ App está rodando!</h1>
        <p>Se você vê isso, o React está funcionando.</p>
      </div>
    </div>
  );
}
