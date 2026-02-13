#!/usr/bin/env bash
# =============================================================================
# OJPP Vercel 環境変数 一括更新スクリプト
# =============================================================================
# 使い方:
#   bash scripts/vercel-env.sh
#
# すでにプロジェクトがリンク済みの状態で、環境変数だけ更新したいときに使う
# =============================================================================

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

PREFIX="ojpp"

APPS=(
  moneyglass-web
  moneyglass-admin
  policydiff-web
  parliscope-web
  parliscope-admin
  seatmap-web
  culturescope-web
  socialguard-web
)

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}OJPP Vercel 環境変数 一括更新${NC}"
echo ""

# 入力方法を選択
echo "環境変数の入力方法を選んでください:"
echo "  1) 対話形式で入力"
echo "  2) .env ファイルから読み込み"
read -rp "選択 (1/2): " method

if [ "$method" = "2" ]; then
  read -rp ".env ファイルのパス (デフォルト: .env): " env_file
  env_file="${env_file:-.env}"

  if [ ! -f "$env_file" ]; then
    echo "エラー: ${env_file} が見つかりません"
    exit 1
  fi

  # .env から値を読み取り
  get_env_val() { grep "^${1}=" "$env_file" | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'"; }

  DB_URL=$(get_env_val DATABASE_URL)
  DIRECT_URL=$(get_env_val DIRECT_URL)
  SUPABASE_URL=$(get_env_val NEXT_PUBLIC_SUPABASE_URL)
  SUPABASE_ANON_KEY=$(get_env_val NEXT_PUBLIC_SUPABASE_ANON_KEY)
  SUPABASE_SERVICE_ROLE_KEY=$(get_env_val SUPABASE_SERVICE_ROLE_KEY)
else
  read -rp "DATABASE_URL:                       " DB_URL
  read -rp "DIRECT_URL:                         " DIRECT_URL
  read -rp "NEXT_PUBLIC_SUPABASE_URL:            " SUPABASE_URL
  read -rp "NEXT_PUBLIC_SUPABASE_ANON_KEY:       " SUPABASE_ANON_KEY
  read -rp "SUPABASE_SERVICE_ROLE_KEY:           " SUPABASE_SERVICE_ROLE_KEY
fi

echo ""

# 設定する環境変数を確認
echo "以下の値を全プロジェクトに設定します:"
echo "  DATABASE_URL:                  ${DB_URL:0:30}..."
echo "  DIRECT_URL:                    ${DIRECT_URL:0:30}..."
echo "  NEXT_PUBLIC_SUPABASE_URL:      ${SUPABASE_URL}"
echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY:0:20}..."
echo "  SUPABASE_SERVICE_ROLE_KEY:     ${SUPABASE_SERVICE_ROLE_KEY:0:20}..."
echo ""
read -rp "続行しますか？ (y/N): " confirm
if [[ ! "$confirm" =~ ^[yY]$ ]]; then
  echo "中断しました。"
  exit 0
fi
echo ""

# 環境変数名の配列
ENV_NAMES=(DATABASE_URL DIRECT_URL NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY SUPABASE_SERVICE_ROLE_KEY)
ENV_VALS=("$DB_URL" "$DIRECT_URL" "$SUPABASE_URL" "$SUPABASE_ANON_KEY" "$SUPABASE_SERVICE_ROLE_KEY")

for app in "${APPS[@]}"; do
  local_dir="${REPO_ROOT}/apps/${app}"

  if [ ! -d "${local_dir}/.vercel" ]; then
    echo -e "${YELLOW}  ⚠ ${PREFIX}-${app}: リンクされていません（スキップ）${NC}"
    continue
  fi

  echo -e "${YELLOW}  → ${PREFIX}-${app}${NC}"

  (
    cd "$local_dir"
    for i in "${!ENV_NAMES[@]}"; do
      name="${ENV_NAMES[$i]}"
      val="${ENV_VALS[$i]}"
      for target in production preview; do
        echo "$val" | vercel env add "$name" "$target" --force 2>/dev/null || true
      done
    done
  )

  echo -e "${GREEN}    ✓ 完了${NC}"
done

echo ""
echo -e "${GREEN}環境変数の更新が完了しました。${NC}"
echo "反映するには各アプリを再デプロイしてください:"
echo "  bash scripts/vercel-deploy.sh"
echo ""
