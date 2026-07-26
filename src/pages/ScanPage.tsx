import { useNavigate } from 'react-router';
import { ROUTES } from '../constants';

export default function ScanPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>‹</button>
        <h1 style={styles.headerTitle}>Scan & Verify</h1>
      </div>

      <div style={styles.cameraSection}>
        <div style={styles.camera}>
          <div style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderTop: '3px solid #3F7A46', borderLeft: '3px solid #3F7A46' }} />
          <div style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderTop: '3px solid #3F7A46', borderRight: '3px solid #3F7A46' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 20, width: 40, height: 40, borderBottom: '3px solid #3F7A46', borderLeft: '3px solid #3F7A46' }} />
          <div style={{ position: 'absolute', bottom: 20, right: 20, width: 40, height: 40, borderBottom: '3px solid #3F7A46', borderRight: '3px solid #3F7A46' }} />
          <div style={styles.scanLine} />
        </div>
        <p style={styles.cameraHint}>Point your camera at a barcode</p>
      </div>

      <div style={styles.bottom}>
        <p style={styles.orText}>or verify manually</p>
        <button
          style={styles.manualBtn}
          onClick={() => navigate(ROUTES.VERIFY.replace(':productId', 'manual'))}
        >
          Enter NAFDAC Number
        </button>
      </div>

    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#ffffff',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 20px',
    background: '#ffffff',
    borderBottom: '1px solid #F0F0F0',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontSize: '26px',
    color: '#111',
    cursor: 'pointer',
    lineHeight: 1,
    padding: '0',
  },
  headerTitle: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#111',
  },
  cameraSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  camera: {
    width: '100%',
    height: '380px',
    background: '#0D0D0D',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanLine: {
    width: '60%',
    height: '2px',
    background: '#3F7A46',
    opacity: 0.9,
  },
  cameraHint: {
    fontSize: '13px',
    color: '#888',
    marginTop: '16px',
    textAlign: 'center',
  },
  bottom: {
    padding: '20px 24px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    borderTop: '1px solid #F0F0F0',
  },
  orText: {
    fontSize: '13px',
    color: '#888',
    margin: 0,
  },
  manualBtn: {
    width: '100%',
    height: '52px',
    background: '#ffffff',
    color: '#3F7A46',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    border: '1.5px solid #3F7A46',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};