import { useState } from 'react';
import type { SignUpFormData } from '../types/auth';

export default function SignUpPage() {
  const [form, setForm] = useState<SignUpFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div style={styles.phone}>

      {/* Top decoration image */}
      <img
        src="/assets/Deco.svg"
        alt=""
        style={styles.archImg}
      />

      {/* Logo */}
      <div style={styles.logoWrap}>
        <div style={styles.logoCircle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.heading}>Create your Account</h1>
        <p style={styles.subtitle}>Join TrustEat as a consumer</p>

        <div style={styles.form}>
          <Field label="Full name">
            <input
              name="fullName"
              type="text"
              placeholder="Input details"
              value={form.fullName}
              onChange={handleChange}
              style={styles.input}
            />
          </Field>

          <Field label="Email">
            <input
              name="email"
              type="email"
              placeholder="Input details"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
          </Field>

          <Field label="Password" helper="Not less than 8 characters">
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />
          </Field>

          <Field label="Confirm Password">
            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
          </Field>

          <button style={styles.btnPrimary} onClick={handleSubmit}>
            Sign Up
          </button>
        </div>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>Or</span>
          <div style={styles.dividerLine} />
        </div>

        <div style={styles.socialRow}>
          <button style={styles.btnSocial}>
            <GoogleIcon />
            Google
          </button>
          <button style={styles.btnSocial}>
            <AppleIcon />
            Apple
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  helper,
  children,
}: {
  label: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {children}
      {helper && <span style={styles.helper}>{helper}</span>}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908C16.658 14.253 17.64 11.945 17.64 9.2z" fill="#3F7A46"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#3F7A46"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#3F7A46"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#3F7A46"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg" fill="#3F7A46">
      <path d="M13.23 9.54c-.02-2.17 1.77-3.22 1.85-3.27-1.01-1.48-2.58-1.68-3.14-1.7-1.34-.14-2.61.79-3.29.79-.68 0-1.73-.77-2.85-.75-1.46.02-2.81.85-3.56 2.16-1.52 2.64-.39 6.55 1.09 8.69.72 1.05 1.58 2.22 2.71 2.18 1.09-.04 1.5-.7 2.82-.7 1.31 0 1.68.7 2.83.68 1.17-.02 1.91-1.07 2.63-2.12.83-1.22 1.17-2.4 1.19-2.46-.03-.01-2.28-.87-2.28-3.5zm-2.13-6.43c.6-.73 1-1.74.89-2.75-.86.04-1.9.57-2.51 1.29-.55.64-1.04 1.66-.91 2.64.96.07 1.94-.49 2.53-1.18z"/>
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  phone: {
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
    justifyContent: 'center',
    marginTop: '-28px',
    zIndex: 2,
    position: 'relative',
  },
  logoCircle: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(145deg, #3F7A46, #2E6B3E)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid #EEF2F5',
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
  },
  helper: {
    fontSize: '12px',
    color: '#777',
    marginTop: '6px',
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
    marginTop: '6px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    margin: '20px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#C4C4C4',
  },
  dividerText: {
    fontSize: '14px',
    color: '#666',
  },
  socialRow: {
    display: 'flex',
    gap: '12px',
    width: '100%',
  },
  btnSocial: {
    flex: 1,
    height: '48px',
    background: '#fff',
    border: '1.5px solid #3F7A46',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#3F7A46',
    fontFamily: "'Inter', sans-serif",
    cursor: 'pointer',
  },
};