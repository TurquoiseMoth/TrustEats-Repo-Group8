import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from '../constants';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(ROUTES.CHECK_YOUR_EMAIL);
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
        <span style={styles.logoText}>TrustEats</span>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.heading}>Forgot Password</h1>
        <p style={styles.subtitle}>
          <strong>No worries!</strong> Enter your email address and we'll send you a link to reset your password.
        </p>

        <div style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <button style={styles.btnPrimary} onClick={handleSubmit}>
            Send Your Reset Link
          </button>

          <Link to={ROUTES.LOGIN} style={styles.backLink}>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
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
    padding: '24px 20px 48px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  heading: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#444',
    marginBottom: '24px',
    lineHeight: '1.5',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '24px',
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
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backLink: {
    fontSize: '15px',
    color: '#3F7A46',
    textDecoration: 'none',
    fontWeight: 600,
    textAlign: 'center',
  },
};
