import React, { useState } from 'react';

const SolanaOffRampComparator = () => {
  const [amount, setAmount] = useState('1000');
  const [currency, setCurrency] = useState('USD');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for off-ramp services
  const offRampServices = {
    USD: [
      { name: 'Ramp', fee: 0.49, limit: 50000, settlementTime: '1-2 hours', region: 'Global' },
      { name: 'MoonPay', fee: 1.5, limit: 100000, settlementTime: '2-4 hours', region: 'Global' },
      { name: 'Transak', fee: 1.0, limit: 75000, settlementTime: '1-3 hours', region: 'Global' },
      { name: 'Coinbase Offramp', fee: 2.0, limit: 150000, settlementTime: '2-5 days', region: 'US' },
    ],
    EUR: [
      { name: 'Ramp', fee: 0.49, limit: 50000, settlementTime: '1-2 hours', region: 'EU' },
      { name: 'MoonPay', fee: 1.5, limit: 100000, settlementTime: '2-4 hours', region: 'EU' },
      { name: 'Transak', fee: 1.0, limit: 75000, settlementTime: '1-3 hours', region: 'EU' },
    ],
    GBP: [
      { name: 'Ramp', fee: 0.49, limit: 50000, settlementTime: '1-2 hours', region: 'UK' },
      { name: 'MoonPay', fee: 1.5, limit: 100000, settlementTime: '2-4 hours', region: 'UK' },
      { name: 'Transak', fee: 1.0, limit: 75000, settlementTime: '1-3 hours', region: 'UK' },
    ],
    INR: [
      { name: 'CoinDCX', fee: 0.1, limit: 500000, settlementTime: '15 mins - 1 hour', region: 'India' },
      { name: 'WazirX', fee: 0.0, limit: 1000000, settlementTime: '10 mins - 30 mins', region: 'India' },
      { name: 'Ramp', fee: 0.99, limit: 50000, settlementTime: '2-4 hours', region: 'India' },
    ],
  };

  const handleCompare = () => {
    setLoading(true);
    // Simulate API call - in production, this would fetch real-time data from exchange APIs
    setTimeout(() => {
      const selected = offRampServices[currency] || [];
      const numAmount = parseFloat(amount) || 0;
      
      const enrichedResults = selected.map((service) => ({
        ...service,
        grossAmount: numAmount,
        feeAmount: (numAmount * service.fee) / 100,
        netAmount: numAmount - ((numAmount * service.fee) / 100),
      })).sort((a, b) => a.feeAmount - b.feeAmount);

      setResults(enrichedResults);
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
          Solana fiat off-ramp comparator
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', marginBottom: '1.5rem' }}>
          Find the cheapest way to convert Solana to fiat. Compare fees, limits, and settlement times across services.
        </p>
      </div>

      <div style={{
        background: 'var(--color-background-secondary)',
        border: `1px solid var(--color-border-tertiary)`,
        borderRadius: 'var(--border-radius-lg)',
        padding: '1.5rem',
        marginBottom: '2rem',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
              Amount (SOL equivalent)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '16px',
                border: `1px solid var(--color-border-tertiary)`,
                borderRadius: 'var(--border-radius-md)',
                background: 'var(--color-background-primary)',
                color: 'var(--color-text-primary)',
                boxSizing: 'border-box',
              }}
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
              Target currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '16px',
                border: `1px solid var(--color-border-tertiary)`,
                borderRadius: 'var(--border-radius-md)',
                background: 'var(--color-background-primary)',
                color: 'var(--color-text-primary)',
                boxSizing: 'border-box',
              }}
            >
              <option value="USD">USD (United States)</option>
              <option value="EUR">EUR (Europe)</option>
              <option value="GBP">GBP (United Kingdom)</option>
              <option value="INR">INR (India)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCompare}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '16px',
            fontWeight: '500',
            background: '#14F195',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: 'var(--border-radius-md)',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Comparing...' : 'Compare routes'}
        </button>
      </div>

      {results.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'var(--color-background-secondary)',
            borderRadius: 'var(--border-radius-lg)',
            overflow: 'hidden',
          }}>
            <thead>
              <tr style={{ borderBottom: `2px solid var(--color-border-tertiary)` }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '14px' }}>Service</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '14px' }}>Fee %</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '14px' }}>Fee amount</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '14px' }}>You receive</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '14px' }}>Settlement</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '14px' }}>Limit</th>
              </tr>
            </thead>
            <tbody>
              {results.map((service, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: `1px solid var(--color-border-tertiary)`,
                    background: idx === 0 ? 'rgba(20, 241, 149, 0.05)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '1rem', color: 'var(--color-text-primary)', fontWeight: '500' }}>{service.name}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>{service.fee}%</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                    {service.feeAmount.toFixed(2)} {currency}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                    {service.netAmount.toFixed(2)} {currency}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                    {service.settlementTime}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                    {service.limit.toLocaleString()} {currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results.length > 0 && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'var(--color-background-secondary)',
          border: `1px solid var(--color-border-tertiary)`,
          borderRadius: 'var(--border-radius-lg)',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
            Best option
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
            <strong style={{ color: 'var(--color-text-primary)' }}>{results[0].name}</strong> offers the lowest fees for this withdrawal. 
            You'll receive <strong style={{ color: 'var(--color-text-primary)' }}>{results[0].netAmount.toFixed(2)} {currency}</strong> after 
            fees ({results[0].fee}%), with settlement in approximately {results[0].settlementTime}.
          </p>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--color-background-tertiary)', borderRadius: 'var(--border-radius-md)', color: 'var(--color-text-secondary)', fontSize: '13px' }}>
        <p>
          <strong style={{ color: 'var(--color-text-primary)' }}>Note:</strong> This MVP uses mock data. Production version will integrate real-time APIs from 
          Ramp, MoonPay, Transak, CoinDCX, WazirX, and others. Currently showing realistic sample rates and limits for demonstration.
        </p>
      </div>
    </div>
  );
};

export default SolanaOffRampComparator;
