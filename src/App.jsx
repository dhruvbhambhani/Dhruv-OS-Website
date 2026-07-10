import { useEffect, useRef, useState } from "react"
import { profile, experience, projects, volunteering } from "./data.js"
import { GithubIcon, LinkedinIcon, MailIcon, ArrowIcon } from "./components/Icons.jsx"

/* ---------------------------------- boot ---------------------------------- */

function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const t = setInterval(() => {
      const pct = Math.min(100, (Date.now() - start) / 20)
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(t)
        setTimeout(onDone, 300)
      }
    }, 50)
    return () => clearInterval(t)
  }, [onDone])

  return (
    <div className="boot" onClick={onDone}>
      <div className="boot-logo" aria-hidden="true">
        ☺
      </div>
      <div className="boot-name">DHRUV_OS</div>
      <div className="boot-bar" aria-hidden="true">
        <div className="boot-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

/* -------------------------------- wallpaper -------------------------------- */

function Wallpaper() {
  return <div className="wallpaper" aria-hidden="true" />
}

/* ---------------------------------- icons ---------------------------------- */

function MacFolderIcon() {
  return (
    <svg viewBox="0 0 64 52" className="di-glyph" aria-hidden="true">
      <defs>
        <linearGradient id="foldBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6fbdf4" />
          <stop offset="1" stopColor="#2e7cc9" />
        </linearGradient>
      </defs>
      <path d="M4 10 a4 4 0 0 1 4-4 h14 l6 6 h28 a4 4 0 0 1 4 4 v28 a4 4 0 0 1-4 4 H8 a4 4 0 0 1-4-4 Z" fill="#3a8ad6" />
      <rect x="4" y="14" width="56" height="34" rx="4" fill="url(#foldBody)" />
      <rect x="4" y="14" width="56" height="4" rx="2" fill="#8dcbf7" opacity="0.7" />
    </svg>
  )
}

function MacFileIcon() {
  return (
    <svg viewBox="0 0 52 64" className="di-glyph di-glyph-file" aria-hidden="true">
      <path d="M6 6 a4 4 0 0 1 4-4 h24 l12 12 v44 a4 4 0 0 1-4 4 H10 a4 4 0 0 1-4-4 Z" fill="#f7f9fb" stroke="#c3ccd4" />
      <path d="M34 2 v12 h12 Z" fill="#d9e1e8" />
      <path d="M14 28 h24 M14 36 h24 M14 44 h16" stroke="#9fb0be" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

const APPS = {
  about: { title: "About Me", icon: "file", emoji: "👋", tile: "tile-blue", width: 470 },
  experience: { title: "Experience", icon: "folder", emoji: "💼", tile: "tile-navy", width: 640 },
  projects: { title: "Projects", icon: "folder", emoji: "🛠️", tile: "tile-grey", width: 560 },
  volunteering: { title: "Volunteering", icon: "folder", emoji: "🌊", tile: "tile-teal", width: 620 },
  resume: { title: "Resume", icon: "file", emoji: "📄", tile: "tile-light", width: 430 },
  contact: { title: "Contact", icon: "file", emoji: "✉️", tile: "tile-sky", width: 430 },
}

const DESKTOP_ORDER = ["about", "experience", "projects", "volunteering", "resume", "contact"]

/* --------------------------------- windows -------------------------------- */

function Window({ win, onClose, onMinimize, onZoom, onFocus, onMove, children }) {
  const app = APPS[win.id]

  const startDrag = (e) => {
    if (e.target.closest("button")) return
    onFocus(win.id)
    e.preventDefault()
    // keep the titlebar inside the desktop so windows can't be dragged
    // past the clipped (overflow: hidden) edges and become unreachable
    const desk = e.currentTarget.closest(".desktop")
    const maxX = (desk?.clientWidth ?? window.innerWidth) - 120
    const maxY = (desk?.clientHeight ?? window.innerHeight) - 40
    const offsetX = e.clientX - win.x
    const offsetY = e.clientY - win.y
    const move = (ev) =>
      onMove(
        win.id,
        Math.min(maxX, Math.max(-160, ev.clientX - offsetX)),
        Math.min(maxY, Math.max(0, ev.clientY - offsetY)),
      )
    const up = () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }

  return (
    <section
      className="window"
      style={{
        left: win.x,
        top: win.y,
        zIndex: win.z,
        width: window.innerWidth < 700 ? undefined : win.wide ? 880 : app.width,
        display: win.minimized ? "none" : undefined,
      }}
      onPointerDown={() => onFocus(win.id)}
      aria-label={app.title}
    >
      <header className="window-titlebar" onPointerDown={startDrag}>
        <span className="traffic">
          <button className="tl tl-close" onClick={() => onClose(win.id)} aria-label="Close" />
          <button className="tl tl-min" onClick={() => onMinimize(win.id)} aria-label="Minimize" />
          <button className="tl tl-zoom" onClick={() => onZoom(win.id)} aria-label="Zoom" />
        </span>
        <span className="window-title">{app.title}</span>
        <span className="traffic-spacer" aria-hidden="true" />
      </header>
      <div className="window-body">{children}</div>
    </section>
  )
}

/* ----------------------------- window contents ----------------------------- */

function AboutContent() {
  return (
    <div className="txt-file">
      <h1 className="txt-h1">Howdy! I'm Dhruv 👋</h1>
      <p className="txt-status">
        <span className="blip" aria-hidden="true" /> currently building agentic RAG systems @ Powell
      </p>
      <p>
        I love building <strong>applied AI/ML projects</strong> in prod environments and acquiring{" "}
        <strong>real estate</strong>. <a href={`mailto:${profile.email}`}>Let's chat!</a>
      </p>
      <p>Artificial Intelligence @ Texas A&M (Dean's List), and licensed in Real Estate.</p>
      <p className="txt-hint">← open the folders on the desktop, or use the dock below</p>
    </div>
  )
}

function XpEntry({ xp }) {
  return (
    <article className="xp">
      <div className="xp-head">
        <span className="xp-badge" aria-hidden="true">
          {xp.logo ? <img src={xp.logo} alt="" /> : xp.monogram}
        </span>
        <div className="xp-title-block">
          <h3 className="xp-role">{xp.role}</h3>
          <p className="xp-company">{xp.company}</p>
        </div>
        <span className="xp-period">{xp.period}</span>
      </div>
      <p className="xp-desc">{xp.description}</p>
      <div className="tags">
        {xp.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      {xp.link && (
        <a className="xp-link" href={xp.link.href} target="_blank" rel="noreferrer">
          ↗ {xp.link.label} — {xp.link.sub}
        </a>
      )}
    </article>
  )
}

function FolderContent({ items }) {
  return (
    <div className="folder">
      <p className="folder-meta">
        {items.length} item{items.length === 1 ? "" : "s"}
      </p>
      {items.map((xp) => (
        <XpEntry xp={xp} key={xp.role + xp.company} />
      ))}
    </div>
  )
}

function ProjectsContent() {
  return (
    <div className="folder">
      <p className="folder-meta">{projects.length} items</p>
      <ul className="file-list">
        {projects.map((p) => {
          const inner = (
            <>
              <MacFileIcon />
              <span className="file-name">{p.title}</span>
              <span className="file-info">
                {p.period} · {p.meta} {p.href && <ArrowIcon size={12} />}
              </span>
            </>
          )
          return (
            <li key={p.title}>
              {p.href ? (
                <a className="file-row" href={p.href} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <span className="file-row">{inner}</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ResumeContent() {
  return (
    <div className="txt-file">
      <p>Grab a copy of my resume, or reach out directly:</p>
      <a className="mac-btn" href="/resume.pdf" target="_blank" rel="noreferrer">
        ⬇ Download Resume.pdf
      </a>
      <p className="txt-hint">last updated {profile.updated}</p>
    </div>
  )
}

function ContactContent() {
  return (
    <div className="txt-file">
      <ul className="contact-list">
        <li>
          <a href={`mailto:${profile.email}`}>
            <MailIcon size={16} /> {profile.email}
          </a>
        </li>
        <li>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <GithubIcon size={16} /> github.com/dhruvbhambhani
          </a>
        </li>
        <li>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <LinkedinIcon size={16} /> linkedin.com/in/dhruvbhambhani05
          </a>
        </li>
      </ul>
    </div>
  )
}

const CONTENT = {
  about: <AboutContent />,
  experience: <FolderContent items={experience} />,
  projects: <ProjectsContent />,
  volunteering: <FolderContent items={volunteering} />,
  resume: <ResumeContent />,
  contact: <ContactContent />,
}

/* --------------------------------- menu bar -------------------------------- */

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])
  return now
}

function WifiGlyph() {
  return (
    <svg width="15" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M1.5 4.5a10 10 0 0 1 13 0" />
      <path d="M3.8 7a6.5 6.5 0 0 1 8.4 0" />
      <path d="M6.1 9.4a3 3 0 0 1 3.8 0" />
      <circle cx="8" cy="11" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function BatteryGlyph() {
  return (
    <svg width="22" height="11" viewBox="0 0 25 12" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="15" height="8" rx="1.5" fill="currentColor" />
      <path d="M23.5 4 v4 a2 2 0 0 0 0-4" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

function MenuBar({ onRestart }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const now = useClock()
  const date = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })
  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })

  return (
    <header className="menubar">
      <div className="menubar-left">
        <button className={`menubar-brand ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen((o) => !o)}>
          ☺
        </button>
        <span className="menubar-appname">DHRUV_OS</span>
        <span className="menubar-item">File</span>
        <span className="menubar-item">Edit</span>
        <span className="menubar-item">View</span>
        <span className="menubar-item">Go</span>
        <span className="menubar-item">Window</span>
        <span className="menubar-item">Help</span>
      </div>
      {menuOpen && (
        <>
          <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
          <nav className="brand-menu" onClick={() => setMenuOpen(false)}>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <GithubIcon size={15} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon size={15} /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`}>
              <MailIcon size={15} /> Email me
            </a>
            <button onClick={onRestart}>↻ Restart</button>
          </nav>
        </>
      )}
      <div className="menubar-right">
        <BatteryGlyph />
        <WifiGlyph />
        <span className="menubar-clock">
          {date} {time}
        </span>
      </div>
    </header>
  )
}

/* --------------------------------- widgets --------------------------------- */

// Fallback shown until live data loads (or if the fetch fails)
const DEFAULT_WEATHER = {
  temp: "84°",
  label: "Sunny",
  emoji: "☀️",
  hi: "88°",
  lo: "71°",
  hours: [
    { h: "3PM", t: "84°", e: "☀️" },
    { h: "4PM", t: "83°", e: "🌤️" },
    { h: "5PM", t: "81°", e: "🌤️" },
    { h: "6PM", t: "78°", e: "🌥️" },
    { h: "7PM", t: "74°", e: "🌙" },
  ],
}

// College Station, TX — live data from Open-Meteo (free, no API key)
const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=30.628&longitude=-96.334" +
  "&current=temperature_2m,weather_code,is_day" +
  "&hourly=temperature_2m,weather_code,is_day" +
  "&daily=temperature_2m_max,temperature_2m_min" +
  "&temperature_unit=fahrenheit&timezone=America%2FChicago&forecast_days=2"

function wmoInfo(code, isDay) {
  if (code === 0) return { label: isDay ? "Sunny" : "Clear", emoji: isDay ? "☀️" : "🌙" }
  if (code === 1) return { label: isDay ? "Mostly Sunny" : "Mostly Clear", emoji: isDay ? "🌤️" : "🌙" }
  if (code === 2) return { label: "Partly Cloudy", emoji: isDay ? "⛅" : "☁️" }
  if (code === 3) return { label: "Overcast", emoji: "☁️" }
  if (code === 45 || code === 48) return { label: "Foggy", emoji: "🌫️" }
  if (code >= 51 && code <= 57) return { label: "Drizzle", emoji: "🌦️" }
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { label: "Rain", emoji: "🌧️" }
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { label: "Snow", emoji: "🌨️" }
  if (code >= 95) return { label: "Storms", emoji: "⛈️" }
  return { label: "Cloudy", emoji: "☁️" }
}

// Open-Meteo returns times like "2026-07-10T15:00" in the requested timezone;
// pull the hour straight from the string to avoid browser-timezone parsing.
function hourLabel(time) {
  const h = Number(time.slice(11, 13))
  return `${h % 12 || 12}${h < 12 ? "AM" : "PM"}`
}

function WeatherWidget() {
  const [wx, setWx] = useState(DEFAULT_WEATHER)

  useEffect(() => {
    fetch(WEATHER_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d) => {
        const cur = wmoInfo(d.current.weather_code, d.current.is_day)
        // ISO strings in a fixed timezone compare lexicographically
        let start = d.hourly.time.findIndex((t) => t > d.current.time)
        if (start < 0) start = 0
        const hours = d.hourly.time.slice(start, start + 5).map((t, i) => {
          const idx = start + i
          const info = wmoInfo(d.hourly.weather_code[idx], d.hourly.is_day[idx])
          return { h: hourLabel(t), t: `${Math.round(d.hourly.temperature_2m[idx])}°`, e: info.emoji }
        })
        setWx({
          temp: `${Math.round(d.current.temperature_2m)}°`,
          label: cur.label,
          emoji: cur.emoji,
          hi: `${Math.round(d.daily.temperature_2m_max[0])}°`,
          lo: `${Math.round(d.daily.temperature_2m_min[0])}°`,
          hours,
        })
      })
      .catch(() => {}) // keep the fallback on any failure
  }, [])

  return (
    <div className="widget widget-weather">
      <div className="weather-top">
        <div>
          <span className="weather-loc">College Station ⌖</span>
          <span className="weather-temp">{wx.temp}</span>
        </div>
        <div className="weather-cond">
          <span className="weather-emoji" aria-hidden="true">
            {wx.emoji}
          </span>
          <span>{wx.label}</span>
          <span className="weather-hilo">
            H:{wx.hi} L:{wx.lo}
          </span>
        </div>
      </div>
      <div className="weather-row">
        {wx.hours.map((f) => (
          <span className="weather-hour" key={f.h}>
            <span className="wh-h">{f.h}</span>
            <span aria-hidden="true">{f.e}</span>
            <span className="wh-t">{f.t}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

const UPCOMING = [
  { text: "Building RAG Agent improvement/monitoring @ Powell (2000 docs)", dot: "#3b82d6" },
  { text: "NSF AI for MechE rules paper", dot: "#7a93ab" },
  { text: "Open-Claw for Robotics Proof of Concept", dot: "#38b6a5" },
  { text: "Emotions/Personalities in robotics software @ EDEN robotics", dot: "#5b7ea3" },
]

function UpcomingWidget() {
  return (
    <div className="widget widget-upcoming">
      <div className="up-head">
        <span className="up-title">Upcoming</span>
        <span className="up-count">{UPCOMING.length}</span>
      </div>
      <ul>
        {UPCOMING.map((u) => (
          <li key={u.text}>
            <span className="up-dot" style={{ borderColor: u.dot }} aria-hidden="true" />
            {u.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

function MusicWidget() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.volume = 0.45
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    }
  }

  const restartTrack = () => {
    const audio = audioRef.current
    if (audio) audio.currentTime = 0
  }

  return (
    <div className="widget widget-music">
      <audio ref={audioRef} src="/jazz.mp3" loop preload="none" />
      <span className={`music-art ${playing ? "spinning" : ""}`} aria-hidden="true">
        ♫
      </span>
      <div className="music-info">
        <span className="music-track">late night jazz</span>
        <span className="music-state">{playing ? "Now playing" : "Music is paused"}</span>
      </div>
      <div className="music-controls">
        <button aria-label="Restart track" onClick={restartTrack}>
          ◁
        </button>
        <button aria-label={playing ? "Pause" : "Play"} onClick={toggle}>
          {playing ? "❚❚" : "▶"}
        </button>
        <button aria-label="Restart track" onClick={restartTrack}>
          ▷
        </button>
      </div>
    </div>
  )
}

/* ------------------------- battery & photo widgets ------------------------- */

function BatteryRing({ icon, label, pct }) {
  const r = 17
  const c = 2 * Math.PI * r
  return (
    <div className="bat-ring" data-label={label}>
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke="#30d158"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * c} ${c}`}
          transform="rotate(-90 22 22)"
        />
        <text x="22" y="27" textAnchor="middle" fontSize="15">
          {icon}
        </text>
      </svg>
      <span className="bat-pct">{pct}%</span>
    </div>
  )
}

function BatteryWidget() {
  const [laptopPct, setLaptopPct] = useState(76)

  useEffect(() => {
    let battery
    const update = () => battery && setLaptopPct(Math.round(battery.level * 100))
    navigator.getBattery?.().then((b) => {
      battery = b
      update()
      b.addEventListener("levelchange", update)
    })
    return () => battery && battery.removeEventListener("levelchange", update)
  }, [])

  return (
    <div className="widget widget-battery" aria-label="Batteries">
      <BatteryRing icon="💻" label="MacBook" pct={laptopPct} />
      <BatteryRing icon="🎧" label="AirPods" pct={100} />
      <BatteryRing icon="📱" label="iPhone" pct={87} />
    </div>
  )
}

function PhotoWidget() {
  return (
    <div className="widget widget-photo" aria-hidden="true">
      <img src="/mountains.jpg" alt="" />
      <span className="photo-caption">the mountains are calling</span>
    </div>
  )
}

const STOCKS = [
  { sym: "NVDA", name: "NVIDIA", pct: "+2.4%", up: true },
  { sym: "SNOW", name: "Snowflake", pct: "+1.6%", up: true },
  { sym: "AAPL", name: "Apple", pct: "-0.8%", up: false },
  { sym: "SPX", name: "S&P 500", pct: "+0.5%", up: true },
]

function StocksWidget() {
  return (
    <div className="widget widget-stocks">
      <span className="widget-head">Stocks</span>
      <ul>
        {STOCKS.map((s) => (
          <li key={s.sym}>
            <span className="stock-sym">
              {s.sym}
              <span className="stock-name">{s.name}</span>
            </span>
            <span className={`stock-pct ${s.up ? "up" : "down"}`}>{s.pct}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const RACE = [
  { day: "FRI", ses: "Practice 1", time: "12:30" },
  { day: "SAT", ses: "Qualifying", time: "15:00" },
  { day: "SUN", ses: "Race", time: "14:00" },
]

function RaceWidget() {
  return (
    <div className="widget widget-race">
      <span className="widget-head">
        <span className="race-flag" aria-hidden="true">
          🏁
        </span>
        Race Weekend · Spa
      </span>
      <ul>
        {RACE.map((r) => (
          <li key={r.ses}>
            <span className="race-day">{r.day}</span>
            <span className="race-ses">{r.ses}</span>
            <span className="race-time">{r.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Ring({ r, pct, color }) {
  const c = 2 * Math.PI * r
  return (
    <>
      <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="7" opacity="0.22" />
      <circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * c} ${c}`}
        transform="rotate(-90 40 40)"
      />
    </>
  )
}

function ActivityWidget() {
  return (
    <div className="widget widget-activity">
      <svg viewBox="0 0 80 80" aria-hidden="true">
        <Ring r={33} pct={82} color="#fa2e55" />
        <Ring r={24} pct={64} color="#a6e82a" />
        <Ring r={15} pct={95} color="#04d5f0" />
      </svg>
      <ul className="act-legend">
        <li>
          <span style={{ color: "#fa2e55" }}>Move</span> 512/620 CAL
        </li>
        <li>
          <span style={{ color: "#a6e82a" }}>Exercise</span> 32/50 MIN
        </li>
        <li>
          <span style={{ color: "#04d5f0" }}>Stand</span> 11/12 HR
        </li>
      </ul>
    </div>
  )
}

/* ------------------------------- notification ------------------------------ */

function Notification({ onOpenWork }) {
  const [state, setState] = useState("hidden")

  useEffect(() => {
    const inT = setTimeout(() => setState("shown"), 1400)
    const outT = setTimeout(() => setState("hidden"), 11000)
    return () => {
      clearTimeout(inT)
      clearTimeout(outT)
    }
  }, [])

  return (
    <div
      className={`notif ${state === "shown" ? "notif-in" : ""}`}
      role="status"
      onClick={() => {
        setState("hidden")
        onOpenWork()
      }}
    >
      <span className="notif-icon" aria-hidden="true">
        💼
      </span>
      <div className="notif-body">
        <span className="notif-title">Message from Dhruv</span>
        <span className="notif-text">I'm what your team's been missing — check my work out 👀</span>
      </div>
      <button
        className="notif-close"
        aria-label="Dismiss"
        onClick={(e) => {
          e.stopPropagation()
          setState("hidden")
        }}
      >
        ✕
      </button>
    </div>
  )
}

/* ----------------------------------- dock ---------------------------------- */

function Dock({ wins, onOpen }) {
  const openIds = wins.map((w) => w.id)
  return (
    <nav className="dock" aria-label="Dock">
      <div className="dock-inner">
        {DESKTOP_ORDER.map((id) => (
          <button key={id} className="dock-item" data-label={APPS[id].title} onClick={() => onOpen(id)}>
            <span className={`dock-tile ${APPS[id].tile}`} aria-hidden="true">
              {APPS[id].emoji}
            </span>
            <span className="dock-dot" style={{ opacity: openIds.includes(id) ? 1 : 0 }} aria-hidden="true" />
          </button>
        ))}
        <span className="dock-sep" aria-hidden="true" />
        <a className="dock-item" data-label="GitHub" href={profile.github} target="_blank" rel="noreferrer">
          <span className="dock-tile tile-dark">
            <GithubIcon size={24} />
          </span>
          <span className="dock-dot" style={{ opacity: 0 }} aria-hidden="true" />
        </a>
        <a className="dock-item" data-label="LinkedIn" href={profile.linkedin} target="_blank" rel="noreferrer">
          <span className="dock-tile tile-linkedin">
            <LinkedinIcon size={24} />
          </span>
          <span className="dock-dot" style={{ opacity: 0 }} aria-hidden="true" />
        </a>
        <a className="dock-item" data-label="Email" href={`mailto:${profile.email}`}>
          <span className="dock-tile tile-mail">
            <MailIcon size={24} />
          </span>
          <span className="dock-dot" style={{ opacity: 0 }} aria-hidden="true" />
        </a>
        <span className="dock-sep" aria-hidden="true" />
        <button className="dock-item" data-label="Trash" onClick={() => {}}>
          <span className="dock-tile tile-trash" aria-hidden="true">
            🗑️
          </span>
          <span className="dock-dot" style={{ opacity: 0 }} aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}

/* ----------------------------------- app ---------------------------------- */

export default function App() {
  const [booted, setBooted] = useState(() => sessionStorage.getItem("booted") === "1")
  const [wins, setWins] = useState([])
  const zRef = useRef(10)

  const finishBoot = () => {
    sessionStorage.setItem("booted", "1")
    setBooted(true)
  }

  const openWindow = (id) => {
    zRef.current++
    setWins((ws) => {
      const existing = ws.find((w) => w.id === id)
      if (existing) {
        return ws.map((w) => (w.id === id ? { ...w, minimized: false, z: zRef.current } : w))
      }
      const n = ws.length
      const isMobile = window.innerWidth < 640
      const centered = id === "about"
      return [
        ...ws,
        {
          id,
          x: isMobile
            ? 8
            : centered
              ? Math.max(150, Math.round((window.innerWidth - APPS.about.width) / 2) - 170)
              : 170 + n * 36,
          y: isMobile ? 12 : centered ? Math.max(40, Math.round(window.innerHeight / 2) - 230) : 56 + n * 32,
          z: zRef.current,
          minimized: false,
          wide: false,
        },
      ]
    })
  }

  const closeWindow = (id) => setWins((ws) => ws.filter((w) => w.id !== id))
  const minimizeWindow = (id) => setWins((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)))
  const zoomWindow = (id) => setWins((ws) => ws.map((w) => (w.id === id ? { ...w, wide: !w.wide } : w)))
  const focusWindow = (id) => {
    zRef.current++
    setWins((ws) => ws.map((w) => (w.id === id ? { ...w, z: zRef.current } : w)))
  }
  const moveWindow = (id, x, y) => setWins((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)))

  const restart = () => {
    sessionStorage.removeItem("booted")
    setWins([])
    setBooted(false)
  }

  const openedOnce = useRef(false)
  useEffect(() => {
    if (booted && !openedOnce.current) {
      openedOnce.current = true
      openWindow("about")
    }
  }, [booted])

  if (!booted) return <BootScreen onDone={finishBoot} />

  return (
    <div className="os">
      <Wallpaper />
      <MenuBar onRestart={restart} />
      <main className="desktop">
        <div className="desktop-icons">
          {DESKTOP_ORDER.map((id) => (
            <button className="desktop-icon" key={id} onClick={() => openWindow(id)}>
              {APPS[id].icon === "folder" ? <MacFolderIcon /> : <MacFileIcon />}
              <span className="di-label">{APPS[id].title}</span>
            </button>
          ))}
        </div>
        <div className="desk-right">
          <WeatherWidget />
          <BatteryWidget />
          <UpcomingWidget />
        </div>
        <div className="desk-right2">
          <MusicWidget />
          <StocksWidget />
          <ActivityWidget />
          <RaceWidget />
        </div>
        <div className="desk-bottom-left">
          <PhotoWidget />
        </div>
        <Notification onOpenWork={() => openWindow("experience")} />
        {wins.map((w) => (
          <Window
            key={w.id}
            win={w}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onZoom={zoomWindow}
            onFocus={focusWindow}
            onMove={moveWindow}
          >
            {CONTENT[w.id]}
          </Window>
        ))}
      </main>
      <Dock wins={wins} onOpen={openWindow} />
    </div>
  )
}
