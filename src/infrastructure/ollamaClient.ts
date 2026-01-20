/**
 * Infrastructure - Ollama Client
 */

import { getConfig } from '@infrastructure/config';

/** Check if Ollama is reachable */
export async function checkConnection(): Promise<boolean> {
  try {
    const { ollama } = getConfig();
    const res = await fetch(`${ollama.baseUrl}/api/tags`, { method: 'GET' });
    return res.ok;
  } catch {
    return false;
  }
}

/** Send prompt to Ollama and get response */
export async function sendToOllama(prompt: string): Promise<string> {
  const { ollama } = getConfig();

  const res = await fetch(`${ollama.baseUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: ollama.model, prompt, stream: false }),
    signal: AbortSignal.timeout(ollama.timeout),
  });

  if (!res.ok) throw new Error(`Ollama error: ${res.status}`);

  const data = (await res.json()) as { response: string };
  return data.response.trim();
}
