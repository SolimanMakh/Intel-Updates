# Intel Updates Dashboard

A React front‑end dashboard that visualizes Cyber Threat Intel updates with:

* Dynamic page system (schema driven)
* React Router **Data APIs** (loaders)
* Tailwind CSS v4 UI
* Analytics (Top Countries, Top Sectors)
* Filterable intel feed
* Individual intel detail page with related intel

> **This repo is FE only.** All data is mocked locally.

---

## Features

| Feature           | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| Dynamic Pages     | Screens are defined by a schema object, not hardcoded UI          |
| URL‑based filters | Search, tags, sectors, groups, etc stored in URL → shareable URLs |
| Analytics cards   | Donut chart + top country rankings                                |
| Detail page       | Hero panel, source info, tags, related intel                      |
| Export PDF        | Single‑click `window.print()` for PDF export                      |

---

## Tech Stack

| Layer     | Tech                        |
| --------- | --------------------------- |
| Framework | React + Vite                |
| Routing   | React Router v6 (Data APIs) |
| Styling   | Tailwind CSS v4             |
| Charts    | Recharts                    |

---

## Project Architecture

**React Router Data Model**

* URL changes → router loader runs
* loader applies filtering + analytics
* UI only renders what loader returns

This pattern = clean separation of logic vs UI.

**Components are atomic modules**

```
src/
  screens/        ← screens (DynamicPage + IntelDetail)
  ui/             ← small reusable components
  data/           ← mock data
  utils/          ← filtering + analytics
  router.tsx      ← route definitions + loaders
```

---

## Setup

```bash
npm install
npm run dev
```

Tailwind CSS v4 needs **index.css** to contain:

```css
@import "tailwindcss";
```

Tailwind config:

```js
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
}
```

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})


```

---

## How Dynamic Pages Work

`PAGE_SCHEMAS` defines layout blocks:

```ts
"intel-updates": {
  title: "Intel Updates",
  layout: [
    { component: "AnalyticsRow" },
    { component: "FeedList" },
  ],
}
```

So UI = configured by data, not code.

---

## How Filters Work

* Filters write to URL search params
* Router sees URL change → auto re‑runs loader
* loader filters data → UI re‑renders with filtered dataset

This makes the URL the **single source of truth**.

---

## Detail Page Flow

1. User clicks item → `/intel/:id`
2. loader finds item by id + finds related items
3. page renders Hero panel + Article + Related intel

---

## Next Steps (optional ideas)

* connect to API instead of mock data
* replace `window.print()` PDF with server side PDF
* support dark/light themes
* add pagination & infinite scroll

---

## License

Internal / private development.
Not open‑sourced yet.
