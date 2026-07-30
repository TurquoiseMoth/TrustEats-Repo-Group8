import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from '../constants';
import { useAuth } from '../contexts/AuthContext';

export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setError((err as { message?: string })?.message ?? 'Sign in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.phone}>
      <img src="/assets/Deco.svg" alt="" style={styles.archImg} />
      <div style={styles.content}>
        <h1 style={styles.heading}>Sign In</h1>
        <p style={styles.welcomeBold}>Welcome!</p>
        <p style={styles.subtitle}>Sign in to continue to your account</p>

        {error && <div style={styles.errorBox}>{error}</div>}

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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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

          <button style={styles.btnPrimary} onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Log In'}
          </button>

          <Link to={ROUTES.REGISTER} style={isSubmitting ? { ...styles.btnSecondary, pointerEvents: 'none', opacity: 0.5 } : styles.btnSecondary}>
            Sign Up
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
  welcomeBold: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#292d32',
    marginBottom: '2px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#444',
    marginBottom: '24px',
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '16px',
    fontWeight: 500,
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
    color: '#292d32',
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
    color: '#292d32',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  checkLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#292d32',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: '#3c7443',
    cursor: 'pointer',
  },
  forgotLink: {
    fontSize: '14px',
    color: '#3c7443',
    textDecoration: 'none',
    fontWeight: 500,
  },
  btnPrimary: {
    width: '100%',
    height: '52px',
    background: '#3c7443',
    color: '#fff',
    fontSize: '17px',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondary: {
    width: '100%',
    height: '52px',
    background: 'transparent',
    color: '#3c7443',
    fontSize: '17px',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    border: '1.5px solid #3c7443',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    boxSizing: 'border-box',
  },
};
