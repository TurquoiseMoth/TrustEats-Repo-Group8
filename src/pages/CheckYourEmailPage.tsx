import { Link } from 'react-router';
import { ROUTES } from '../constants';
import { BackButton } from '../components/ui/BackButton';
import { useMediaQuery } from '../hooks/useMediaQuery';
import logo from '../assets/logo.png';
export default function CheckYourEmailPage() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <div style={styles.phone}>

      {/* Top decoration image */}
      <div style={styles.backWrap}>
        <BackButton />
      </div>
      <img
        src="/assets/Deco.svg"
        alt=""
        style={styles.archImg}
      />

      {/* Logo */}
      <div style={{ ...styles.logoWrap, ...(isDesktop ? { marginTop: '24px' } : {}) }}>
        <img src={logo} alt="TrustEats" className="h-8 w-auto" />
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Hero illustration */}
        <div style={styles.illustrationWrap}>
          <img
            src="/assets/email.svg"
            alt="Email sent"
            style={styles.illustration}
          />
        </div>

        <h1 style={styles.heading}>Check Your Email</h1>
        <p style={styles.body}>
          We've sent a password reset link to your email address.
        </p>
        <p style={styles.body}>
          Please check your inbox and follow the instructions.
        </p>

        <div style={styles.actions}>
          <button style={styles.btnPrimary} onClick={() => window.open('mailto:', '_self')}>
            Open Email App
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
    position: 'relative',
  },
  backWrap: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    zIndex: 4,
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
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '-10px',
    zIndex: 2,
    position: 'relative',
  },
  content: {
    padding: '16px 20px 48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  illustrationWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  illustration: {
    width: '160px',
    height: 'auto',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#292d32',
    textAlign: 'center',
    marginBottom: '12px',
  },
  body: {
    fontSize: '14px',
    color: '#444444',
    textAlign: 'center',
    lineHeight: '1.5',
    marginBottom: '4px',
  },
  actions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '32px',
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
