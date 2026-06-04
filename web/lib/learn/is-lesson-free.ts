/**
 * A lesson is free if:
 * 1. The lesson itself is marked is_free in the database, OR
 * 2. The unit is A1 level, OR
 * 3. The lesson is one of the first 2 lessons in its unit (by order_index)
 */
export function isLessonFree(
  lesson: { is_free: boolean; order_index: number },
  unit: { level: string; is_free: boolean }
): boolean {
  if (lesson.is_free) return true;
  if (unit.level === "A1") return true;
  if (unit.is_free) return true;
  if (lesson.order_index <= 2) return true;
  return false;
}
