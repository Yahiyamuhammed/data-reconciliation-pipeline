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

  const [shopifyFile, setShopifyFile] = useState(null);
  const [metaFile, setMetaFile] = useState(null);
  const [erpFile, setErpFile] = useState(null);

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

  const handleRunUpload = async () => {
    if (!shopifyFile || !metaFile || !erpFile) {
      setError("Incomplete configurations. Please ensure all three data arrays are mounted before pipeline execution.");
      return;
    }

    setLoading(true);
    setError(null);

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

  // Styled components mimicking modern minimalist design tokens
  const cardStyle = { flex: 1, minWidth: '320px', padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' };
  const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' };
  const inputStyle = { display: 'block', width: '100%', boxSizing: 'border-box', padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#334155', border: '1px solid #CBD5E1', borderRadius: '8px', marginBottom: '1.25rem', backgroundColor: '#F8FAFC' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', padding: '3rem 1.5rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* App Global Header */}
        <header style={{ marginBottom: '3rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.03em' }}>
            Mini-Menza Engine
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', color: '#64748B', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Multi-directional data verification system mapping storefront transactions, ad network attribution, and balance sheets.
          </p>
        </header>

        {/* Dynamic Dual Module Panels */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          
          {/* Module 1: System Upload */}
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.1rem', fontWeight: 600, color: '#0F172A' }}>
              Production File Ingestion
            </h3>
            
            <label style={labelStyle}>Shopify Ledger (.json)</label>
            <input type="file" accept=".json" onChange={(e) => setShopifyFile(e.target.files[0])} style={inputStyle} />
            
            <label style={labelStyle}>Meta Ad Networks (.json)</label>
            <input type="file" accept=".json" onChange={(e) => setMetaFile(e.target.files[0])} style={inputStyle} />
            
            <label style={labelStyle}>ERP Balance Reconciliation (.json)</label>
            <input type="file" accept=".json" onChange={(e) => setErpFile(e.target.files[0])} style={inputStyle} />

            <button 
              onClick={handleRunUpload} 
              disabled={loading}
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', fontWeight: 500, background: '#0F172A', color: '#FFFFFF', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'opacity 0.15s ease', opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Streaming Ingestion Channels...' : 'Execute Batch Upload'}
            </button>
          </div>

          {/* Module 2: Automated Sandbox */}
          <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 600, color: '#0F172A' }}>
                Sandbox Environment
              </h3>
              <p style={{ margin: 0, color: '#64748B', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Instantly parse static memory configurations mimicking classic marketing attribution data inflation anomalies. Use this to demonstrate system pipelines without uploading external data structures.
              </p>
            </div>
            <button 
              onClick={handleRunDemo} 
              disabled={loading}
              style={{ width: '100%', marginTop: '2rem', padding: '0.75rem', fontSize: '0.9rem', fontWeight: 500, background: 'transparent', color: '#0F172A', border: '1px solid #0F172A', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.15s ease' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(15,23,42,0.04)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {loading ? 'Processing Sandbox Matrix...' : 'Run Simulated Pipeline'}
            </button>
          </div>

        </div>

        {/* Global Error Banner */}
        {error && (
          <div style={{ color: '#DF1C1C', padding: '1rem 1.25rem', background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '8px', marginBottom: '3rem', fontSize: '0.9rem', fontWeight: 500 }}>
            {error}
          </div>
        )}

        {/* Data Output Matrix */}
        {data && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <DashboardSummary summary={data.summary} insight={data.aiInsight} />
            <OrderTable orders={data.orders} />
          </div>
        )}
      </div>
    </div>
  );
}