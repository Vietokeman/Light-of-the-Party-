import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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
import { UserProfile, ProfileUpdatePayload, WallpaperConfig } from '@/types';
import { setUserOnline, setUserOffline } from '@/services/visitorService';

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

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wallpaperConfig, setWallpaperConfig] = useState<WallpaperConfig>({ type: 'default' });

  // Increment visitor counter
  const incrementVisitorCount = useCallback(async (uid: string) => {
    try {
      const counterRef = doc(db, 'analytics', 'counters');
      await setDoc(counterRef, {
        totalVisitors: increment(1),
        lastUpdated: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error('Failed to increment visitor count:', error);
    }
  }, []);

  // Create or update user profile in Firestore
  const syncUserProfile = useCallback(async (firebaseUser: User, isNewUser: boolean = false) => {
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

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        await syncUserProfile(firebaseUser);
        // Mark user as online
        await setUserOnline(firebaseUser.uid, firebaseUser.displayName || undefined);
      } else {
        setUserProfile(null);
        setWallpaperConfig({ type: 'default' });
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserProfile(result.user, true);
    } catch (err: any) {
      const errorMessage = getAuthErrorMessage(err.code);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with Facebook
  const signInWithFacebook = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      await syncUserProfile(result.user, true);
    } catch (err: any) {
      const errorMessage = getAuthErrorMessage(err.code);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with email/password
  const signInWithEmail = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await syncUserProfile(result.user);
    } catch (err: any) {
      const errorMessage = getAuthErrorMessage(err.code);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email/password
  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update display name
      await updateProfile(result.user, { displayName });

      await syncUserProfile(result.user, true);
    } catch (err: any) {
      const errorMessage = getAuthErrorMessage(err.code);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    setError(null);
    try {
      // Mark user as offline before signing out
      if (user) {
        await setUserOffline(user.uid);
      }
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
      setWallpaperConfig({ type: 'default' });
    } catch (err: any) {
      setError(err.message || 'Đăng xuất thất bại');
      throw err;
    }
  };

  // Update user profile
  const updateUserProfile = async (data: ProfileUpdatePayload) => {
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
  };

  // Set wallpaper
  const setWallpaper = (config: WallpaperConfig) => {
    setWallpaperConfig(config);

    // Persist to Firestore if logged in
    if (user && config.type === 'custom' && config.customUrl) {
      const userRef = doc(db, 'users', user.uid);
      setDoc(userRef, { customBackground: config.customUrl }, { merge: true });
    }
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
