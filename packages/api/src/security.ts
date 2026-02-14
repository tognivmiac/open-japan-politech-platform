type TimingSafeEqual = (a: ArrayBufferView, b: ArrayBufferView) => boolean;

interface ExtendedSubtleCrypto extends SubtleCrypto {
  timingSafeEqual?: TimingSafeEqual;
}

/**
 * Constant-time string comparison when possible.
 * Falls back to XOR-based comparison in environments without timingSafeEqual.
 */
export function safeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const aBuf = encoder.encode(a);
  const bBuf = encoder.encode(b);
  const subtle = crypto.subtle as ExtendedSubtleCrypto;

  if (aBuf.byteLength === bBuf.byteLength && typeof subtle.timingSafeEqual === "function") {
    return subtle.timingSafeEqual(aBuf, bBuf);
  }

  let result = aBuf.byteLength ^ bBuf.byteLength;
  const maxLength = Math.max(aBuf.byteLength, bBuf.byteLength);
  for (let i = 0; i < maxLength; i++) {
    result |= (aBuf[i] ?? 0) ^ (bBuf[i] ?? 0);
  }
  return result === 0;
}
