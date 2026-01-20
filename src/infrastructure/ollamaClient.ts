/**
 * Infrastructure - Ollama Client
 * HTTP client for Ollama API
 */

import { getConfig } from '@infrastructure/config';

export async function sendToOllama(prompt: string): Promise<string> {
  const { ollama } = getConfig();
  const url = `${ollama.baseUrl}/api/generate`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ollama.timeout);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: ollama.model, prompt, stream: false }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data = (await response.json()) as { response: string };
    return data.response.trim();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Ollama request timeout');
    }
    throw error;
  }
}
