import React from 'react'

export function CustomLogo() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      padding: '16px 20px'
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        background: '#1f2937',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: '600',
        fontSize: '14px'
      }}>
        UIT
      </div>
      <div>
        <div style={{ 
          fontWeight: '600', 
          fontSize: '16px',
          color: '#111827'
        }}>
          UIT University
        </div>
      </div>
    </div>
  )
}

export default CustomLogo