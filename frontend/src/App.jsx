import React, { useState } from 'react';
import { fetchReconciliationReport, fetchReconciliationReportFromFiles } from './api/reconciliation.api.js';
import DashboardSummary from './components/DashboardSummary.jsx';
import OrderTable from './components/OrderTable.jsx';

const mockShopify = [{ orderId: "1001", revenue: 100 }, { orderId: "1002", revenue: 250 }, { orderId: "1003", revenue: 400 }];
const mockMeta = [{ orderId: "1001", attributedRevenue: 120 }, { orderId: "1002", attributedRevenue: 250 }, { orderId: "1003", attributedRevenue: 550 }];
const mockErp = [{ orderId: "1001", revenue: 100 }, { orderId: "1002", revenue: 240 }, { orderId: "1003", revenue: 400 }];

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Raw file pointers from input fields
  const [shopifyFile, setShopifyFile] = useState(null);
  const [metaFile, setMetaFile] = useState(null);
  const [erpFile, setErpFile] = useState(null);

  // Execution Path 1: Hardcoded Demo Data (Frontend JSON Payload)
  const handleRunDemo = async () => {
    setLoading(true);
    setError(null);
    try {
      const report = await fetchReconciliationReport({ shopify: mockShopify, meta: mockMeta, erp: mockErp });
      setData(report);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Execution Path 2: Upload Files (Backend Parsing Path)
  const handleRunUpload = async () => {
    if (!shopifyFile || !metaFile || !erpFile) {
      setError("Please select all three files before submitting to the server.");
      return;
    }

    setLoading(true);
    setError(null);

    // Construct multipart form payload
    const formData = new FormData();
    formData.append('shopify', shopifyFile);
    formData.append('meta', metaFile);
    formData.append('erp', erpFile);

    try {
      const report = await fetchReconciliationReportFromFiles(formData);
      setData(report);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fileInputStyle = { display: 'block', margin: '0.5rem 0', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%', maxWidth: '300px' };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '2px solid #333', paddingBottom: '1rem' }}>
        <h1 style={{ margin: 0 }}>Mini-Menza Data Engine</h1>
        <p style={{ color: '#666' }}>Automated programmatic validation engine across ad channels, store tracking, and financial ledgers.</p>
      </header>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {/* File Ingestion Section */}
        <div style={{ flex: 1, minWidth: '300px', padding: '1.5rem', background: '#f5f7fa', border: '1px solid #e1e4e8', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Option A: Upload Data Files to Backend</h3>
          
          <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Shopify Orders (JSON File)</label>
          <input type="file" accept=".json" onChange={(e) => setShopifyFile(e.target.files[0])} style={fileInputStyle} />
          
          <label style={{ fontWeight: 'bold', fontSize: '0.9rem', marginTop: '1rem' }}>Meta Ads (JSON File)</label>
          <input type="file" accept=".json" onChange={(e) => setMetaFile(e.target.files[0])} style={fileInputStyle} />
          
          <label style={{ fontWeight: 'bold', fontSize: '0.9rem', marginTop: '1rem' }}>ERP Ledger (JSON File)</label>
          <input type="file" accept=".json" onChange={(e) => setErpFile(e.target.files[0])} style={fileInputStyle} />

          <button 
            onClick={handleRunUpload} 
            disabled={loading}
            style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', fontSize: '1rem', background: '#0275d8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
          >
            {loading ? 'Server Uploading & Ingesting...' : 'Stream Files to Server'}
          </button>
        </div>

        {/* Demo Fallback Section */}
        <div style={{ flex: 1, minWidth: '300px', padding: '1.5rem', background: '#fff', border: '1px solid #e1e4e8', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ marginTop: 0 }}>Option B: Sandbox Environment</h3>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Test pipeline performance instantly using pre-configured database mocks.</p>
          <button 
            onClick={handleRunDemo} 
            disabled={loading}
            style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', maxWidth: '300px' }}
          >
            {loading ? 'Processing Sandbox...' : 'Run Demo Pipeline'}
          </button>
        </div>
      </div>

      {error && <div style={{ color: 'red', padding: '1rem', background: '#ffeeee', marginBottom: '2rem', borderRadius: '4px', border: '1px solid #ffcccc' }}>{error}</div>}

      {data && (
        <>
          <DashboardSummary summary={data.summary} insight={data.aiInsight} />
          <OrderTable orders={data.orders} />
        </>
      )}
    </div>
  );
}