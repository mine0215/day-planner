# Quiet Desk

一日中開いたままにしておく作業画面のためのテーマ。彩度を抑え、色は「今まさに見るべきもの」だけに使う。グレーは青にごくわずかに寄せて、無調整の灰色が持つ安っぽさを避けている。

## Color Palette

### Light

- **Paper**: `#eef0f3` — 画面の地。白より一段落として、パネルの白を浮かせる
- **Panel**: `#ffffff` — カードと時間割の面
- **Panel Soft**: `#f5f6f8` — タスクカードの面
- **Ink**: `#191d23` — 本文
- **Ink Soft**: `#67707d` — ラベル、補足
- **Line**: `#dde0e6` — 10分の細線、枠線
- **Line Strong**: `#c3c8d1` — 正時の線。グリッドを詰めても時刻が読める
- **Pine**: `#2c6e63` — 唯一の強調色。ボタン、配置済みの表示
- **Pine Wash**: `#e4efec` — 今日の背景、選択範囲
- **Clay**: `#c05621` — 現在時刻ラインと削除。警告ではなく「今ここ」の印

### Dark

- **Paper**: `#13161a` / **Panel**: `#1c2026` / **Panel Soft**: `#232832`
- **Ink**: `#e7eaef` / **Ink Soft**: `#98a2b0`
- **Line**: `#2e343d` / **Line Strong**: `#434b57`
- **Pine**: `#5fb8aa` / **Pine Wash**: `#1d3a36` / **Clay**: `#e08b5c`

### Task colors

`#2c6e63` `#33618c` `#8a5a2b` `#74487f` `#2f6a42` `#95384b`
いずれも彩度を落とし、白文字が乗る明度に揃えてある。

## Typography

- **Headers / Body**: OS 標準の日本語フォント（Yu Gothic UI → Hiragino Kaku Gothic ProN → Noto Sans JP）。欧文フォントを同梱すると日本語が別フォントに落ちて不揃いになるため、あえて単一系統にしている
- **Numerals**: 等幅（Consolas / SF Mono）＋ `tabular-nums`。時刻と合計が桁で揃う
- **Scale**: 19 / 13.5 / 12.5 / 11.5px。ラベルは 11.5px に letter-spacing .06em

## Density

正時の線だけを濃くし、10分の線は点線の細線に落とす。これにより1スロットを 7px まで詰めても時間帯を読み違えない。既定は 9px（1時間 = 54px）。

## Best Used For

毎日開く個人用の作業画面。タスク管理、時間割、ダッシュボードなど、長時間見ても疲れず、色が意味を持つ画面。
