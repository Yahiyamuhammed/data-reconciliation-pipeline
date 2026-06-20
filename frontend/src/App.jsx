import React, { useState } from 'react';
import { fetchReconciliationReport } from './api/reconciliation.api.js';
import DashboardSummary from './components/DashboardSummary.jsx';
import OrderTable from './components/OrderTable.jsx';

// Concrete realistic mock parameters mirroring your data structure requirements
const mockShopify = [
  { orderId: "1001", revenue: 100 },
  { orderId: "1002", revenue: 250 },
  { orderId: "1003", revenue: 400 }
];

const mockMeta = [
  { orderId: "1001", attributedRevenue: 120 },
  { orderId: "1002", attributedRevenue: 250 },
  { orderId: "1003", attributedRevenue: 550 }
];

const mockErp = [
  { orderId: "1001", revenue: 100 },
  { orderId: "1002", revenue: 240 }, // Mismatch example where ERP drops from Shopify drift
  { orderId: "1003", revenue: 400 }
];

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRunReconciliation = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = { shopify: mockShopify, meta: mockMeta, erp: mockErp };
      const report = await fetchReconciliationReport(payload);
      setData(report);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '2px solid #333', paddingBottom: '1rem' }}>
        <h1 style={{ margin: 0 }}>Mini-Menza Data Engine</h1>
        <p style={{ color: '#666' }}>Automated programmatic validation engine across ad channels, store tracking, and financial ledgers.</p>
      </header>

      <button 
        onClick={handleRunReconciliation} 
        disabled={loading}
        style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '2rem' }}
      >
        {loading ? 'Processing Ledger Ingestion...' : 'Execute Ingestion Pipelines'}
      </button>

      {error && <div style={{ color: 'red', padding: '1rem', background: '#ffeeee', marginBottom: '2rem' }}>{error}</div>}

      {data && (
        <>
          <DashboardSummary summary={data.summary} insight={data.aiInsight} />
          <OrderTable orders={data.orders} />
        </>
      )}
    </div>
  );
}