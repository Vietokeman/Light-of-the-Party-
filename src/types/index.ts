// User profile types
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  customBackground: string | null;
  createdAt: Date;
  lastLoginAt: Date;
}

// Chat message types
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

// Chat session types
export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Wallpaper options
export type WallpaperType = 
  | 'default'
  | 'party'
  | 'stars'
  | 'custom';

export interface WallpaperConfig {
  type: WallpaperType;
  customUrl?: string;
}

// Visitor counter
export interface VisitorStats {
  totalVisitors: number;
  todayVisitors: number;
  lastUpdated: Date;
}

// Auth state
export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// LightRAG response
export interface LightRAGResponse {
  answer: string;
  sources?: string[];
  confidence?: number;
}

// Gemini API types
export interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export interface GeminiRequest {
  contents: GeminiMessage[];
  systemInstruction?: {
    parts: Array<{ text: string }>;
  };
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

// Profile update payload
export interface ProfileUpdatePayload {
  displayName?: string;
  photoURL?: string;
  customBackground?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}
