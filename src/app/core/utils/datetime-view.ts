
export function parseLocalDateTime(value?: string | null): Date | null {
  if (!value) return null;

  const [datePart, timePartRaw] = value.split('T');
  if (!datePart || !timePartRaw) return null;

  const timePart = timePartRaw.replace(/(\.\d{3})\d+$/, '$1');

  const iso = `${datePart}T${timePart}`;
  const d = new Date(iso);

  return isNaN(d.getTime()) ? null : d;
}
