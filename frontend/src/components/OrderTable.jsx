import React from 'react';

export default function OrderTable({ orders }) {
  return (
    <div>
      <h2>Order Reconciliation Report</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#eaeaea', textAlign: 'left' }}>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Order ID</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Shopify</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Meta</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>ERP</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Reconciled Truth</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Reasoning Engine</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId} style={{ background: order.isMismatch ? '#fff5f5' : 'white' }}>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontWeight: 'bold' }}>#{order.orderId}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>${order.shopifyRevenue}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>${order.metaRevenue}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>${order.erpRevenue}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                <div style={{ color: 'green', fontWeight: 'bold' }}>${order.trustedRevenue}</div>
                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>Confidence: {order.confidence}%</div>
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontSize: '0.85rem' }}>{order.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}