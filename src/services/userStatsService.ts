import { db } from '@/config/firebase';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  Timestamp,
  getCountFromServer
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const PRESENCE_COLLECTION = 'presence';
const USERS_COLLECTION = 'users';

/**
 * Update user's online presence
 */
export const updateUserPresence = async (userId: string, isOnline: boolean) => {
  try {
    const presenceRef = doc(db, PRESENCE_COLLECTION, userId);
    
    if (isOnline) {
      await setDoc(presenceRef, {
        userId,
        lastSeen: serverTimestamp(),
        isOnline: true,
      });
    } else {
      await deleteDoc(presenceRef);
    }
  } catch (error) {
    console.error('Error updating presence:', error);
  }
};

/**
 * Set up presence listener for current user
 * Automatically marks user as offline when they disconnect
 */
export const setupPresenceListener = (userId: string) => {
  // Mark user as online
  updateUserPresence(userId, true);

  // Mark user as offline when they leave
  const handleBeforeUnload = () => {
    updateUserPresence(userId, false);
  };

  // Mark user as offline when window loses focus for extended period
  let blurTimeout: number;
  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Set timeout to mark offline after 5 minutes of inactivity
      blurTimeout = setTimeout(() => {
        updateUserPresence(userId, false);
      }, 5 * 60 * 1000);
    } else {
      clearTimeout(blurTimeout);
      updateUserPresence(userId, true);
    }
  };

  // Add event listeners
  window.addEventListener('beforeunload', handleBeforeUnload);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Cleanup function
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    clearTimeout(blurTimeout);
    updateUserPresence(userId, false);
  };
};

/**
 * Subscribe to online users count
 */
export const subscribeToOnlineUsers = (
  callback: (count: number) => void
): (() => void) => {
  const presenceQuery = query(collection(db, PRESENCE_COLLECTION));
  
  const unsubscribe = onSnapshot(
    presenceQuery,
    (snapshot) => {
      // Filter out stale presences (older than 10 minutes)
      const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
      const activeUsers = snapshot.docs.filter((doc) => {
        const data = doc.data();
        const lastSeen = data.lastSeen as Timestamp;
        return lastSeen && lastSeen.toMillis() > tenMinutesAgo;
      });
      
      callback(activeUsers.length);
    },
    (error) => {
      console.error('Error listening to online users:', error);
      callback(0);
    }
  );

  return unsubscribe;
};

/**
 * Get total registered users count
 */
export const getTotalUsersCount = async (): Promise<number> => {
  try {
    const usersCollection = collection(db, USERS_COLLECTION);
    const snapshot = await getCountFromServer(usersCollection);
    return snapshot.data().count;
  } catch (error) {
    console.error('Error getting users count:', error);
    return 0;
  }
};

/**
 * Subscribe to total users count
 * Updates whenever users collection changes
 */
export const subscribeToTotalUsers = (
  callback: (count: number) => void
): (() => void) => {
  const usersCollection = collection(db, USERS_COLLECTION);
  
  const unsubscribe = onSnapshot(
    usersCollection,
    async (snapshot) => {
      callback(snapshot.size);
    },
    (error) => {
      console.error('Error listening to total users:', error);
      callback(0);
    }
  );

  return unsubscribe;
};
