import { useState, useCallback } from 'react';
import { GeminiMessage } from '@/types';

const LIGHTRAG_API_URL = import.meta.env.VITE_LIGHTRAG_API_URL || 'http://localhost:8000';

interface UseLightRAGOptions {
  useStreaming?: boolean;
  fallbackToGemini?: boolean;
}

interface UseLightRAGReturn {
  query: (question: string, history?: GeminiMessage[]) => Promise<string>;
  streamQuery: (
    question: string,
    history: GeminiMessage[],
    onChunk: (chunk: string) => void,
    onComplete: () => void
  ) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

interface LightRAGChatResponse {
  answer: string;
  mode: string;
  processing_time: number;
}

/**
 * Custom hook for LightRAG integration
 * 
 * LightRAG provides:
 * 1. Knowledge retrieval from HCM ideology textbook
 * 2. Accurate citations with page numbers
 * 3. Chapter references from the curriculum
 */
export function useLightRAG(options: UseLightRAGOptions = {}): UseLightRAGReturn {
  const { useStreaming = true } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Query LightRAG directly via /chat endpoint
   */
  const queryLightRAG = async (question: string): Promise<LightRAGChatResponse> => {
    const response = await fetch(`${LIGHTRAG_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: question,
        user_id: 'web_user',
        mode: 'hybrid',  // Best accuracy with citations
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Lỗi không xác định' }));
      throw new Error(errorData.detail || `HTTP ${response.status}`);
    }

    return await response.json();
  };

  /**
   * Non-streaming query - calls LightRAG directly
   */
  const query = useCallback(async (
    question: string,
    history: GeminiMessage[] = []
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await queryLightRAG(question);
      return response.answer;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Streaming query simulation
   * LightRAG doesn't support native streaming, so we simulate it
   * by fetching the full response and then streaming it character by character
   */
  const streamQuery = useCallback(async (
    question: string,
    history: GeminiMessage[],
    onChunk: (chunk: string) => void,
    onComplete: () => void
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Get full response from LightRAG
      const response = await queryLightRAG(question);
      const fullAnswer = response.answer;

      // Simulate streaming by sending chunks
      const words = fullAnswer.split(' ');
      let currentIndex = 0;
      const chunkSize = 3; // Send 3 words at a time for smooth effect
      
      const streamInterval = setInterval(() => {
        if (currentIndex >= words.length) {
          clearInterval(streamInterval);
          setIsLoading(false);
          onComplete();
          return;
        }
        
        const chunk = words.slice(currentIndex, currentIndex + chunkSize).join(' ') + ' ';
        onChunk(chunk);
        currentIndex += chunkSize;
      }, 50); // 50ms delay between chunks

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    query,
    streamQuery,
    isLoading,
    error,
    clearError,
  };
}

export default useLightRAG;
