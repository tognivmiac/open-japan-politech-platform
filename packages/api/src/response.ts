import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * 許可するオリジンのリスト
 * ALLOWED_ORIGINS 環境変数でカンマ区切りで追加可能
 */
function getAllowedOrigins(): string[] {
  return (
    process.env.ALLOWED_ORIGINS?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? []
  );
}

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;

  // 開発環境は localhost 許可
  if (process.env.NODE_ENV === "development") {
    if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
      return true;
    }
  }

  // Vercel のプレビュー/本番 URL を許可
  if (origin.endsWith(".vercel.app")) return true;

  // 環境変数で指定されたオリジンを許可
  const allowed = getAllowedOrigins();
  return allowed.includes(origin);
}

function getCorsHeaders(request?: NextRequest): Record<string, string> {
  const origin = request?.headers.get("origin") ?? null;

  if (isOriginAllowed(origin) && origin) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    };
  }

  // オリジンが不許可 or なし → CORS ヘッダーを付けない（同一オリジンのみ）
  return {};
}

export function jsonResponse<T>(data: T, status = 200, request?: NextRequest): NextResponse {
  return NextResponse.json(data, { status, headers: getCorsHeaders(request) });
}

export function optionsResponse(request?: NextRequest): NextResponse {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(request) });
}
