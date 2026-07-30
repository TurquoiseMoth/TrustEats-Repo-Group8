import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../constants';
import { useAuth } from '../contexts/AuthContext';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');

    if (!form.fullName.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register({ name: form.fullName, email: form.email, password: form.password });
      navigate(ROUTES.VERIFY_EMAIL, { state: { email: form.email } });
    } catch (err) {
      setError((err as { message?: string })?.message ?? 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.phone}>
      <img src="/assets/Deco.svg" alt="" style={styles.archImg} />

      <div style={styles.logoWrap}>
        <img src="/assets/trusteats-logo.png" alt="TrustEats" className="h-8 w-auto" />
      </div>

      <div style={styles.content}>
        <h1 style={styles.heading}>Create your Account</h1>

        {error && <div style={styles.errorBox}>{error}</div>}

        <div style={styles.form}>
          <Field label="Full name">
            <input
              name="fullName"
              type="text"
              placeholder="Input details"
              value={form.fullName}
              onChange={handleChange}
              style={styles.input}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </Field>

          <Field label="Password">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              disabled={isSubmitting}
            />
          </Field>
          <p style={styles.hint}>Not less than 8 characters</p>

          <Field label="Confirm Password">
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              disabled={isSubmitting}
            />
          </Field>

          <button style={styles.btnPrimary} onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Sign Up'}
          </button>

          <div style={styles.orDivider}>
            <span style={styles.orLine} />
            <span style={styles.orText}>Or</span>
            <span style={styles.orLine} />
          </div>

          <button style={styles.btnSocial}>
            <GoogleIcon /> Sign up with Google
          </button>
          <button style={styles.btnSocial}>
            <AppleIcon /> Sign up with Apple
          </button>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M23.766 12.276c0-.815-.066-1.635-.207-2.438H12.24v4.621h6.482a5.554 5.554 0 01-2.399 3.647v3.028h3.886c2.272-2.092 3.557-5.177 3.557-8.858z" fill="#4285F4" />
      <path d="M12.24 24c3.236 0 5.966-1.062 7.955-2.886l-3.886-3.028c-1.078.722-2.46 1.146-4.069 1.146-3.13 0-5.782-2.112-6.73-4.951H1.517v3.15C3.507 21.3 7.544 24 12.24 24z" fill="#34A853" />
      <path d="M5.51 14.291a7.24 7.24 0 010-4.582V6.559H1.517a12.236 12.236 0 000 10.882l3.993-3.15z" fill="#FBBC05" />
      <path d="M12.24 4.75c1.771 0 3.36.625 4.613 1.83l3.424-3.426C18.197 1.19 15.468 0 12.24 0 7.544 0 3.507 2.7 1.517 6.56l3.993 3.15C6.458 6.862 9.11 4.75 12.24 4.75z" fill="#EA4335" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17.569 12.625c-.028-3.023 2.464-4.474 2.574-4.544-1.403-2.05-3.582-2.33-4.35-2.357-1.837-.184-3.607 1.088-4.545 1.088-.95 0-2.395-1.062-3.943-1.034-2.02.028-3.893 1.181-4.932 2.988C1.263 11.55.968 15.259 2.718 18a4.27 4.27 0 003.265 1.786c1.312.024 2.234-.922 3.49-.922 1.241 0 2.8 1.118 4.568 1.014a5.055 5.055 0 003.749-2.003c1.18-1.732 1.662-3.398 1.69-3.483-.037-.015-3.184-1.252-3.21-4.768zM14.955 5.18A4.594 4.594 0 0016.02 2c-.821.033-1.82.548-2.409 1.239a4.22 4.22 0 00-1.143 2.829 3.735 3.735 0 001.295-.413c.382-.2.9-.543 1.192-.475z" fill="currentColor" />
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
    padding: '16px 20px 48px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  heading: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#292d32',
    textAlign: 'center',
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
  hint: {
    fontSize: '13px',
    color: '#444',
    marginTop: '-12px',
    marginBottom: '18px',
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
  orDivider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '20px 0',
  },
  orLine: {
    flex: 1,
    height: '1px',
    background: '#9A9A9A',
  },
  orText: {
    fontSize: '14px',
    color: '#9A9A9A',
  },
  btnSocial: {
    width: '100%',
    height: '52px',
    background: '#fff',
    color: '#292d32',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    border: '1px solid #9A9A9A',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
};
