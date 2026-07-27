import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../constants';

export default function VerifyPage() {
  const navigate = useNavigate();
  const [nafdac, setNafdac] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (!nafdac.trim()) {
      setError('Please enter a NAFDAC number');
      return;
    }
    setError('');
    navigate(ROUTES.RESULT.replace(':code', nafdac));
  };

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>‹</button>
        <h1 style={styles.headerTitle}>Scan & Verify</h1>
      </div>

      <div style={styles.camera}>
        <div style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderTop: '3px solid #3F7A46', borderLeft: '3px solid #3F7A46' }} />
        <div style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderTop: '3px solid #3F7A46', borderRight: '3px solid #3F7A46' }} />
        <div style={{ position: 'absolute', bottom: 20, left: 20, width: 40, height: 40, borderBottom: '3px solid #3F7A46', borderLeft: '3px solid #3F7A46' }} />
        <div style={{ position: 'absolute', bottom: 20, right: 20, width: 40, height: 40, borderBottom: '3px solid #3F7A46', borderRight: '3px solid #3F7A46' }} />
        <div style={styles.scanLine} />
      </div>

      <div style={styles.form}>
        <h2 style={styles.formTitle}>Verify with NAFDAC Number</h2>
        <p style={styles.formSubtitle}>Enter the product details below to verify authenticity</p>

        <div style={styles.field}>
          <label style={styles.label}>
            NAFDAC Number <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 2782864"
            value={nafdac}
            onChange={e => { setNafdac(e.target.value); setError(''); }}
            style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
          />
          {error && <span style={styles.errorText}>{error}</span>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>
            Company name / Brand <span style={styles.optional}>(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Gino"
            value={company}
            onChange={e => setCompany(e.target.value)}
            style={styles.input}
          />
        </div>

        <button style={styles.btnPrimary} onClick={handleVerify}>
          Verify Product
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
  camera: {
    width: '100%',
    height: '240px',
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
  form: {
    padding: '24px 20px 40px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  formTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#111',
    marginBottom: '6px',
  },
  formSubtitle: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '24px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '18px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111',
    marginBottom: '6px',
  },
  required: {
    color: '#E53935',
  },
  optional: {
    color: '#888',
    fontWeight: 400,
    fontSize: '12px',
  },
  input: {
    height: '52px',
    background: '#F9F9F9',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '0 16px',
    fontSize: '15px',
    fontFamily: "'Inter', sans-serif",
    color: '#111',
    outline: 'none',
    width: '100%',
  },
  inputError: {
    border: '1px solid #E53935',
  },
  errorText: {
    fontSize: '12px',
    color: '#E53935',
    marginTop: '5px',
  },
  btnPrimary: {
    width: '100%',
    height: '52px',
    background: '#3F7A46',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '8px',
  },
};