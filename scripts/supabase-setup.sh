#!/usr/bin/env bash
# =============================================================================
# OJPP Supabase Cloud セットアップ & マイグレーション
# =============================================================================
# 使い方:
#   bash scripts/supabase-setup.sh
#
# Supabase Cloud プロジェクト作成後に実行。
# Prisma マイグレーションの適用 + シードデータ投入を行う。
# =============================================================================

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}OJPP Supabase Cloud セットアップ${NC}"
echo ""

# .env 確認
if [ ! -f .env ]; then
  echo -e "${YELLOW}.env が見つかりません。.env.example からコピーします...${NC}"
  cp .env.example .env
  echo ""
  echo -e "${RED}.env を編集して Supabase Cloud の接続情報を設定してください:${NC}"
  echo "  DATABASE_URL, DIRECT_URL, NEXT_PUBLIC_SUPABASE_URL, etc."
  echo ""
  echo "設定後、再度このスクリプトを実行してください。"
  exit 1
fi

# DATABASE_URL チェック
DB_URL=$(grep "^DATABASE_URL=" .env | head -1 | cut -d'=' -f2- | tr -d '"')
if [[ "$DB_URL" == *"127.0.0.1"* ]] || [[ "$DB_URL" == *"localhost"* ]]; then
  echo -e "${RED}エラー: DATABASE_URL がローカルを指しています${NC}"
  echo "  .env の DATABASE_URL を Supabase Cloud の接続文字列に変更してください。"
  echo "  Supabase ダッシュボード → Settings → Database → Connection string"
  exit 1
fi

echo -e "${GREEN}DATABASE_URL: ${DB_URL:0:40}...${NC}"
echo ""

# pnpm がなければインストール
if ! command -v pnpm &>/dev/null; then
  echo -e "${YELLOW}pnpm をインストール中...${NC}"
  npm i -g pnpm
fi

# 依存関係インストール
echo -e "${BLUE}[1/3] 依存関係インストール...${NC}"
pnpm install

# Prisma generate
echo -e "${BLUE}[2/3] Prisma クライアント生成 & マイグレーション...${NC}"
pnpm db:generate

# マイグレーション実行（deploy = 本番用、対話なし）
cd packages/db
pnpm dotenv -e ../../.env -- prisma migrate deploy
cd "$REPO_ROOT"
echo -e "${GREEN}  ✓ マイグレーション完了${NC}"

# シード
echo ""
read -rp "シードデータを投入しますか？ (y/N): " do_seed
if [[ "$do_seed" =~ ^[yY]$ ]]; then
  echo -e "${BLUE}[3/3] シードデータ投入...${NC}"
  pnpm db:seed
  echo -e "${GREEN}  ✓ シード完了${NC}"
else
  echo -e "${YELLOW}  スキップ${NC}"
fi

echo ""
echo -e "${GREEN}Supabase セットアップ完了！${NC}"
echo ""
echo "次のステップ:"
echo "  1. bash scripts/vercel-setup.sh  — Vercel プロジェクト作成 & デプロイ"
echo "  2. bash scripts/vercel-env.sh    — 環境変数の設定（.env から読み込み可）"
echo ""
