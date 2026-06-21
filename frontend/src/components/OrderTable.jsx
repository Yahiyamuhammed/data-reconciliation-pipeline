import React from 'react';

export default function OrderTable({ orders }) {
  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
        Order Reconciliation Report
      </h2>
      <div style={{ width: '100%', overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '12px', backgroundColor: '#FFFFFF' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#475569' }}>Order ID</th>
              <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#475569' }}>Shopify</th>
              <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#475569' }}>Meta Ads</th>
              <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#475569' }}>ERP Financial</th>
              <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#475569' }}>Reconciled Truth</th>
              <th style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#475569' }}>Reasoning Vector</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.orderId} 
                style={{ 
                  borderBottom: '1px solid #F1F5F9',
                  backgroundColor: order.isMismatch ? 'rgba(239, 68, 68, 0.02)' : 'transparent',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: '#0F172A', fontFamily: 'SF Mono, monospace' }}>
                  #{order.orderId}
                </td>
                <td style={{ padding: '1rem 1.25rem', color: '#334155', fontFamily: 'SF Mono, monospace' }}>${order.shopifyRevenue}</td>
                <td style={{ padding: '1rem 1.25rem', color: '#334155', fontFamily: 'SF Mono, monospace' }}>${order.metaRevenue}</td>
                <td style={{ padding: '1rem 1.25rem', color: '#334155', fontFamily: 'SF Mono, monospace' }}>${order.erpRevenue}</td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ color: '#047857', fontWeight: 600, fontFamily: 'SF Mono, monospace' }}>${order.trustedRevenue}</div>
                  <div style={{ 
                    display: 'inline-block',
                    fontSize: '0.75rem', 
                    fontWeight: 500,
                    color: order.confidence >= 95 ? '#065F46' : '#92400E', 
                    backgroundColor: order.confidence >= 95 ? '#D1FAE5' : '#FEF3C7',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    marginTop: '4px' 
                  }}>
                    {order.confidence}% confidence
                  </div>
                </td>
                <td style={{ padding: '1rem 1.25rem', color: '#475569', fontSize: '0.85rem', lineHeight: '1.4' }}>
                  {order.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}