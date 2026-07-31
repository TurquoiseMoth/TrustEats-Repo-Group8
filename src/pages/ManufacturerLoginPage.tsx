import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { ROUTES } from '../constants';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useAuth } from '../contexts/AuthContext';
import { BackButton } from '../components/ui/BackButton';

export default function ManufacturerLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const isDesktop = useMediaQuery('(min-width: 768px)');
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
      navigate(ROUTES.MANUFACTURER_DASHBOARD);
    } catch (err) {
      setError((err as { message?: string })?.message ?? 'Sign in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const s = isDesktop ? desktopStyles : styles;

  return (
    <div style={s.page}>
      <div style={s.backWrap}>
        <BackButton />
      </div>
      <img src="/assets/Deco.svg" alt="" style={s.archImg} />

      <div style={s.content}>
        <div style={s.card}>
          <h1 style={s.heading}>Sign In</h1>
          <p style={s.welcomeBold}>Welcome!</p>
          <p style={s.subtitle}>Sign in to continue to your account</p>

          {error && <div style={s.errorBox}>{error}</div>}

          <div style={s.form}>
            <div style={s.field}>
              <label style={s.label}>Email</label>
              <input
                name="email"
                type="email"
                placeholder="Input details"
                value={form.email}
                onChange={handleChange}
                style={s.input}
                disabled={isSubmitting}
              />
            </div>

            <div style={s.field}>
              <label style={s.label}>Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                style={s.input}
                disabled={isSubmitting}
              />
            </div>

            <div style={s.row}>
              <label style={s.checkLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  style={s.checkbox}
                />
                Remember me
              </label>
              <Link to={ROUTES.FORGOT_PASSWORD} style={s.forgotLink}>Forget Password?</Link>
            </div>

            <button style={s.btnPrimary} onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Log In'}
            </button>

            <Link to={ROUTES.MANUFACTURER_SIGNUP} style={s.btnSecondary}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const baseStyles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#f0f8ff',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  backWrap: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    zIndex: 3,
  },
  archImg: {
    width: '100%',
    height: 'auto',
    maxHeight: '180px',
    objectFit: 'cover',
    display: 'block',
    marginTop: '-40px',
    flexShrink: 0,
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
    color: '#444444',
    marginBottom: '24px',
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    color: '#ce0000',
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
    background: '#ffffff',
    border: '1px solid #9CA3AF',
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
    accentColor: '#eb9134',
    cursor: 'pointer',
  },
  forgotLink: {
    fontSize: '14px',
    color: '#eb9134',
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

const styles: Record<string, React.CSSProperties> = { ...baseStyles, card: {} };

const desktopStyles: Record<string, React.CSSProperties> = {
  ...baseStyles,
  page: {
    ...baseStyles.page,
    alignItems: 'center',
  },
  archImg: {
    ...baseStyles.archImg,
    maxHeight: '220px',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 20px 60px',
    width: '100%',
    maxWidth: '480px',
  },
  card: {
    width: '100%',
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #E5E7EB',
    padding: '40px 36px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
  },
  heading: {
    ...baseStyles.heading,
    fontSize: '28px',
  },
  subtitle: {
    ...baseStyles.subtitle,
    marginBottom: '32px',
  },
};


