/**
 * Infrastructure - Clipboard
 * Read and write clipboard content using Electron's clipboard API
 */

import { clipboard } from 'electron';

/**
 * Read text from system clipboard
 * @returns The text content from clipboard, or empty string if clipboard is empty
 */
export function readFromClipboard(): string {
    const text = clipboard.readText();
    return text || '';
}

/**
 * Copy text to clipboard
 * @param text The text to copy to clipboard
 */
export function copyToClipboard(text: string): void {
    clipboard.writeText(text);
}

/**
 * Check if clipboard contains text
 * @returns True if clipboard has text content
 */
export function hasClipboardText(): boolean {
    return clipboard.has('text/plain');
}
