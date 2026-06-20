import React from 'react';

export default function OrderTable({ orders }) {
  return (
    <div>
      <h2>Granular Transaction Audit</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#eaeaea', textAlign: 'left' }}>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Order ID</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Shopify Rev</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Meta Rev</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>ERP Rev</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Reconciled Truth</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Resolution Vector</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId} style={{ background: order.isMismatch ? '#fff5f5' : 'white' }}>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontWeight: 'bold' }}>#{order.orderId}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>${order.shopifyRevenue}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>${order.metaRevenue}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>${order.erpRevenue}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd', color: 'green', fontWeight: 'bold' }}>
                ${order.trustedRevenue}
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontSize: '0.85rem' }}>{order.strategy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}