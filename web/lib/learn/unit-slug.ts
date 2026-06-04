export function parseUnitSlug(slug: string): { level: string; number: number } | null {
  const match = /^([a-c][12])-(\d+)$/i.exec(slug);
  if (!match) return null;
  const level = match[1].toUpperCase();
  const number = parseInt(match[2], 10);
  if (Number.isNaN(number)) return null;
  return { level, number };
}
