import React, { useState } from 'react';
import { Send, Zap, AlertCircle } from 'lucide-react';

const API_BASE = 'http://192.168.1.7:8080';

const ConfigurationPanel = ({ csvFile, setActiveTab }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  const handleGenerate = async () => {
    if (!csvFile) {
      setErrorStatus("Please upload a CSV file to proceed.");
      return;
    }
    
    setIsGenerating(true);
    setErrorStatus(null);
    
    // Prepare FormData
    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const response = await fetch(`${API_BASE}/api/certificates/upload`, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();

      if (response.ok || responseText.includes("Processing started")) {
        // Automatically jump to tracking tab upon successful submission
        setActiveTab('tracking');
      } else {
        throw new Error(responseText || `Upload failed with status: ${response.status}`);
      }
    } catch (err) {
      setErrorStatus(err.message || "An error occurred connecting to the server.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>

      {/* Error Output */}
      {errorStatus && (
        <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
          <AlertCircle size={18} />
          {errorStatus}
        </div>
      )}

      {/* Action Button */}
      <div>
        <button 
          className="btn-primary" 
          style={{ width: '100%', padding: '16px', fontSize: '1.05rem', marginTop: '0' }}
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <Zap className="spin-animation" size={20} />
              Processing Records...
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <Send size={20} />
              Generate & Send Emails
            </div>
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ConfigurationPanel;
