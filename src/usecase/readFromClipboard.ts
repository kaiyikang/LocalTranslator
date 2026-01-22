import { readFromClipboard as read } from '@infrastructure/clipboard'

export function readFromClipboard(): string {
    return read()
}
