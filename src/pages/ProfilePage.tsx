import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../constants';

export default function ProfilePage() {
  const navigate = useNavigate();

  const [toggles, setToggles] = useState({
    productAlert: true,
    promotions: true,
    darkMode: true,
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>‹</button>
        <h1 style={styles.headerTitle}>Profile</h1>
      </div>

      {/* Avatar */}
      <div style={styles.avatarSection}>
        <div style={styles.avatarWrap}>
          <div style={styles.avatar}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#3F7A46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#3F7A46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={styles.editBadge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <p style={styles.avatarName}>Louis Raymond Chinwuba</p>
        <p style={styles.avatarEmail}>Louis44Chinwuba@gmail.com</p>
      </div>

      <div style={styles.content}>

        {/* Account & Security */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Account & Security</p>
          <AccountRow label="Full Name" value="Louis Raymond Chinwuba" />
          <AccountRow label="Email" value="Louis44Chinwuba@gmail.com" />
          <AccountRow label="Gender" value="Male" />
          <AccountRow label="Location" value="Enugu North" />
          <AccountRow label="Password" value="Enugu North" last />
        </div>

        {/* Notification and Preference */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Notification and Preference</p>

          <NotifRow
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#3F7A46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#3F7A46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            label="Product Alert"
            sub="Get notification on product rebranding, recall and safety alerts."
            value={toggles.productAlert}
            onToggle={() => toggle('productAlert')}
          />

          <NotifRow
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20 12V22H4V12" stroke="#3F7A46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 7H2V12H22V7Z" stroke="#3F7A46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22V7" stroke="#3F7A46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke="#3F7A46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke="#3F7A46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            label="Promotions and Tips"
            sub="Receive tips on food safety and app update."
            value={toggles.promotions}
            onToggle={() => toggle('promotions')}
          />

          <NotifRow
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="#3F7A46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            label="Light & Dark mood"
            sub="Light mood on"
            value={toggles.darkMode}
            onToggle={() => toggle('darkMode')}
            last
          />
        </div>

        {/* Log Out */}
        <button style={styles.logoutBtn} onClick={() => navigate(ROUTES.LOGIN)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17L21 12L16 7" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12H9" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Log Out
        </button>

      </div>
    </div>
  );
}

function AccountRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div style={{ ...styles.accountRow, ...(!last ? { borderBottom: '1px solid #F0F0F0' } : {}) }}>
      <div>
        <p style={styles.accountLabel}>{label}</p>
        <p style={styles.accountValue}>{value}</p>
      </div>
      <button style={styles.editBtn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#3F7A46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="#3F7A46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

function NotifRow({
  icon, label, sub, value, onToggle, last
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  value: boolean;
  onToggle: () => void;
  last?: boolean;
}) {
  return (
    <div style={{ ...styles.notifRow, ...(!last ? { borderBottom: '1px solid #F0F0F0' } : {}) }}>
      <div style={styles.notifIcon}>{icon}</div>
      <div style={styles.notifText}>
        <p style={styles.notifLabel}>{label}</p>
        <p style={styles.notifSub}>{sub}</p>
      </div>
      <button
        onClick={onToggle}
        style={{
          ...styles.toggle,
          background: value ? '#3F7A46' : '#D0D0D0',
        }}
      >
        <div style={{
          ...styles.toggleThumb,
          transform: value ? 'translateX(20px)' : 'translateX(2px)',
        }} />
      </button>
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
    paddingBottom: '40px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 20px 8px',
    background: '#EEF2F5',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontSize: '26px',
    color: '#111',
    cursor: 'pointer',
    lineHeight: 1,
    padding: '0',
  },
  headerTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#111',
  },
  avatarSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px 20px 24px',
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: '12px',
  },
  avatar: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: '#D8EAD8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    background: '#3F7A46',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #EEF2F5',
  },
  avatarName: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#111',
    margin: '0 0 4px',
  },
  avatarEmail: {
    fontSize: '13px',
    color: '#666',
    margin: 0,
  },
  content: {
    padding: '0 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #E8EDE8',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#111',
    margin: '0 0 12px',
    paddingBottom: '10px',
    borderBottom: '1px solid #F0F0F0',
  },
  accountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
  },
  accountLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#111',
    margin: '0 0 2px',
  },
  accountValue: {
    fontSize: '12px',
    color: '#666',
    margin: 0,
  },
  editBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  notifRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
  },
  notifIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    background: '#EAF4EC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  notifText: {
    flex: 1,
  },
  notifLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#111',
    margin: '0 0 2px',
  },
  notifSub: {
    fontSize: '11px',
    color: '#888',
    margin: 0,
    lineHeight: 1.4,
  },
  toggle: {
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    flexShrink: 0,
    transition: 'background 0.2s',
    padding: 0,
  },
  toggleThumb: {
    position: 'absolute',
    top: '3px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: '#ffffff',
    transition: 'transform 0.2s',
  },
  logoutBtn: {
    width: '100%',
    height: '52px',
    background: '#ffffff',
    color: '#E53935',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    border: '1.5px solid #E53935',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
};