import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from '../constants';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function ManufacturerLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(ROUTES.MANUFACTURER_DASHBOARD);
  };

  return (
    <div style={isDesktop ? desktopStyles.page : styles.page}>
      {/* Full-width header banner */}
      <div style={isDesktop ? desktopStyles.headerBanner : styles.headerBanner}>
        <img
          src="/assets/Deco.svg"
          alt=""
          style={isDesktop ? desktopStyles.headerImg : styles.headerImg}
        />
      </div>

      {/* Centered white card */}
      <div style={isDesktop ? desktopStyles.cardWrapper : styles.cardWrapper}>
        <div style={isDesktop ? desktopStyles.card : styles.card}>
          <h1 style={isDesktop ? desktopStyles.heading : styles.heading}>Sign In</h1>
          <p style={isDesktop ? desktopStyles.welcome : styles.welcome}>Welcome!</p>
          <p style={isDesktop ? desktopStyles.subtitle : styles.subtitle}>Sign in to continue to your account</p>

          <div style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                name="email"
                type="email"
                placeholder="Input details"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.row}>
              <label style={styles.checkLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  style={styles.checkbox}
                />
                Remember me
              </label>
              <Link to={ROUTES.FORGOT_PASSWORD} style={styles.forgotLink}>Forget Password?</Link>
            </div>

            <button style={styles.btnPrimary} onClick={handleSubmit}>
              Log In
            </button>

            <Link to={ROUTES.MANUFACTURER_SIGNUP} style={styles.btnSecondary}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    height: '100vh',
    background: '#EEF2F5',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
  },
  headerBanner: {
    width: '100%',
    flexShrink: 0,
    overflow: 'hidden',
    lineHeight: 0,
    maxHeight: '120px',
  },
  headerImg: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    display: 'block',
  },
  cardWrapper: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px 16px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: '32px 36px',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111',
    marginBottom: '2px',
  },
  welcome: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#111',
    marginBottom: '2px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#444',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '14px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111',
    marginBottom: '5px',
  },
  input: {
    height: '44px',
    background: '#fff',
    border: '1px solid #9A9A9A',
    borderRadius: '8px',
    padding: '0 14px',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    color: '#111',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
  },
  checkLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#111',
    cursor: 'pointer',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    accentColor: '#3F7A46',
    cursor: 'pointer',
  },
  forgotLink: {
    fontSize: '13px',
    color: '#E8721C',
    textDecoration: 'none',
    fontWeight: 500,
  },
  btnPrimary: {
    width: '100%',
    height: '46px',
    background: '#3F7A46',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondary: {
    width: '100%',
    height: '46px',
    background: 'transparent',
    color: '#3F7A46',
    fontSize: '16px',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    border: '1.5px solid #3F7A46',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    boxSizing: 'border-box',
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
    overflow: 'auto',
  },
  headerBanner: {
    width: '100%',
    flexShrink: 0,
    overflow: 'hidden',
    lineHeight: 0,
    maxHeight: '180px',
  },
  headerImg: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    display: 'block',
  },
  cardWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: '520px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 24px',
  },
  card: {
    width: '100%',
    maxWidth: '460px',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: '40px 44px',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#111',
    marginBottom: '4px',
  },
  welcome: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#111',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#444',
    marginBottom: '28px',
  },
};
