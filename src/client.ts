/**
 * Ollama Client Module
 * Sends prompts to Ollama and returns response text
 */

import { getConfig, OllamaConfig } from './config';

export interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
}

export interface GenerateRequest {
  model: string;
  prompt: string;
  stream?: boolean;
}

/**
 * Send a prompt to Ollama and get response
 */
export async function sendToOllama(prompt: string, configOverride?: Partial<OllamaConfig>): Promise<string> {
  const config = getConfig();
  const ollamaConfig = { ...config.ollama, ...configOverride };

  const url = `${ollamaConfig.baseUrl}/api/generate`;

  const requestBody: GenerateRequest = {
    model: ollamaConfig.model,
    prompt: prompt,
    stream: false,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ollamaConfig.timeout);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as OllamaResponse;
    return data.response.trim();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Ollama request timeout after ${ollamaConfig.timeout}ms`);
    }
    throw error;
  }
}
