import { useNavigate, useParams, useLocation } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { ROUTES } from '../constants';
import { verificationService } from '../services/verification';
import { Spinner } from '../components/ui';
import type { VerificationResult } from '../types';

export default function ResultPage() {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const location = useLocation();

  const passedResult = location.state?.result as VerificationResult | undefined;

  const { data: result, isLoading, error } = useQuery<VerificationResult>({
    queryKey: ['verification', code],
    queryFn: () => verificationService.verifyCode(code!),
    enabled: !passedResult && !!code,
    staleTime: 5 * 60 * 1000,
  });

  const verification = passedResult ?? result;

  if (isLoading) {
    return (
      <div style={styles.page}>
        <div style={styles.statusContainer}>
          <Spinner size="lg" />
          <p style={styles.statusText}>Loading result...</p>
        </div>
      </div>
    );
  }

  if (error || !verification) {
    return (
      <div style={styles.page}>
        <div style={styles.statusContainer}>
          <div style={styles.errorIcon}>!</div>
          <p style={styles.errorTitle}>Could not load result</p>
          <p style={styles.errorText}>Please check your connection and try again.</p>
          <button style={styles.retryBtn} onClick={() => navigate(ROUTES.SCAN)}>
            Return to Scan
          </button>
        </div>
      </div>
    );
  }

  const isFake = verification.status === 'FAKE';
  const product = verification.product;

  const bannerBg = isFake ? '#FDEAEA' : '#FFF8E1';
  const bannerBorder = isFake ? '#F5C6C6' : '#FFE082';
  const bannerIconBg = isFake ? '#D32F2F' : '#F9A825';
  const bannerTitleColor = isFake ? '#B71C1C' : '#F57F17';
  const bannerTitle = isFake ? 'Product Not Verified' : 'Suspicious Product';
  const bannerSub = verification.reason;

  return (
    <div style={styles.page}>
      {/* Status banner */}
      <div style={{ ...styles.banner, background: bannerBg, border: `1px solid ${bannerBorder}` }}>
        <div style={{ ...styles.bannerIcon, background: bannerIconBg }}>!</div>
        <div>
          <p style={{ ...styles.bannerTitle, color: bannerTitleColor }}>{bannerTitle}</p>
          <p style={styles.bannerSub}>{bannerSub}</p>
        </div>
      </div>

      {/* Product card */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Product Details</h2>

        {product ? (
          <>
            <Row label="Product Name" value={product.name} />
            <Row label="NAFDAC Number" value={product.verificationCode} />
            <Row label="Manufactured Date" value={product.manufactureDate} />
            <Row label="Expiry Date" value={product.expiryDate} />
            <Row label="Company / Brand" value={product.manufacturer.name} last />
          </>
        ) : (
          <Row label="Verification Code" value={code ?? 'N/A'} last />
        )}
      </div>

      {/* Scan stats (if suspicious) */}
      {verification.scanStats && (
        <div style={styles.statsCard}>
          <h3 style={styles.statsTitle}>Scan Activity</h3>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{verification.scanStats.scansInWindow}</span>
              <span style={styles.statLabel}>Total Scans</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{verification.scanStats.distinctLocationsInWindow}</span>
              <span style={styles.statLabel}>Locations</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{verification.scanStats.windowHours}h</span>
              <span style={styles.statLabel}>Time Window</span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.btnPrimary} onClick={() => navigate(ROUTES.SCAN)}>
          Return to Scan
        </button>
        <button style={styles.btnSecondary}>
          Report
        </button>
      </div>

      <button style={styles.dashLink} onClick={() => navigate(ROUTES.HOME)}>
        &larr; Return to Dashboard
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
  statusContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  statusText: {
    color: '#888',
    fontSize: '14px',
  },
  errorIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#D32F2F',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 700,
  },
  errorTitle: {
    color: '#111',
    fontSize: '16px',
    fontWeight: 700,
    margin: 0,
  },
  errorText: {
    color: '#888',
    fontSize: '13px',
    textAlign: 'center',
    maxWidth: '280px',
    margin: 0,
  },
  retryBtn: {
    marginTop: '8px',
    padding: '10px 24px',
    background: '#3F7A46',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  banner: {
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
    marginBottom: '16px',
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
  statsCard: {
    background: '#ffffff',
    border: '1px solid #E8EDE8',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '20px',
  },
  statsTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#111',
    marginBottom: '12px',
    margin: '0 0 12px 0',
  },
  statsGrid: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  statValue: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#3F7A46',
  },
  statLabel: {
    fontSize: '12px',
    color: '#888',
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
