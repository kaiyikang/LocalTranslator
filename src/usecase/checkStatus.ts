import { checkConnection } from '@infrastructure/ollamaClient';

export async function getOllamaStatus(): Promise<boolean> {
  return await checkConnection();
}
