import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from '../constants';
import { authService } from '../services/auth';
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError("");
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch {
      setError("Failed to send reset link. Check the email address.");
    }
  };

  if (sent) {
    return (
      <div style={styles.phone}>
        <img src="/assets/Deco.svg" alt="" style={styles.archImg} />
        <div style={styles.logoWrap}>
          <img src="/assets/trusteats-logo.png" alt="TrustEats" className="h-8 w-auto" />
        </div>
        <div style={styles.content}>
          <h1 style={styles.heading}>Check Your Email</h1>
          <p style={styles.subtitle}>We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.</p>
          <button style={styles.btnPrimary} onClick={() => navigate(ROUTES.LOGIN)}>Back to Sign In</button>
        </div>
      </div>
    );
  }

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
        <img src="/assets/trusteats-logo.png" alt="TrustEats" className="h-8 w-auto" />
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

          {error && <p style={{ color: '#ce0000', fontSize: '14px', marginBottom: '12px' }}>{error}</p>}
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
    background: '#f0f8ff',
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
    color: '#3c7443',
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
    color: '#292d32',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#444444',
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
    color: '#292d32',
    marginBottom: '6px',
  },
  input: {
    height: '52px',
    background: '#ffffff',
    border: '1px solid #9CA3AF',
    borderRadius: '8px',
    padding: '0 16px',
    fontSize: '15px',
    fontFamily: "'Inter', sans-serif",
    color: '#292d32',
    outline: 'none',
    width: '100%',
  },
  btnPrimary: {
    width: '100%',
    height: '52px',
    background: '#3c7443',
    color: '#ffffff',
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
    color: '#3c7443',
    textDecoration: 'none',
    fontWeight: 600,
    textAlign: 'center',
  },
};
