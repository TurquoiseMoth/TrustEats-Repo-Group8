import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Bell, AlertTriangle, Info } from 'lucide-react';

const PLACEHOLDER_NOTIFICATIONS = [
  { id: '1', type: 'info' as const, title: 'Welcome to TrustEats', message: 'Start scanning products to verify their authenticity.', createdAt: 'Just now', read: false },
  { id: '2', type: 'warning' as const, title: 'Stay Safe', message: 'Always check the NAFDAC number before purchasing packaged foods.', createdAt: '1 day ago', read: false },
  { id: '3', type: 'alert' as const, title: 'Report Counterfeits', message: 'Found a suspicious product? Use the Report feature to alert authorities.', createdAt: '3 days ago', read: true },
];

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(PLACEHOLDER_NOTIFICATIONS);

  const markAllRead = () => setNotifications(n => n.map(item => ({ ...item, read: true })));
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}><ChevronLeft size={22} /></button>
        <h1 style={s.title}>Consumer Notifications</h1>
      </div>

      {notifications.length === 0 ? (
        <div style={s.empty}>
          <Bell size={48} color="#cccccc" />
          <p style={s.emptyText}>No notifications yet</p>
        </div>
      ) : (
        <div style={s.content}>
          <div style={s.topRow}>
            <span style={s.countText}>{unreadCount} unread</span>
            {unreadCount > 0 && (
              <button style={s.markAll} onClick={markAllRead}>Mark all as read</button>
            )}
          </div>
          <div style={s.list}>
            {notifications.map(n => (
              <div key={n.id} style={{ ...s.item, ...(!n.read ? s.unread : {}) }}
                onClick={() => setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item))}>
                <div style={{ ...s.iconWrap, background: n.type === 'alert' ? '#FEE2E2' : n.type === 'warning' ? '#FEF3C7' : '#EAF4EC' }}>
                  {n.type === 'alert' ? <AlertTriangle size={18} color="#EF4444" /> : n.type === 'warning' ? <AlertTriangle size={18} color="#D97706" /> : <Info size={18} color="#3c7443" />}
                </div>
                <div style={s.itemContent}>
                  <p style={s.itemTitle}>{n.title}</p>
                  <p style={s.itemMsg}>{n.message}</p>
                  <p style={s.itemTime}>{n.createdAt}</p>
                </div>
                {!n.read && <div style={s.dot} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  page: { minHeight: '100vh',     background: '#f0f8ff', fontFamily: "'Inter', sans-serif" },
  header: { display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 20px' },
  backBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#292d32' },
  title: { fontSize: '18px', fontWeight: 700, color: '#292d32' },
  empty: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '12px', padding: '80px 20px' },
  emptyText: { fontSize: '15px', color: '#aaaaaa' },
  content: { padding: '0 16px 24px' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  countText: { fontSize: '13px', color: '#6B7280' },
  markAll: { background: 'none', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '6px 12px', fontSize: '13px', color: '#333333', cursor: 'pointer' },
  list: { display: 'flex', flexDirection: 'column', gap: '8px' },
  item: { background: '#ffffff', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', border: '1px solid #E8EDE8' },
  unread: { background: '#f0f8ff', border: '1px solid #C2DEC6' },
  iconWrap: { width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  itemContent: { flex: 1 },
  itemTitle: { fontSize: '14px', fontWeight: 600, color: '#292d32', marginBottom: '3px' },
  itemMsg: { fontSize: '13px', color: '#555555', lineHeight: 1.4, marginBottom: '4px' },
  itemTime: { fontSize: '12px', color: '#aaaaaa' },
  dot: { width: '8px', height: '8px', borderRadius: '50%', background: '#3c7443', flexShrink: 0, marginTop: '4px' },
};
