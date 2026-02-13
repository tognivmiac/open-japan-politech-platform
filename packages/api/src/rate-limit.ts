import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * サーバーレス用のシンプルなインメモリ・レートリミッター
 *
 * 注意: Vercel サーバーレスでは各関数インスタンスで独立したメモリを持つため、
 * 厳密なグローバルレートリミットにはならない（ベストエフォート）。
 * 厳密に制御したい場合は Upstash Redis + @upstash/ratelimit に置き換え可能。
 *
 * デフォルト: 60リクエスト / 60秒（IP単位）
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// 古いエントリを定期的にクリーンアップ（メモリリーク防止）
const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key);
  }
}

export interface RateLimitConfig {
  /** ウィンドウ内の最大リクエスト数 */
  limit?: number;
  /** ウィンドウのサイズ（ミリ秒） */
  windowMs?: number;
}

export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig = {},
): NextResponse | null {
  const { limit = 60, windowMs = 60_000 } = config;

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const now = Date.now();
  cleanup();

  const entry = store.get(ip);

  if (!entry || entry.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return null; // OK
  }

  entry.count++;

  if (entry.count > limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(entry.resetAt),
        },
      },
    );
  }

  return null; // OK
}
