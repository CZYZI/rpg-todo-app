import { useState, useCallback } from 'react';
import { callQwenAPI, QwenMessage } from '../services/qwenService';
import { getStorage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';
import { TaskDifficulty } from '../types';
import { TimeOfDay } from '../utils/timeOfDay';

interface UseQwenAPIReturn {
  loading: boolean;
  error: string | null;
  generateText: (messages: QwenMessage[]) => Promise<string>;
  generateTaskDescription: (params: {
    taskName: string;
    worldview: string;
    historyDescriptions: string[];
    difficulty?: TaskDifficulty;
    timeOfDay?: TimeOfDay;
    score?: number;
  }) => Promise<string>;
}

export function useQwenAPI(): UseQwenAPIReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateText = useCallback(async (messages: QwenMessage[]): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = getStorage<string | null>(STORAGE_KEYS.QWEN_API_KEY, null);
      if (!apiKey) {
        throw new Error('请先在设置中配置通义千问 API Key');
      }
      const result = await callQwenAPI(apiKey, messages);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : '生成失败';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateTaskDescription = useCallback(
    async (params: {
      taskName: string;
      worldview: string;
      historyDescriptions: string[];
      difficulty?: TaskDifficulty;
      timeOfDay?: TimeOfDay;
      score?: number;
    }): Promise<string> => {
      const {
        taskName,
        worldview,
        historyDescriptions,
        difficulty = 'normal',
        timeOfDay = 'afternoon',
        score = 30,
      } = params;

      setLoading(true);
      setError(null);
      try {
        const apiKey = getStorage<string | null>(STORAGE_KEYS.QWEN_API_KEY, null);
        if (!apiKey) {
          throw new Error('请先在设置中配置通义千问 API Key');
        }
        // 动态导入以避免循环依赖
        const { generateRpgDescription } = await import('../services/qwenService');
        const result = await generateRpgDescription(
          apiKey,
          taskName,
          worldview,
          historyDescriptions,
          difficulty,
          timeOfDay,
          score
        );
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : '生成失败';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    generateText,
    generateTaskDescription,
  };
}
