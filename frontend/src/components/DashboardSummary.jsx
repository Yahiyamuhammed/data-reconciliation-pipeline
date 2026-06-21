import React from 'react';

export default function DashboardSummary({ summary, insight }) {
  // Format long numbers cleanly for enterprise dashboards
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
        Reconciliation Summary
      </h2>
      
      {/* Metric Grid Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Total Orders Parsed
          </h3>
          <p style={{ fontSize: '2.25rem', fontWeight: 700, color: '#0F172A', fontFamily: 'SF Mono, Courier New, monospace', margin: '0.5rem 0 0 0', letterSpacing: '-0.03em' }}>
            {summary.totalOrders}
          </p>
        </div>
        
        <div style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Discrepancies Found
          </h3>
          <p style={{ 
            fontSize: '2.25rem', 
            fontWeight: 700, 
            color: summary.totalDiscrepancies > 0 ? '#DF1C1C' : '#0F172A', 
            fontFamily: 'SF Mono, Courier New, monospace', 
            margin: '0.5rem 0 0 0', 
            letterSpacing: '-0.03em' 
          }}>
            {summary.totalDiscrepancies}
          </p>
        </div>
        
        <div style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748B', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Meta Over-Attribution
          </h3>
          <p style={{ 
            fontSize: '2.25rem', 
            fontWeight: 700, 
            color: summary.totalOverAttributedRevenue > 0 ? '#C2410C' : '#0F172A', 
            fontFamily: 'SF Mono, Courier New, monospace', 
            margin: '0.5rem 0 0 0', 
            letterSpacing: '-0.03em' 
          }}>
            {formatCurrency(summary.totalOverAttributedRevenue)}
          </p>
        </div>
      </div>

      {/* Premium Automated Insights Container */}
      <div style={{ backgroundColor: '#0F172A', padding: '1.75rem', borderRadius: '16px', border: '1px solid #1E293B', boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.15)' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94A3B8', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
          Menza AI Executive Intelligence
        </h3>
        <div style={{ lineHeight: '1.75', fontSize: '0.95rem', color: '#E2E8F0', whiteSpace: 'pre-wrap', fontWeight: '400' }}>
          {insight.split('**').map((text, i) => i % 2 === 1 ? <strong key={i} style={{ color: '#F8FAFC', fontWeight: 600 }}>{text}</strong> : text)}
        </div>
      </div>
    </div>
  );
}