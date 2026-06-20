import React from 'react';

export default function DashboardSummary({ summary, insight }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>System Ingestion Summary</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', flex: 1 }}>
          <h3>Total Parsed Orders</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{summary.totalOrders}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', flex: 1 }}>
          <h3>Mismatched Ingestions</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: summary.totalDiscrepancies > 0 ? '#d9534f' : 'inherit' }}>
            {summary.totalDiscrepancies}
          </p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', flex: 1 }}>
          <h3>Meta Over-Attribution</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f0ad4e' }}>
            ${summary.totalOverAttributedRevenue}
          </p>
        </div>
      </div>

      <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '6px', borderLeft: '4px solid #0275d8' }}>
        <h3 style={{ marginTop: 0 }}>Menza Automated AI Insight</h3>
        <p style={{ lineHeight: '1.6', fontFamily: 'monospace' }}>{insight}</p>
      </div>
    </div>
  );
}