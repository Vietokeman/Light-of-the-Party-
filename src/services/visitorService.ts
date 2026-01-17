// TEMPORARILY COMMENTED FOR UI TESTING
/*
import { doc, getDoc, setDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebase';
*/
import { VisitorStats } from '@/types';

const COUNTER_DOC_PATH = 'analytics/counters';

/**
 * Get current visitor statistics (MOCK)
 */
export async function getVisitorStats(): Promise<VisitorStats> {
  console.log('Mock: Getting visitor stats');
  // Return mock data
  return {
    totalVisitors: 1234,
    todayVisitors: 56,
    lastUpdated: new Date(),
  };
  
  // Firebase code commented
  /*
  try {
    const counterRef = doc(db, COUNTER_DOC_PATH);
    const counterSnap = await getDoc(counterRef);

    if (counterSnap.exists()) {
      const data = counterSnap.data();
      return {
        totalVisitors: data.totalVisitors || 0,
        todayVisitors: data.todayVisitors || 0,
        lastUpdated: data.lastUpdated?.toDate() || new Date(),
      };
    }

    // Initialize if doesn't exist
    const initialStats: VisitorStats = {
      totalVisitors: 0,
      todayVisitors: 0,
      lastUpdated: new Date(),
    };
    
    await setDoc(counterRef, initialStats);
    return initialStats;
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return {
      totalVisitors: 0,
      todayVisitors: 0,
      lastUpdated: new Date(),
    };
  }
  */
}

/**
 * Increment visitor count (MOCK)
 */
export async function incrementVisitorCount(): Promise<void> {
  console.log('Mock: Incrementing visitor count');
  // Firebase code commented
  /*
  try {
    const counterRef = doc(db, COUNTER_DOC_PATH);
    await setDoc(counterRef, {
      totalVisitors: increment(1),
      lastUpdated: new Date(),
    }, { merge: true });
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
  }
  */
}

/**
 * Subscribe to real-time visitor count updates (MOCK)
 */
export function subscribeToVisitorStats(
  callback: (stats: VisitorStats) => void
): () => void {
  console.log('Mock: Subscribing to visitor stats');
  
  // Return mock data immediately
  callback({
    totalVisitors: 1234,
    todayVisitors: 56,
    lastUpdated: new Date(),
  });
  
  // Return empty unsubscribe function
  return () => {
    console.log('Mock: Unsubscribed from visitor stats');
  };
  
  // Firebase code commented
  /*
  // Firebase code commented
  /*
  const counterRef = doc(db, COUNTER_DOC_PATH);
  
  const unsubscribe = onSnapshot(counterRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      callback({
        totalVisitors: data.totalVisitors || 0,
        todayVisitors: data.todayVisitors || 0,
        lastUpdated: data.lastUpdated?.toDate() || new Date(),
      });
    }
  }, (error) => {
    console.error('Error subscribing to visitor stats:', error);
  });

  return unsubscribe;
  */
}

export default { getVisitorStats, incrementVisitorCount, subscribeToVisitorStats };
