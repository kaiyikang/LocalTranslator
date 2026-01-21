/**
 * Infrastructure - Clipboard
 * Get and process clipboard content (Electron-ready)
 */

/** Get clipboard text content */
export function getClipboardText(): string {
    try {
        const { clipboard } = require('electron');
        return clipboard.readText().trim();
    } catch {
        const { execSync } = require('child_process');
        return execSync('pbpaste', { encoding: 'utf-8' }).toString().trim();
    }
}

/** Get clipboard text and normalize whitespace */
export function getClipboardTextNormalized(): string {
    return getClipboardText().replace(/\s+/g, ' ');
}
