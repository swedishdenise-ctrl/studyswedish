// Encode guest name into content for storage (no schema change required).
// Format: "[guest:Alice Smith]\n\n<actual content>"
export function encodeGuestContent(name: string, content: string): string {
  return `[guest:${name.trim()}]\n\n${content.trim()}`;
}

// Extract guest name and body from encoded format.
export function decodeGuestContent(raw: string): {
  name: string | null;
  content: string;
} {
  const match = raw.match(/^\[guest:(.+?)\]\n\n([\s\S]*)$/);
  if (match) return { name: match[1], content: match[2] };
  return { name: null, content: raw };
}
