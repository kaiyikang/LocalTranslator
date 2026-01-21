/**
 * Infrastructure - Clipboard
 * Get and process clipboard content (Electron-ready)
 */

/** Copy text to clipboard */
export function copyToClipboard(text: string): void {
    const { clipboard } = require('electron');
    clipboard.writeText(text);
}
