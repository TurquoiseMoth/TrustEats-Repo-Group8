import { useEffect, useState } from "react";
import { DEFAULT_UNREAD_COUNT } from "../constants/notifications";

interface UseNotificationsResult {
  unreadCount: number;
  isLoading: boolean;
}

/**
 * Returns the current unread-notification count.
 *
 * Right now there's no backend endpoint wired up, so this falls back to
 * DEFAULT_UNREAD_COUNT. Once an API exists, replace the body of
 * fetchUnreadCount() below with a real request — nothing else in the app
 * needs to change, since every sidebar already consumes this hook.
 */
export function useNotifications(): UseNotificationsResult {
  const [unreadCount, setUnreadCount] = useState<number>(DEFAULT_UNREAD_COUNT);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchUnreadCount() {
      setIsLoading(true);
      try {
        // TODO: replace with a real API call once the backend is ready, e.g.:
        // const res = await fetch("/api/notifications/unread-count");
        // const data = await res.json();
        // if (isMounted) setUnreadCount(data.count);

        if (isMounted) setUnreadCount(DEFAULT_UNREAD_COUNT);
      } catch (error) {
        console.error("Failed to fetch unread notification count", error);
        if (isMounted) setUnreadCount(DEFAULT_UNREAD_COUNT);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchUnreadCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return { unreadCount, isLoading };
}