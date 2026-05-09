import { buildTaskPrompt, getSmartFallbackDescription, QWEN_SYSTEM_PROMPT } from '../constants/prompts';
import { TaskDifficulty } from '../types';
import { TimeOfDay } from '../utils/timeOfDay';

const QWEN_API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';

export interface QwenMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface QwenRequest {
  model: 'qwen-max';
  input: {
    messages: QwenMessage[];
  };
  parameters?: {
    temperature?: number;
    top_p?: number;
    max_tokens?: number;
  };
}

export interface QwenResponse {
  output: {
    choices: Array<{
      message: {
        role: string;
        content: string;
      };
    }>;
  };
  usage?: {
    total_tokens: number;
  };
}

/**
 * 调用通义千问 API 生成文本
 */
export async function callQwenAPI(
  apiKey: string,
  messages: QwenMessage[],
  params?: QwenRequest['parameters']
): Promise<string> {
  if (!apiKey) {
    throw new Error('API Key 未配置');
  }

  const requestBody: QwenRequest = {
    model: 'qwen-max',
    input: { messages },
    parameters: {
      temperature: 0.9,
      max_tokens: 150,
      ...params,
    },
  };

  const response = await fetch(QWEN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `API 调用失败 (${response.status})`;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorJson.error?.message || errorMessage;
    } catch {
      // 使用默认错误信息
    }
    throw new Error(errorMessage);
  }

  const data: QwenResponse = await response.json();
  return data.output.choices[0].message.content.trim();
}

/**
 * 生成 RPG 任务描述（改进版）
 * 新增：difficulty, timeOfDay 参数
 */
export async function generateRpgDescription(
  apiKey: string,
  taskName: string,
  worldview: string,
  historyDescriptions: string[],
  difficulty: TaskDifficulty = 'normal',
  timeOfDay: TimeOfDay = 'afternoon',
  score: number = 30
): Promise<string> {
  const prompt = buildTaskPrompt({
    taskName,
    worldview,
    difficulty,
    timeOfDay,
    historyDescriptions,
  });

  const messages: QwenMessage[] = [
    { role: 'system', content: QWEN_SYSTEM_PROMPT },
    { role: 'user', content: prompt },
  ];

  try {
    const description = await callQwenAPI(apiKey, messages);
    return description;
  } catch (error) {
    console.error('[Qwen] 生成失败，使用智能降级方案:', error);
    return getSmartFallbackDescription(worldview, taskName, score);
  }
}
