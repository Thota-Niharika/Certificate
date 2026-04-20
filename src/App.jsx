import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ConfigurationPanel from './components/ConfigurationPanel';
import TrackingDashboard from './components/TrackingDashboard';
import GLogoCertificateTemplate from './components/GLogoCertificateTemplate';
import SingleGenerationForm from './components/SingleGenerationForm';

function App() {
  const [activeTab, setActiveTab] = useState('generate');
  const [searchQuery, setSearchQuery] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [templateFile, setTemplateFile] = useState(null);
  
  // Real-time preview data for single issuance
  const [singleData, setSingleData] = useState({
    studentName: '',
    webinarName: '',
    email: ''
  });

  return (
    <div className="app-container">
      <div className="main-content" style={{ maxWidth: activeTab === 'generate' ? '1400px' : '1200px' }}>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Dynamic Content */}
        {activeTab === 'generate' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Top Row: Full-width Uploads & Header */}
            <UploadSection csvFile={csvFile} setCsvFile={setCsvFile} templateFile={templateFile} setTemplateFile={setTemplateFile} />

            {/* Bottom Row: Side-By-Side Issuance & Preview */}
            <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '32px', alignItems: 'start' }}>
              
              {/* Left Side: Single Candidate Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <SingleGenerationForm 
                  onDataChange={setSingleData} 
                  onComplete={() => setActiveTab('tracking')} 
                />
              </div>

              {/* Right Side: Preview & Bulk Action */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
                  <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Designer Preview</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {templateFile && <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', fontSize: '0.75rem' }}>Custom Template</span>}
                      <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-success)', fontSize: '0.75rem' }}>Live Sync</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, padding: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(255,255,255,0.2)' }}>
                    <div style={{ width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
                      <GLogoCertificateTemplate 
                        studentName={singleData.studentName || "Candidate Name"}
                        courseName={singleData.webinarName || "Webinar / Course Name"}
                        issueDate={new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}
                        certificateId="PREVIEW-MODE"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Action button now under the preview */}
                <ConfigurationPanel csvFile={csvFile} setActiveTab={setActiveTab} />
              </div>

            </div>
          </div>
        ) : (
          <div>
            <TrackingDashboard searchQuery={searchQuery} templateFile={templateFile} />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
