import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../constants';
import QrScanner from '../components/QrScanner';
import { verificationService } from '../services/verification';
import type { VerificationResult } from '../types';

type ScanState = 'scanning' | 'verifying' | 'error' | 'manual-input';

export default function ScanPage() {
  const navigate = useNavigate();
  const [scanState, setScanState] = useState<ScanState>('scanning');
  const [errorMessage, setErrorMessage] = useState('');
  const [manualCode, setManualCode] = useState('');

  async function handleVerification(code: string) {
    setScanState('verifying');
    try {
      const result: VerificationResult = await verificationService.verifyCode(code);
      if (result.status === 'genuine') {
        navigate(ROUTES.VERIFY.replace(':code', code), { state: { result } });
      } else {
        navigate(ROUTES.RESULT.replace(':code', code), { state: { result } });
      }
    } catch {
      setErrorMessage('Could not verify product. Please check your connection and try again.');
      setScanState('error');
    }
  }

  function handleScanSuccess(decodedText: string) {
    handleVerification(decodedText);
  }

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = manualCode.trim();
    if (trimmed) navigate(ROUTES.SCAN_CONFIRM, { state: { code: trimmed } });
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>&lsaquo;</button>
        <h1 style={styles.headerTitle}>Scan & Verify</h1>
      </div>

      <div style={styles.cameraSection}>
        {scanState === 'scanning' && (
          <div style={styles.camera}>
            <QrScanner
              onScanSuccess={handleScanSuccess}
              qrboxSize={250}
              fps={10}
            />
            {/* Corner brackets overlay */}
            <div style={{ ...styles.bracket, top: 20, left: 20, borderTop: '3px solid #3c7443', borderLeft: '3px solid #3c7443' }} />
            <div style={{ ...styles.bracket, top: 20, right: 20, borderTop: '3px solid #3c7443', borderRight: '3px solid #3c7443' }} />
            <div style={{ ...styles.bracket, bottom: 20, left: 20, borderBottom: '3px solid #3c7443', borderLeft: '3px solid #3c7443' }} />
            <div style={{ ...styles.bracket, bottom: 20, right: 20, borderBottom: '3px solid #3c7443', borderRight: '3px solid #3c7443' }} />
            <div style={styles.scanLine} />
          </div>
        )}

        {scanState === 'verifying' && (
          <div style={styles.statusContainer}>
            <div style={styles.spinner} />
            <p style={styles.statusText}>Verifying product...</p>
          </div>
        )}

        {scanState === 'error' && (
          <div style={styles.statusContainer}>
            <p style={styles.errorIcon}>!</p>
            <p style={styles.errorTitle}>Verification Failed</p>
            <p style={styles.errorText}>{errorMessage}</p>
            <button style={styles.retryBtn} onClick={() => setScanState('scanning')}>
              Try Again
            </button>
          </div>
        )}

        {scanState === 'manual-input' && (
          <div style={styles.statusContainer}>
            <p style={styles.manualTitle}>Enter NAFDAC Number</p>
            <p style={styles.manualHint}>Type the verification code printed on the product</p>
            <form onSubmit={handleManualSubmit} style={styles.manualForm}>
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="e.g. 2782864"
                style={styles.manualInput}
                autoFocus
              />
              <button type="submit" style={styles.manualSubmitBtn} disabled={!manualCode.trim()}>
                Verify
              </button>
            </form>
          </div>
        )}

        {scanState !== 'verifying' && (
          <p style={styles.cameraHint}>Point your camera at a barcode</p>
        )}
      </div>

      <div style={styles.bottom}>
        <p style={styles.orText}>or verify manually</p>
        {scanState === 'manual-input' ? (
          <button style={styles.manualBtn} onClick={() => { setScanState('scanning'); setManualCode(''); }}>
            Scan with Camera
          </button>
        ) : (
          <button style={styles.manualBtn} onClick={() => setScanState('manual-input')}>
            Enter NAFDAC Number
          </button>
        )}
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
    borderBottom: '1px solid #E5E7EB',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontSize: '26px',
    color: '#292d32',
    cursor: 'pointer',
    lineHeight: 1,
    padding: '0',
  },
  headerTitle: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#292d32',
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
    overflow: 'hidden',
  },
  bracket: {
    position: 'absolute',
    width: 40,
    height: 40,
    zIndex: 10,
  },
  scanLine: {
    position: 'absolute',
    width: '60%',
    height: '2px',
    background: '#3c7443',
    opacity: 0.9,
    zIndex: 10,
    top: '50%',
    left: '20%',
  },
  cameraHint: {
    fontSize: '13px',
    color: '#9CA3AF',
    marginTop: '16px',
    textAlign: 'center',
  },
  statusContainer: {
    width: '100%',
    height: '380px',
    background: '#0D0D0D',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '24px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #333333',
    borderTop: '3px solid #3c7443',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  statusText: {
    color: '#cccccc',
    fontSize: '14px',
  },
  errorIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#ce0000',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 700,
    margin: 0,
  },
  errorTitle: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 700,
    margin: 0,
  },
  errorText: {
    color: '#aaaaaa',
    fontSize: '13px',
    textAlign: 'center',
    maxWidth: '280px',
    margin: 0,
  },
  retryBtn: {
    marginTop: '8px',
    padding: '10px 24px',
    background: '#3c7443',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  manualTitle: {
    color: '#ffffff',
    fontSize: '17px',
    fontWeight: 700,
    margin: 0,
  },
  manualHint: {
    color: '#9CA3AF',
    fontSize: '13px',
    margin: 0,
  },
  manualForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    maxWidth: '280px',
  },
  manualInput: {
    width: '100%',
    padding: '14px 16px',
    background: '#1a1a1a',
    border: '1.5px solid #3c7443',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '16px',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
  },
  manualSubmitBtn: {
    width: '100%',
    padding: '14px',
    background: '#3c7443',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  bottom: {
    padding: '20px 24px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    borderTop: '1px solid #E5E7EB',
  },
  orText: {
    fontSize: '13px',
    color: '#9CA3AF',
    margin: 0,
  },
  manualBtn: {
    width: '100%',
    height: '52px',
    background: '#ffffff',
    color: '#3c7443',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    border: '1.5px solid #3c7443',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
