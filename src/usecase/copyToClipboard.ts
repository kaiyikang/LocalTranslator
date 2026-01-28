import { copyToClipboard as copy } from '@infrastructure/clipboard';

export function copyToClipboard(text: string): void {
  copy(text);
}
