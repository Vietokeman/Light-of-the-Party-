import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  where,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface HangmanScore {
  id?: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  longestStreak: number;
  createdAt: Timestamp | Date;
}

const COLLECTION_NAME = 'hangman_scores';

/**
 * Save a new Hangman game score to Firestore
 */
export const saveHangmanScore = async (
  userId: string,
  userName: string,
  score: number,
  totalQuestions: number,
  correctAnswers: number,
  longestStreak: number,
  userPhoto?: string
): Promise<string> => {
  try {
    const scoreData: Omit<HangmanScore, 'id'> = {
      userId,
      userName,
      userPhoto,
      score,
      totalQuestions,
      correctAnswers,
      longestStreak,
      createdAt: serverTimestamp() as Timestamp,
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), scoreData);
    console.log('✅ Hangman score saved:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error saving Hangman score:', error);
    throw new Error('Không thể lưu điểm số');
  }
};

/**
 * Get top Hangman scores (leaderboard)
 */
export const getTopScores = async (limitCount: number = 10): Promise<HangmanScore[]> => {
  try {
    const scoresQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy('score', 'desc'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(scoresQuery);
    const scores: HangmanScore[] = [];

    querySnapshot.forEach((doc) => {
      scores.push({
        id: doc.id,
        ...doc.data(),
      } as HangmanScore);
    });

    return scores;
  } catch (error) {
    console.error('❌ Error fetching top scores:', error);
    throw new Error('Không thể tải bảng xếp hạng');
  }
};

/**
 * Get user's best score
 */
export const getUserBestScore = async (userId: string): Promise<HangmanScore | null> => {
  try {
    const userScoresQuery = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('score', 'desc'),
      limit(1)
    );

    const querySnapshot = await getDocs(userScoresQuery);
    
    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as HangmanScore;
  } catch (error) {
    console.error('❌ Error fetching user best score:', error);
    return null;
  }
};

/**
 * Get user's recent scores
 */
export const getUserRecentScores = async (
  userId: string, 
  limitCount: number = 5
): Promise<HangmanScore[]> => {
  try {
    const userScoresQuery = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(userScoresQuery);
    const scores: HangmanScore[] = [];

    querySnapshot.forEach((doc) => {
      scores.push({
        id: doc.id,
        ...doc.data(),
      } as HangmanScore);
    });

    return scores;
  } catch (error) {
    console.error('❌ Error fetching user recent scores:', error);
    return [];
  }
};

/**
 * Get user's rank on the leaderboard
 */
export const getUserRank = async (userId: string): Promise<number> => {
  try {
    const bestScore = await getUserBestScore(userId);
    if (!bestScore) {
      return -1; // User has no scores
    }

    // Get all scores better than user's best score
    const betterScoresQuery = query(
      collection(db, COLLECTION_NAME),
      where('score', '>', bestScore.score)
    );

    const querySnapshot = await getDocs(betterScoresQuery);
    
    // Rank is number of better scores + 1
    return querySnapshot.size + 1;
  } catch (error) {
    console.error('❌ Error calculating user rank:', error);
    return -1;
  }
};
