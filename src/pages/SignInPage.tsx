import { useState } from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../constants';

export default function SignInPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(form, rememberMe);
  };

  return (
    <div style={styles.phone}>

      {/* Top decoration image */}
      <img
        src="/assets/Deco.svg"
        alt=""
        style={styles.archImg}
      />

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.heading}>Sign In</h1>
        <p style={styles.welcomeBold}>Welcome!</p>
        <p style={styles.subtitle}>Sign in to continue to your account</p>

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

          <Link to={ROUTES.REGISTER} style={styles.btnSecondary}>
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
    color: '#111',
    marginBottom: '4px',
  },
  welcomeBold: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#111',
    marginBottom: '2px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#444',
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
    color: '#111',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: '#3F7A46',
    cursor: 'pointer',
  },
  forgotLink: {
    fontSize: '14px',
    color: '#3F7A46',
    textDecoration: 'none',
    fontWeight: 500,
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
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondary: {
    width: '100%',
    height: '52px',
    background: 'transparent',
    color: '#3F7A46',
    fontSize: '17px',
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