import { useState, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function ManufacturerSignUpPage() {
  const [form, setForm] = useState({
    companyName: '',
    napamsEmail: '',
    cacNumber: '',
    nafdacCorNo: '',
  });
  const [corFile, setCorFile] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCorFile(file);
  };

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Manufacturer signup:', { ...form, corFile, agreed });
  };

  return (
    <div style={isDesktop ? desktopStyles.page : styles.page}>

      {/* Top decoration image */}
      <img
        src="/assets/Deco.svg"
        alt=""
        style={isDesktop ? desktopStyles.archImg : styles.archImg}
      />

      {/* Logo */}
      <div style={isDesktop ? desktopStyles.logoWrap : styles.logoWrap}>
        <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
          <path
            d="M12 2L2 7V13C2 19.63 6.35 25.78 12 27C17.65 25.78 22 19.63 22 13V7L12 2Z"
            fill="#3F7A46"
          />
          <path
            d="M9 14L11 16L15 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span style={isDesktop ? desktopStyles.logoText : styles.logoText}>TrustEats</span>
      </div>

      {/* Content */}
      <div style={isDesktop ? desktopStyles.content : styles.content}>
        <h1 style={isDesktop ? desktopStyles.heading : styles.heading}>Create Company Account</h1>
        <p style={isDesktop ? desktopStyles.subtitle : styles.subtitle}>Register your business on TrustEat</p>

        <div style={isDesktop ? desktopStyles.form : styles.form}>
          <div style={isDesktop ? desktopStyles.row2Col : undefined}>
            <Field label="Company Name" desktop={isDesktop}>
              <input
                name="companyName"
                type="text"
                placeholder="e.g. Colgate Inc"
                value={form.companyName}
                onChange={handleChange}
                style={styles.input}
              />
            </Field>

            <Field label="NAPAMS Registered Email" desktop={isDesktop}>
              <input
                name="napamsEmail"
                type="email"
                placeholder="e.g. info@colgateinc.com"
                value={form.napamsEmail}
                onChange={handleChange}
                style={styles.input}
              />
            </Field>
          </div>

          <div style={isDesktop ? desktopStyles.row2Col : undefined}>
            <Field label="CAC Number" desktop={isDesktop}>
              <input
                name="cacNumber"
                type="text"
                placeholder="Enter CAC Number"
                value={form.cacNumber}
                onChange={handleChange}
                style={styles.input}
              />
            </Field>

            <Field label="NAFDAC C of R NO." desktop={isDesktop}>
              <input
                name="nafdacCorNo"
                type="text"
                placeholder="Enter NAFDAC C of R Number"
                value={form.nafdacCorNo}
                onChange={handleChange}
                style={styles.input}
              />
            </Field>
          </div>

          {/* File upload dropzone */}
          <Field label="Upload C of R" desktop={isDesktop}>
            <div style={styles.dropzone} onClick={handleDropzoneClick}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9A9A9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span style={styles.dropzoneText}>
                {corFile ? corFile.name : 'Tap to upload Certificate of Recognition image'}
              </span>
            </div>
          </Field>

          {/* Terms checkbox */}
          <label style={styles.checkLabel}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              style={styles.checkbox}
            />
            <span>
              I Agree to the{' '}
              <span style={styles.termsLink}>Terms & Conditions</span>
            </span>
          </label>

          <button style={styles.btnPrimary} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  desktop,
}: {
  label: string;
  children: React.ReactNode;
  desktop?: boolean;
}) {
  return (
    <div style={desktop ? desktopStyles.field : styles.field}>
      <label style={desktop ? desktopStyles.label : styles.label}>{label}</label>
      {children}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#EEF2F5',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  archImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
    marginTop: '-40px',
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '-10px',
    zIndex: 2,
    position: 'relative',
  },
  logoText: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#3F7A46',
  },
  content: {
    padding: '16px 20px 48px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  heading: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111',
    textAlign: 'center',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#444',
    textAlign: 'center',
    marginBottom: '24px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '18px',
  },
  label: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#111',
    marginBottom: '6px',
  },
  input: {
    height: '52px',
    background: '#fff',
    border: '1px solid #9A9A9A',
    borderRadius: '8px',
    padding: '0 16px',
    fontSize: '15px',
    fontFamily: "'Inter', sans-serif",
    color: '#111',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  dropzone: {
    width: '100%',
    minHeight: '120px',
    background: '#fff',
    border: '2px dashed #9A9A9A',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '20px 16px',
    boxSizing: 'border-box',
  },
  dropzoneText: {
    fontSize: '14px',
    color: '#9A9A9A',
    textAlign: 'center',
  },
  checkLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#111',
    cursor: 'pointer',
    marginBottom: '24px',
    marginTop: '4px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: '#3F7A46',
    cursor: 'pointer',
    flexShrink: 0,
  },
  termsLink: {
    color: '#3F7A46',
    fontWeight: 600,
    textDecoration: 'underline',
  },
  btnPrimary: {
    width: '100%',
    height: '52px',
    background: '#3F7A46',
    color: '#fff',
    fontSize: '17px',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const desktopStyles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#EEF2F5',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  archImg: {
    width: '100%',
    maxWidth: '720px',
    height: 'auto',
    display: 'block',
    marginTop: '-40px',
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '-10px',
    zIndex: 2,
    position: 'relative',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#3F7A46',
  },
  content: {
    padding: '24px 24px 60px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    maxWidth: '640px',
  },
  heading: {
    fontSize: '30px',
    fontWeight: 700,
    color: '#111',
    textAlign: 'center',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#444',
    textAlign: 'center',
    marginBottom: '32px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  row2Col: {
    display: 'flex',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '18px',
    flex: 1,
  },
  label: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#111',
    marginBottom: '6px',
  },
};
