import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
// TEMPORARILY COMMENTED FOR UI TESTING
/*
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, increment } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
*/
import { UserProfile, ProfileUpdatePayload, WallpaperConfig } from '@/types';

// Mock User type
type User = any;

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  wallpaperConfig: WallpaperConfig;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (data: ProfileUpdatePayload) => Promise<void>;
  setWallpaper: (config: WallpaperConfig) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// MOCK PROVIDERS (Firebase commented)
// const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Changed to false for mock
  const [error, setError] = useState<string | null>(null);
  const [wallpaperConfig, setWallpaperConfig] = useState<WallpaperConfig>({ type: 'default' });

  // Increment visitor counter (DISABLED - Firebase commented)
  const incrementVisitorCount = useCallback(async (uid: string) => {
    console.log('Mock: Visitor count incremented for', uid);
    // Firebase code commented
    /*
    try {
      const counterRef = doc(db, 'analytics', 'counters');
      await setDoc(counterRef, {
        totalVisitors: increment(1),
        lastUpdated: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error('Failed to increment visitor count:', error);
    }
    */
  }, []);

  // Create or update user profile in Firestore (DISABLED - Firebase commented)
  const syncUserProfile = useCallback(async (firebaseUser: User, isNewUser: boolean = false) => {
    console.log('Mock: Syncing user profile', firebaseUser);
    // Firebase code commented
    /*
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create new user profile
        const newProfile = {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || 'Người dùng mới',
          photoURL: firebaseUser.photoURL,
          customBackground: null,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        };
        await setDoc(userRef, newProfile);
        
        // Increment visitor counter for new users
        await incrementVisitorCount(firebaseUser.uid);
        
        setUserProfile({
          uid: firebaseUser.uid,
          ...newProfile,
          createdAt: new Date(),
          lastLoginAt: new Date(),
        });
      } else {
        // Update last login
        await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });
        
        const data = userSnap.data();
        setUserProfile({
          uid: firebaseUser.uid,
          email: data.email,
          displayName: data.displayName,
          photoURL: data.photoURL,
          customBackground: data.customBackground,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: new Date(),
        });

        // Restore wallpaper config
        if (data.customBackground) {
          setWallpaperConfig({ type: 'custom', customUrl: data.customBackground });
        }
      }
    } catch (error) {
      console.error('Error syncing user profile:', error);
    }
  }, [incrementVisitorCount]);

  // Auth state listener (DISABLED - Firebase commented)
  useEffect(() => {
    console.log('Mock: Auth state listener initialized');
    setIsLoading(false);
    // Firebase code commented
    /*
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        await syncUserProfile(firebaseUser);
      } else {
        setUserProfile(null);
        setWallpaperConfig({ type: 'default' });
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sign in with Google (MOCK)
  const signInWithGoogle = async () => {
    console.log('Mock: Google sign in');
    alert('Firebase đã được tắt tạm thời. Đây là mock UI để kiểm tra giao diện.');
    // Firebase code commented
  };

  // Sign in with Facebook (MOCK)
  const signInWithFacebook = async () => {
    console.log('Mock: Facebook sign in');
    alert('Firebase đã được tắt tạm thời. Đây là mock UI để kiểm tra giao diện.');
    // Firebase code commented
  };

  // Sign in with email/password (MOCK)
  const signInWithEmail = async (email: string, password: string) => {
    console.log('Mock: Email sign in', email);
    alert('Firebase đã được tắt tạm thời. Đây là mock UI để kiểm tra giao diện.');
    // Firebase code commented
  };

  // Sign up with email/password (MOCK)
  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    console.log('Mock: Email sign up', email, displayName);
    alert('Firebase đã được tắt tạm thời. Đây là mock UI để kiểm tra giao diện.');
    // Firebase code commented
  };

  // Sign out (MOCK)
  const signOut = async () => {
    console.log('Mock: Sign out');
    setUserProfile(null);
    setWallpaperConfig({ type: 'default' });
    // Firebase code commented
  };

  // Update user profile (MOCK)
  const updateUserProfile = async (data: ProfileUpdatePayload) => {
    console.log('Mock: Update user profile', data);
    alert('Firebase đã được tắt tạm thời. Đây là mock UI để kiểm tra giao diện.');
    // Firebase code commented
    /*
    if (!user) throw new Error('Chưa đăng nhập');

    try {
      // Update Firebase Auth profile
      if (data.displayName || data.photoURL) {
        await updateProfile(user, {
          displayName: data.displayName || user.displayName,
          photoURL: data.photoURL || user.photoURL,
        });
      }

      // Update Firestore profile
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, data, { merge: true });

      // Update local state
      setUserProfile(prev => prev ? { ...prev, ...data } : null);

      // Update wallpaper if changed
      if (data.customBackground) {
        setWallpaperConfig({ type: 'custom', customUrl: data.customBackground });
      }
    } catch (err: any) {
      setError(err.message || 'Cập nhật hồ sơ thất bại');
      throw err;
    }
    */
  };

  // Set wallpaper (MOCK)
  const setWallpaper = (config: WallpaperConfig) => {
    console.log('Mock: Set wallpaper', config);
    setWallpaperConfig(config);
    // Firebase code commented
    /*
    // Persist to Firestore if logged in
    if (user && config.type === 'custom' && config.customUrl) {
      const userRef = doc(db, 'users', user.uid);
      setDoc(userRef, { customBackground: config.customUrl }, { merge: true });
    }
    */
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    userProfile,
    isLoading,
    isAuthenticated: !!user,
    error,
    wallpaperConfig,
    signInWithGoogle,
    signInWithFacebook,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    updateUserProfile,
    setWallpaper,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to get user-friendly error messages
function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'auth/user-not-found': 'Không tìm thấy tài khoản với email này',
    'auth/wrong-password': 'Mật khẩu không chính xác',
    'auth/email-already-in-use': 'Email này đã được sử dụng',
    'auth/weak-password': 'Mật khẩu phải có ít nhất 6 ký tự',
    'auth/invalid-email': 'Email không hợp lệ',
    'auth/too-many-requests': 'Quá nhiều yêu cầu. Vui lòng thử lại sau',
    'auth/popup-closed-by-user': 'Cửa sổ đăng nhập đã bị đóng',
    'auth/network-request-failed': 'Lỗi kết nối mạng',
  };

  return errorMessages[errorCode] || 'Đã xảy ra lỗi. Vui lòng thử lại';
}

export default AuthContext;
