import { doc, setDoc, deleteDoc, onSnapshot, collection, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { VisitorStats } from '@/types';

const ONLINE_USERS_COLLECTION = 'onlineUsers';

/**
 * Mark user as online when they log in
 */
export async function setUserOnline(userId: string, displayName?: string): Promise<void> {
  try {
    const userRef = doc(db, ONLINE_USERS_COLLECTION, userId);
    await setDoc(userRef, {
      displayName: displayName || 'Anonymous',
      lastSeen: serverTimestamp(),
      isOnline: true,
    });
    
    // Set up beforeunload to mark user offline when they leave
    window.addEventListener('beforeunload', () => {
      setUserOffline(userId);
    });
  } catch (error) {
    console.error('Error setting user online:', error);
  }
}

/**
 * Mark user as offline when they log out or leave
 */
export async function setUserOffline(userId: string): Promise<void> {
  try {
    const userRef = doc(db, ONLINE_USERS_COLLECTION, userId);
    await deleteDoc(userRef);
  } catch (error) {
    console.error('Error setting user offline:', error);
  }
}

/**
 * Get current online user count
 */
export async function getOnlineUserCount(): Promise<number> {
  try {
    const onlineRef = collection(db, ONLINE_USERS_COLLECTION);
    const snapshot = await getDocs(onlineRef);
    return snapshot.size;
  } catch (error) {
    console.error('Error getting online user count:', error);
    return 0;
  }
}

/**
 * Subscribe to real-time online user count
 */
export function subscribeToOnlineUsers(
  callback: (count: number) => void
): () => void {
  const onlineRef = collection(db, ONLINE_USERS_COLLECTION);
  
  const unsubscribe = onSnapshot(onlineRef, (snapshot) => {
    callback(snapshot.size);
  }, (error) => {
    console.error('Error subscribing to online users:', error);
  });

  return unsubscribe;
}

// Legacy exports for backward compatibility
export async function getVisitorStats(): Promise<VisitorStats> {
  const count = await getOnlineUserCount();
  return {
    totalVisitors: count,
    todayVisitors: count,
    lastUpdated: new Date(),
  };
}

export function subscribeToVisitorStats(
  callback: (stats: VisitorStats) => void
): () => void {
  return subscribeToOnlineUsers((count) => {
    callback({
      totalVisitors: count,
      todayVisitors: count,
      lastUpdated: new Date(),
    });
  });
}

export default { 
  setUserOnline, 
  setUserOffline, 
  getOnlineUserCount, 
  subscribeToOnlineUsers,
  getVisitorStats, 
  subscribeToVisitorStats 
};
