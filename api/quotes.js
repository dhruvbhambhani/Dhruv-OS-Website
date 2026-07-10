// Vercel serverless function: live stock quotes for the desktop widget.
// Proxies Yahoo Finance because it has no CORS headers for browser use.

const SYMBOLS = [
  { sym: "NVDA", name: "NVIDIA", yahoo: "NVDA" },
  { sym: "SNOW", name: "Snowflake", yahoo: "SNOW" },
  { sym: "AAPL", name: "Apple", yahoo: "AAPL" },
  { sym: "SPX", name: "S&P 500", yahoo: "^GSPC" },
]

export default async function handler(req, res) {
  try {
    const quotes = await Promise.all(
      SYMBOLS.map(async ({ sym, name, yahoo }) => {
        const r = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahoo)}?interval=1d&range=1d`,
          { headers: { "User-Agent": "Mozilla/5.0" } },
        )
        if (!r.ok) throw new Error(`HTTP ${r.status} for ${yahoo}`)
        const meta = (await r.json()).chart.result[0].meta
        const pct =
          ((meta.regularMarketPrice - meta.chartPreviousClose) / meta.chartPreviousClose) * 100
        return { sym, name, pct: `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`, up: pct >= 0 }
      }),
    )
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600")
    res.status(200).json(quotes)
  } catch (err) {
    res.status(502).json({ error: String(err) })
  }
}
