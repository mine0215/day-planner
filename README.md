# Day Planner

A task board and a 10-minute day timetable, side by side, in one HTML file.

Drag a card from the board onto the day to schedule it — **the card stays on the board**. A task
can be planned several times across the day, and the board keeps showing what the task *is*
while the timetable shows when you intend to work on it.

- **One file.** `planner.html` plus a vendored copy of FullCalendar. No build step, no install.
- **No network.** Nothing is fetched at runtime, and nothing is ever sent anywhere.
- **Your data stays in your browser.** Everything lives in `localStorage`, with JSON export/import.
- **10-minute grid**, 8:00–19:00 by default, adjustable, with a density control.
- **10 languages**, picked up from your browser and switchable in the header.

## Getting started

Download the repository and open `planner.html` in a browser. That is the whole setup.

If your browser restricts `file://` pages, serve the folder locally instead:

```bash
node serve.js 8731
```

Then open <http://localhost:8731>.

## How it works

### Two states, deliberately separate

A task's **board status** and whether you **did a given block** are different facts, so they are
stored separately:

| | Means | Lives on |
|---|---|---|
| **Board status** | What is happening with the task (`To do` / `In progress` / `Done`) | The column the card is in |
| **Block done** | Whether you did the work you scheduled at that time | Each individual block |

This matters when a task sits in *In progress* for days while you wait on someone else. The
work you actually did on Tuesday still counts as done, because it is marked on the block, not
on the task.

Click a block to set either one.

### Storage

| Key | Holds |
|---|---|
| `day-planner-v1` | Tasks and scheduled blocks |
| `day-planner-v1-range` | Visible hours and density |
| `day-planner-v1-ui` | Which board columns are collapsed |
| `day-planner-v1-lang` | Chosen language |

`localStorage` is per browser and per device — it does not sync. Use **Export** / **Import** to
move a day's data, or to back it up.

## Languages

English, 日本語, 简体中文, 繁體中文, 한국어, Español, Português (BR), Français, Deutsch, Русский.

The language is taken from the browser on first run and can be changed in the header; the choice
is remembered. Dates and times are formatted by the browser's own `Intl` data, so they follow the
selected language without any extra locale files.

### Adding a language

Everything lives in two places near the top of the `<script>` block in `planner.html`:

1. Add an entry to `LANGS`:

   ```js
   {code:"it", fc:"it", name:"Italiano"}
   ```

   `code` is this app's key, `fc` is the locale code handed to FullCalendar, and `name` is how the
   language names itself in the picker.

2. Copy the `en` block in `STR`, rename it to your `code`, and translate the values. Keep the
   `{n}`, `{m}`, `{h}` and `{msg}` placeholders where they are.

Missing keys fall back to English, so a partial translation still works. Pull requests welcome.

Right-to-left scripts are not handled yet — the layout has no RTL support.

## Project files

| File | What it is |
|---|---|
| `planner.html` | The whole application |
| `vendor/fullcalendar.min.js` | FullCalendar 6.1.15, vendored so the page works offline |
| `serve.js` | A ~30-line static server, for browsers that restrict `file://` |
| `theme-quiet-desk.md` | The colour and density decisions behind the UI |

## Security

The app is offline by design, and the page enforces that rather than just claiming it: a
`Content-Security-Policy` meta tag sets `default-src 'none'` and `connect-src 'none'`, so the
browser blocks any attempt to fetch or send anything. Nothing is loaded except this folder's own
files.

- **No `innerHTML` ever receives your text.** Task titles and notes are written with
  `textContent`, so a task called `<img onerror=...>` is displayed, not executed.
- **Imported files are validated.** An exported JSON can come from anywhere, so every field is
  type-checked and clamped on import: unknown states fall back to *To do*, colours must be a
  `#rrggbb` literal, and durations and start times are clamped to a real day. Malformed entries
  are dropped rather than rendered.
- **`serve.js` binds to `127.0.0.1` only**, so running it does not expose this folder to the
  network. It refuses dotfiles (so `.git/` is never served), rejects non-`GET`/`HEAD` requests,
  and returns `400` on a malformed URL instead of crashing.

If you find a security problem, please open an issue.

## Browser support

Any current Chrome, Edge, Firefox or Safari. The app uses Pointer Events and `Intl`; there are no
other requirements and no polyfills.

## License

MIT — see [LICENSE](LICENSE).

FullCalendar is bundled under its own MIT license; see
[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

---

# Day Planner（日本語）

タスク盤と、10分刻みの1日の時間割を並べた、HTML 1枚のツールです。

盤からカードを時間割へドラッグすると予定になりますが、**カードは盤から消えません**。同じタスクを
1日に何度でも置けます。盤は「その案件が今どうなっているか」を、時間割は「いつ手を動かすか」を
それぞれ受け持ちます。

- **ファイル1枚。** `planner.html` と同梱の FullCalendar だけ。ビルドも導入作業も不要です
- **通信しません。** 実行時に何も取得せず、どこへも送信しません
- **データはブラウザの中だけ。** `localStorage` に保存し、JSON で書き出し・読み込みできます
- **10分刻み。** 既定は 8:00〜19:00 で、表示範囲と密度を変えられます
- **10言語対応。** ブラウザの設定から自動で選ばれ、ヘッダーで切り替えられます

## 使い始める

リポジトリをダウンロードして `planner.html` をブラウザで開くだけです。

ブラウザが `file://` を制限している場合は、ローカルサーバー経由で開いてください。

```bash
node serve.js 8731
```

その後 <http://localhost:8731> を開きます。

## 2つの状態を分けている理由

**盤のステータス**と、**その予定をこなしたか**は別の情報なので、別々に保存しています。

| | 意味 | 置き場所 |
|---|---|---|
| **盤のステータス** | 案件が今どうなっているか（未着手 / 進行中 / 完了） | カードがある列 |
| **予定の消化** | その時間に予定した作業をやったか | 予定ブロックごと |

メーカーや相手先の返事待ちで何日も「進行中」に置いたままでも、火曜にやった作業は
きちんと終わった扱いになります。**消化の記録はタスクではなくブロックに付く**ためです。

予定をクリックすると、どちらも切り替えられます。

## 保存について

`localStorage` はブラウザごと・端末ごとで、同期はしません。
別の端末へ移すときやバックアップには、**書き出し** / **読み込み** を使ってください。

## 言語を追加する

`planner.html` の `<script>` 冒頭にある `LANGS` に1行足し、`STR` の `en` ブロックを
コピーして翻訳するだけです。足りないキーは英語にフォールバックするので、途中まででも動きます。
プルリクエストを歓迎します。

右から左に書く言語（RTL）にはまだ対応していません。

## ライセンス

MIT です。FullCalendar も MIT ライセンスで同梱しています。
