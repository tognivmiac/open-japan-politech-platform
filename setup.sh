#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
#  Open Japan PoliTech Platform — ✨ ワンクリックセットアップ ✨
#
#  git clone https://github.com/ochyai/open-japan-politech-platform.git
#  cd open-japan-politech-platform && bash setup.sh
# =============================================================================

# -- 256-color palette --------------------------------------------------------
R='\033[0m'
B='\033[1m'
D='\033[2m'
IT='\033[3m'
CLR='\033[K'

# Pastel / Harajuku palette
PINK='\033[38;5;213m'
HOT='\033[38;5;198m'
PURP='\033[38;5;141m'
LAVD='\033[38;5;183m'
SKY='\033[38;5;117m'
MINT='\033[38;5;121m'
LIME='\033[38;5;155m'
PEACH='\033[38;5;216m'
CORAL='\033[38;5;209m'
GOLD='\033[38;5;220m'
WHITE='\033[38;5;255m'
GRAY='\033[38;5;245m'
RED='\033[38;5;196m'
GRN='\033[38;5;48m'
CYN='\033[38;5;87m'

# Rainbow sequence for banner
RB1='\033[38;5;196m'
RB2='\033[38;5;208m'
RB3='\033[38;5;226m'
RB4='\033[38;5;46m'
RB5='\033[38;5;51m'
RB6='\033[38;5;129m'
RB7='\033[38;5;201m'

# -- State --------------------------------------------------------------------
LOG="/tmp/ojpp-setup-$(date +%Y%m%d-%H%M%S).log"
SKIP_DOCKER=false
DEV_PID=""
COMPOSE=""
TOTAL_START=$SECONDS

# -- Helpers ------------------------------------------------------------------
line()  { echo -e "  ${GRAY}│${R}"; }
msg()   { echo -e "  ${GRAY}│${R}  $*"; }
ok()    { echo -e "  ${GRAY}│${R}  ${GRN}✔${R} $*${CLR}"; }
wrn()   { echo -e "  ${GRAY}│${R}  ${GOLD}⚠${R}  $*${CLR}"; }
err()   { echo -e "  ${GRAY}│${R}  ${RED}✖${R} $*${CLR}"; }
head()  { echo -e "\n  ${PINK}◇${R}  ${B}$*${R}"; }

die() {
  err "$1"
  line
  msg "${GRAY}ログ: ${LOG}${R}"
  echo -e "  ${GRAY}└${R}"
  echo ""
  exit 1
}

# Run a command quietly with kawaii progress
run() {
  local label="$1"; shift
  echo -ne "  ${GRAY}│${R}  ${SKY}◌${R} ${label}...${CLR}\r"
  local t=$SECONDS
  if "$@" >> "$LOG" 2>&1; then
    local dt=$((SECONDS - t))
    local ts=""
    [ "$dt" -gt 2 ] && ts=" ${GRAY}(${dt}s)${R}"
    echo -e "  ${GRAY}│${R}  ${GRN}✔${R} ${label}${ts}${CLR}"
    return 0
  else
    echo -e "  ${GRAY}│${R}  ${RED}✖${R} ${label}${CLR}"
    return 1
  fi
}

port_in_use() {
  (echo >/dev/tcp/localhost/"$1") 2>/dev/null
}

# Progress bar
progress() {
  local pct=$1
  local width=30
  local filled=$((pct * width / 100))
  local empty=$((width - filled))
  local bar=""
  for ((i=0; i<filled; i++)); do bar+="█"; done
  for ((i=0; i<empty; i++)); do bar+="░"; done
  echo -ne "  ${GRAY}│${R}  ${PURP}${bar}${R} ${GRAY}${pct}%${R}${CLR}\r"
}

# =============================================================================
#  ✨ Banner ✨
# =============================================================================
echo ""
echo ""
echo -e "  ${RB1}  ██████╗      ██╗${RB2}██████╗ ${RB3}██████╗ ${R}"
echo -e "  ${RB1}  ██╔═══██╗     ██║${RB2}██╔══██╗${RB3}██╔══██╗${R}"
echo -e "  ${RB4}  ██║   ██║     ██║${RB5}██████╔╝${RB6}██████╔╝${R}"
echo -e "  ${RB4}  ██║   ██║██   ██║${RB5}██╔═══╝ ${RB6}██╔═══╝ ${R}"
echo -e "  ${RB7}  ╚██████╔╝╚█████╔╝${PINK}██║     ${HOT}██║     ${R}"
echo -e "  ${RB7}   ╚═════╝  ╚════╝ ${PINK}╚═╝     ${HOT}╚═╝     ${R}"
echo ""
echo -e "  ${B}${PINK}Open Japan PoliTech Platform${R} ${GRAY}v0.1${R}"
echo -e "  ${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${R}"
echo -e "  ${LAVD}🏛️  AIエージェント時代の政治インフラ${R}"
echo -e "  ${GRAY}政党にも企業にもよらない、完全オープンな政治テクノロジー基盤${R}"
echo -e "  ${GRAY}MoneyGlass · PolicyDiff · ParliScope — 15政党対応${R}"

# Sanity check
grep -q "open-japan-politech-platform" package.json 2>/dev/null \
  || die "open-japan-politech-platform ディレクトリで実行してください"

# =============================================================================
#  🔍 環境チェック
# =============================================================================
head "🔍 環境チェック"
progress 0

# -- Docker ---
command -v docker &>/dev/null \
  || die "Docker が必要です ✨\n\n     macOS:   ${CYN}brew install --cask docker${R}\n     Linux:   ${CYN}https://docs.docker.com/engine/install/${R}"

docker info >> "$LOG" 2>&1 \
  || die "Docker が起動していません 😴\n     → ${B}Docker Desktop を起動${R}してから再実行してください"

COMPOSE="docker compose"
if ! $COMPOSE version >> "$LOG" 2>&1; then
  if command -v docker-compose &>/dev/null; then
    COMPOSE="docker-compose"
  else
    die "docker compose が見つかりません"
  fi
fi
ok "🐳 Docker $(docker --version | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)"

# -- Node.js ---
install_node() {
  if command -v fnm &>/dev/null; then
    fnm install 22 >> "$LOG" 2>&1 && eval "$(fnm env)" && fnm use 22 >> "$LOG" 2>&1
  elif [ -s "$HOME/.nvm/nvm.sh" ]; then
    # shellcheck source=/dev/null
    . "$HOME/.nvm/nvm.sh"
    nvm install 22 >> "$LOG" 2>&1 && nvm use 22 >> "$LOG" 2>&1
  elif command -v mise &>/dev/null; then
    mise install node@22 >> "$LOG" 2>&1 && eval "$(mise activate bash)" && mise use --env local node@22 >> "$LOG" 2>&1
  else
    echo -ne "  ${GRAY}│${R}  ${SKY}◌${R} fnm をインストール中...${CLR}\r"
    curl -fsSL https://fnm.vercel.app/install 2>/dev/null | bash -s -- --skip-shell >> "$LOG" 2>&1
    FNM_DIR="${FNM_DIR:-$HOME/.local/share/fnm}"
    [ -d "$FNM_DIR" ] || FNM_DIR="$HOME/.fnm"
    export PATH="$FNM_DIR:$PATH"
    eval "$(fnm env 2>/dev/null)" || eval "$("$FNM_DIR/fnm" env 2>/dev/null)"
    echo -e "  ${GRAY}│${R}  ${GRN}✔${R} fnm インストール完了${CLR}"
    echo -ne "  ${GRAY}│${R}  ${SKY}◌${R} Node.js 22 をインストール中...${CLR}\r"
    fnm install 22 >> "$LOG" 2>&1 && fnm use 22 >> "$LOG" 2>&1
    echo -e "  ${GRAY}│${R}  ${GRN}✔${R} Node.js $(node -v) インストール完了${CLR}"
  fi
}

if command -v node &>/dev/null; then
  NODE_MAJOR=$(node -v | sed 's/v//' | cut -d. -f1)
  if [ "$NODE_MAJOR" -ge 22 ]; then
    ok "💚 Node.js $(node -v)"
  else
    wrn "Node.js $(node -v) → v22+ にアップグレードします"
    install_node
  fi
else
  install_node
fi
progress 15

# -- pnpm ---
if ! command -v pnpm &>/dev/null; then
  echo -ne "  ${GRAY}│${R}  ${SKY}◌${R} pnpm をインストール中...${CLR}\r"
  if command -v corepack &>/dev/null; then
    corepack enable >> "$LOG" 2>&1 || true
    corepack prepare pnpm@10.4.0 --activate >> "$LOG" 2>&1 || npm install -g pnpm@10 >> "$LOG" 2>&1
  else
    npm install -g pnpm@10 >> "$LOG" 2>&1
  fi
fi
ok "📦 pnpm $(pnpm --version)"
progress 20

# =============================================================================
#  🐘 PostgreSQL
# =============================================================================
head "🐘 データベース"

if port_in_use 54322; then
  ok "既存の PostgreSQL を発見！ (localhost:54322)"
  msg "${GRAY}Supabase / Docker が起動中 → そのまま使います 🎯${R}"
  SKIP_DOCKER=true
else
  run "PostgreSQL コンテナを起動" $COMPOSE up -d db \
    || die "PostgreSQL の起動に失敗しました"

  echo -ne "  ${GRAY}│${R}  ${SKY}◌${R} PostgreSQL が目覚めるのを待っています...${CLR}\r"
  for i in $(seq 1 30); do
    if $COMPOSE exec -T db pg_isready -U postgres >> "$LOG" 2>&1; then
      echo -e "  ${GRAY}│${R}  ${GRN}✔${R} PostgreSQL おはよう！ 🐘${CLR}"
      break
    fi
    sleep 1
    [ "$i" -eq 30 ] && die "PostgreSQL の起動がタイムアウトしました 😢"
  done
fi
progress 35

# =============================================================================
#  📦 パッケージインストール
# =============================================================================
head "📦 パッケージ"

if [ ! -f .env ]; then
  cp .env.example .env
  ok ".env 作成 → localhost:54322 にデフォルト接続"
else
  ok ".env 既存（上書きなし）"
fi

run "依存関係をインストール" pnpm install \
  || die "pnpm install に失敗しました\n     ${GRAY}ログ: $LOG${R}"
progress 55

# =============================================================================
#  🗄️ データベースセットアップ
# =============================================================================
head "🗄️ データベースセットアップ"

run "Prisma Client を生成" pnpm db:generate \
  || die "Prisma Client の生成に失敗しました"
progress 60

run "スキーマを DB に反映" pnpm --filter @ojpp/db push \
  || die "スキーマの反映に失敗しました\n     ${GRAY}DATABASE_URL を確認してください${R}"
progress 70

if run "初期データを投入 (15政党・47都道府県・議員40名)" pnpm db:seed; then
  :
else
  wrn "スキップ（既にデータが存在）"
fi
progress 80

if run "データソースを取り込み (政治資金・議会・政策)" pnpm ingest:all; then
  :
else
  wrn "スキップ（既にデータが存在）"
fi
progress 90

# =============================================================================
#  🚀 アプリ起動
# =============================================================================
head "🚀 アプリ起動"

DEV_LOG="/tmp/ojpp-dev-$(date +%s).log"
pnpm dev > "$DEV_LOG" 2>&1 &
DEV_PID=$!

# Cleanup handler
cleanup() {
  echo ""
  echo -ne "  ${PINK}◇${R}  停止中...${CLR}\r"
  kill "$DEV_PID" 2>/dev/null || true
  wait "$DEV_PID" 2>/dev/null || true
  if [ "$SKIP_DOCKER" = false ]; then
    $COMPOSE down >> "$LOG" 2>&1 || true
  fi
  echo ""
  echo -e "  ${PINK}◆${R}  ${B}おつかれさまでした！${R} (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧"
  echo ""
}
trap cleanup INT TERM

msg "${GRAY}初回起動はコンパイルに少し時間がかかります ☕${R}"

wait_for_app() {
  local port=$1 name=$2 emoji=$3
  echo -ne "  ${GRAY}│${R}  ${SKY}◌${R} ${name} を起動中...${CLR}\r"
  for i in $(seq 1 120); do
    if curl -sf -o /dev/null --connect-timeout 1 "http://localhost:$port" 2>/dev/null; then
      echo -e "  ${GRAY}│${R}  ${GRN}✔${R} ${emoji} ${name}${CLR}"
      return 0
    fi
    if ! kill -0 "$DEV_PID" 2>/dev/null; then
      echo -e "  ${GRAY}│${R}  ${RED}✖${R} ${name}${CLR}"
      die "開発サーバーが異常終了しました\n     ${GRAY}ログ: $DEV_LOG${R}"
    fi
    sleep 1
  done
  wrn "${name} の起動に時間がかかっています"
}

wait_for_app 3000 "MoneyGlass" "🏦"
wait_for_app 3002 "PolicyDiff" "📋"
wait_for_app 3003 "ParliScope" "🏛️ "
progress 100

# =============================================================================
#  🎉 完了！
# =============================================================================
ELAPSED=$((SECONDS - TOTAL_START))
MINS=$((ELAPSED / 60))
SECS=$((ELAPSED % 60))

echo ""
echo ""
echo -e "  ${RB1}✨${RB2}✨${RB3}✨${RB4}✨${RB5}✨${RB6}✨${RB7}✨${PINK}✨${HOT}✨${RB1}✨${RB2}✨${RB3}✨${RB4}✨${RB5}✨${RB6}✨${RB7}✨${PINK}✨${HOT}✨${R}"
echo ""
echo -e "  ${B}${PINK}セットアップ完了！${R}  ${GRAY}(${MINS}分${SECS}秒)${R}"
echo -e "  ${GRAY}(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧  全アプリ起動中${R}"
echo ""
echo -e "  ${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${R}"
echo ""
echo -e "  🏦 ${B}MoneyGlass${R}   ${CYN}${B}http://localhost:3000${R}   ${PEACH}政治資金可視化${R}"
echo -e "  📋 ${B}PolicyDiff${R}   ${CYN}${B}http://localhost:3002${R}   ${MINT}政策比較${R}"
echo -e "  🏛️  ${B}ParliScope${R}   ${CYN}${B}http://localhost:3003${R}   ${LAVD}議会監視${R}"
echo ""
echo -e "  ${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${R}"
echo ""
echo -e "  ${GRAY}管理画面  localhost:3001 (MoneyGlass) · localhost:3004 (ParliScope)${R}"
echo -e "  ${GRAY}停止      Ctrl+C${R}"
echo -e "  ${GRAY}ログ      ${DEV_LOG}${R}"
echo -e "  ${GRAY}DB削除    docker compose down -v${R}"
echo ""
echo -e "  ${RB1}✨${RB2}✨${RB3}✨${RB4}✨${RB5}✨${RB6}✨${RB7}✨${PINK}✨${HOT}✨${RB1}✨${RB2}✨${RB3}✨${RB4}✨${RB5}✨${RB6}✨${RB7}✨${PINK}✨${HOT}✨${R}"
echo ""

# Keep running until Ctrl+C
wait "$DEV_PID" 2>/dev/null || true
