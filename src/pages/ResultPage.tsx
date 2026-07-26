import { useNavigate } from 'react-router';
import { ROUTES } from '../constants';

export default function ResultPage() {
  const navigate = useNavigate();

  const product = {
    name: 'Gino Pepper and Onion Paste',
    nafdac: '2782864',
    manufacturedDate: '20/06/2026',
    expiryDate: '22/06/2027',
    company: 'Gino',
  };

  return (
    <div style={styles.page}>

      {/* Verified banner */}
      <div style={styles.banner}>
        <div style={styles.bannerIcon}>✓</div>
        <div>
          <p style={styles.bannerTitle}>Product is Verified</p>
          <p style={styles.bannerSub}>Duly verified by <strong>NAFDAC</strong></p>
        </div>
      </div>

      {/* Product card */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Product Details</h2>

        <Row label="Product Name" value={product.name} />
        <Row label="NAFDAC Number" value={product.nafdac} />
        <Row label="Manufactured Date" value={product.manufacturedDate} />
        <Row label="Expiry Date" value={product.expiryDate} />
        <Row label="Company / Brand" value={product.company} last />
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.btnPrimary} onClick={() => navigate(ROUTES.SCAN)}>
          Return to Scan
        </button>
        <button style={styles.btnSecondary} onClick={() => navigate(ROUTES.REPORTS)}>
          Report
        </button>
      </div>

      <button style={styles.dashLink} onClick={() => navigate(ROUTES.HOME)}>
        ← Return to Dashboard
      </button>

    </div>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div style={{ ...styles.row, ...(last ? {} : styles.rowBorder) }}>
      <span style={styles.rowLabel}>{label}</span>
      <span style={styles.rowValue}>{value}</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#F5F8F5',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 20px 40px',
  },
  banner: {
    background: '#EAF4EC',
    border: '1px solid #C2DEC6',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  bannerIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#3F7A46',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 700,
    flexShrink: 0,
  },
  bannerTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#2E6B3E',
    margin: 0,
    marginBottom: '2px',
  },
  bannerSub: {
    fontSize: '13px',
    color: '#555',
    margin: 0,
  },
  card: {
    background: '#ffffff',
    border: '1px solid #E8EDE8',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#111',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #F0F0F0',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '12px 0',
    gap: '12px',
  },
  rowBorder: {
    borderBottom: '1px solid #F5F5F5',
  },
  rowLabel: {
    fontSize: '14px',
    color: '#666',
    flex: 1,
  },
  rowValue: {
    fontSize: '14px',
    color: '#111',
    fontWeight: 600,
    textAlign: 'right',
    flex: 1,
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  },
  btnPrimary: {
    flex: 1,
    height: '52px',
    background: '#3F7A46',
    color: '#fff',
    fontSize: '15px',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  btnSecondary: {
    flex: 1,
    height: '52px',
    background: '#ffffff',
    color: '#3F7A46',
    fontSize: '15px',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    border: '1.5px solid #3F7A46',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  dashLink: {
    background: 'none',
    border: 'none',
    color: '#3F7A46',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
};