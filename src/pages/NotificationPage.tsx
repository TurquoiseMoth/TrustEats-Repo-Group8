import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Bell, AlertTriangle, Info } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../utils/mockData';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () => setNotifications(n => n.map(item => ({ ...item, read: true })));
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate(-1)}><ChevronLeft size={22} /></button>
        <h1 style={s.title}>Notification</h1>
      </div>

      {notifications.length === 0 ? (
        <div style={s.empty}>
          <Bell size={48} color="#ccc" />
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
                  {n.type === 'alert' ? <AlertTriangle size={18} color="#EF4444" /> : n.type === 'warning' ? <AlertTriangle size={18} color="#D97706" /> : <Info size={18} color="#3F7A46" />}
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
  page: { minHeight: '100vh', background: '#EEF2F5', fontFamily: "'Inter', sans-serif" },
  header: { display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 20px' },
  backBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#111' },
  title: { fontSize: '18px', fontWeight: 700, color: '#111' },
  empty: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '12px', padding: '80px 20px' },
  emptyText: { fontSize: '15px', color: '#aaa' },
  content: { padding: '0 16px 24px' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  countText: { fontSize: '13px', color: '#666' },
  markAll: { background: 'none', border: '1px solid #E0E0E0', borderRadius: '6px', padding: '6px 12px', fontSize: '13px', color: '#333', cursor: 'pointer' },
  list: { display: 'flex', flexDirection: 'column', gap: '8px' },
  item: { background: '#fff', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', border: '1px solid #E8EDE8' },
  unread: { background: '#F0F7F1', border: '1px solid #C2DEC6' },
  iconWrap: { width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  itemContent: { flex: 1 },
  itemTitle: { fontSize: '14px', fontWeight: 600, color: '#111', marginBottom: '3px' },
  itemMsg: { fontSize: '13px', color: '#555', lineHeight: 1.4, marginBottom: '4px' },
  itemTime: { fontSize: '12px', color: '#aaa' },
  dot: { width: '8px', height: '8px', borderRadius: '50%', background: '#3F7A46', flexShrink: 0, marginTop: '4px' },
};
