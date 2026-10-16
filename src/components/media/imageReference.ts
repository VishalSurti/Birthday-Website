export type ImageReference = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};
const dimension = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) && value > 0
    ? value
    : undefined;

export function validateImageReference(
  input: unknown,
): ImageReference | undefined {
  if (!input || typeof input !== 'object') return undefined;
  const value = input as Record<string, unknown>;
  if (
    typeof value.src !== 'string' ||
    !value.src.startsWith('/') ||
    value.src.startsWith('//') ||
    /[\\\s]/.test(value.src) ||
    [...value.src].some((char) => char.charCodeAt(0) < 32) ||
    value.src === '/' ||
    typeof value.alt !== 'string'
  )
    return undefined;
  return {
    src: value.src,
    alt: value.alt,
    width: dimension(value.width),
    height: dimension(value.height),
  };
}
