import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * 定数時間の文字列比較（タイミング攻撃対策）
 */
function safeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const aBuf = encoder.encode(a);
  const bBuf = encoder.encode(b);
  if (aBuf.byteLength !== bBuf.byteLength) {
    const dummy = new Uint8Array(aBuf.byteLength);
    crypto.subtle.timingSafeEqual?.(aBuf, dummy);
    return false;
  }
  if (typeof crypto.subtle?.timingSafeEqual === "function") {
    return crypto.subtle.timingSafeEqual(aBuf, bBuf);
  }
  let result = 0;
  for (let i = 0; i < aBuf.byteLength; i++) {
    result |= aBuf[i] ^ bBuf[i];
  }
  return result === 0;
}

/**
 * Admin アプリの Basic 認証ミドルウェア
 *
 * 環境変数:
 *   ADMIN_USERNAME — 管理者ユーザー名（デフォルト: admin）
 *   ADMIN_PASSWORD — 管理者パスワード（必須。未設定時はアクセス拒否）
 */
export function middleware(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;

  // ADMIN_PASSWORD が未設定 → 本番では全アクセス拒否（安全側に倒す）
  if (!password) {
    if (process.env.NODE_ENV === "development") {
      return NextResponse.next();
    }
    return new NextResponse("Admin access is not configured", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");
      const expectedUser = process.env.ADMIN_USERNAME ?? "admin";

      if (safeEqual(user, expectedUser) && safeEqual(pass, password)) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="OJPP Admin", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
