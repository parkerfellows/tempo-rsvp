import './App.css'

// Placeholder download URL — replace with real Chrome Web Store link
const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/tempo-%E2%80%94-speed-reader/chkjmehhihgodjjkjkdmifgcpbeichkg?hl=en-US&utm_source=ext_sidebar'
// Path to the extension ZIP in /public — place the file at public/tempo-extension.zip
const EXTENSION_ZIP_URL = '/tempo-chrome.zip'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Science />
        <TryItOut />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

// ─── Nav ────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium text-white">
          <BookIcon />
          Tempo
        </div>
        <a
          href={CHROME_STORE_URL}
          className="text-sm px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-zinc-100 transition-colors"
        >
          Add to Chrome
        </a>
      </div>
    </header>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="py-24 px-6 text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border border-white/20 text-zinc-400 mb-8">
        <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
        Free Chrome Extension
      </div>

      <h1 className="text-5xl sm:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
        Read faster.<br />
        <span className="font-bold">
          Focus deeper.
        </span>
      </h1>

      <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto font-light">
        Tempo brings distraction-free reading and science-backed RSVP speed reading to every article on the web.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={CHROME_STORE_URL}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-zinc-100 transition-colors"
        >
          <ChromeIcon />
          Add to Chrome — It's free
        </a>
        <a
          href={EXTENSION_ZIP_URL}
          download="tempo-chrome.zip"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-zinc-300 font-light hover:bg-white/5 transition-colors"
        >
          <DownloadIcon />
          Download ZIP
        </a>
      </div>
      <ManualInstallSteps />

      {/* RSVP demo */}
      <div className="mt-16">
        <RSVPDemo />
      </div>
    </section>
  )
}

// ─── RSVP animated demo ──────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'

const DEMO_WORDS = [
  'Your', 'brain', 'can', 'process', 'words', 'much',
  'faster', 'than', 'you', 'normally', 'read', 'them.',
]

function RSVPDemo() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setIndex(i => {
        if (i >= DEMO_WORDS.length - 1) {
          setPlaying(false)
          return 0
        }
        return i + 1
      })
    }, 150)
    return () => clearInterval(id)
  }, [playing])

  const word = DEMO_WORDS[index]

  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-white/10 bg-zinc-950 shadow-xl overflow-hidden">
      {/* toolbar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
        <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
        <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
        <span className="ml-2 text-xs text-zinc-500">Tempo — Speed Reader</span>
      </div>

      {/* word display */}
      <div className="relative flex items-center justify-center h-24 select-none">
        {/* focus guides */}
        <div className="absolute inset-x-0 top-4 h-px bg-white/5"></div>
        <div className="absolute inset-x-0 bottom-4 h-px bg-white/5"></div>
        {/* ORP guide */}
        <div className="absolute top-4 bottom-4 left-1/2 w-px bg-white opacity-20"></div>

        <span className="font-mono text-3xl font-medium text-white relative">
          {playing || index > 0 ? (
            <>
              {word.slice(0, 1)}
              <span className="text-zinc-400 underline underline-offset-4">{word.slice(1, 2)}</span>
              {word.slice(2)}
            </>
          ) : (
            <span className="text-zinc-600 text-base font-light">Press play</span>
          )}
        </span>
      </div>

      {/* controls */}
      <div className="flex items-center justify-center gap-4 px-4 py-3 border-t border-white/10">
        <span className="text-xs font-mono text-zinc-500">400 WPM</span>
        <button
          onClick={() => { setIndex(0); setPlaying(p => !p) }}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white text-black hover:bg-zinc-100 transition-colors"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <span className="text-xs font-mono text-zinc-500">1 word</span>
      </div>
    </div>
  )
}

// ─── How It Works ────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      n: '1',
      title: 'Open any article',
      body: 'Navigate to a news article, blog post, or long-form page in Chrome.',
    },
    {
      n: '2',
      title: 'Launch the side panel',
      body: 'Click the Tempo icon to open a distraction-free reader right next to the page.',
    },
    {
      n: '3',
      title: 'Speed read with RSVP',
      body: 'Hit Speed Read to enter RSVP mode. Adjust WPM and chunk size to your comfort.',
    },
  ]

  return (
    <section className="py-20 px-6 bg-zinc-950 border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>How it works</SectionLabel>
        <h2 className="text-3xl font-light tracking-tight text-white mt-3 mb-12">
          Three steps to reading at full speed
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map(s => (
            <div key={s.n} className="flex flex-col gap-3">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold bg-white text-black">
                {s.n}
              </span>
              <h3 className="font-medium text-white">{s.title}</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Science ─────────────────────────────────────────────────────────────────

function Science() {
  const cards = [
    {
      title: 'Optimal Recognition Point (ORP)',
      body: 'Every word has an ORP — a specific character position where your brain fires recognition most efficiently. Tempo highlights this letter and aligns it to a fixed focal point, eliminating the eye-movement cost of saccades.',
      cite: 'Brysbaert & Vitu, 1998 · Rayner, 1998',
    },
    {
      title: 'Eliminating saccades',
      body: 'Normal reading spends ~30% of time on eye movements between words. RSVP removes saccades entirely by presenting words serially at a fixed point, reclaiming that processing time for comprehension.',
      cite: 'Rayner, 1998 · Just & Carpenter, 1980',
    },
    {
      title: 'Reduced subvocalization',
      body: 'At higher WPM rates (>400), the internal "voice" in your head cannot keep pace, training your brain to decode words visually rather than phonologically — a hallmark of expert readers.',
      cite: 'Hardyck & Petrinovich, 1970',
    },
    {
      title: 'Working memory & chunking',
      body: "Multi-word chunks (2–3 words per flash) leverage working memory's natural grouping capacity. Semantic units are processed together, improving both speed and retention compared to single-word RSVP.",
      cite: 'Miller, 1956 · Rayner et al., 2016',
    },
    {
      title: 'The Spritz effect',
      body: 'Fixed-position reading stabilises the perceptual span — the window of text your eye can usefully process in one fixation. By keeping the ORP stationary, Tempo maximises this span with zero repositioning cost.',
      cite: 'O\'Regan & Lévy-Schoen, 1987',
    },
    {
      title: 'Adaptive pacing',
      body: 'Comprehension drops sharply above individual threshold speeds. Tempo lets you dial in your exact WPM so you stay just inside your comfort zone — the sweet spot where speed and retention are both maximised.',
      cite: 'Masson, 1983 · Rayner et al., 2016',
    },
  ]

  return (
    <section id="science" className="py-20 px-6 max-w-5xl mx-auto">
      <SectionLabel>The science</SectionLabel>
      <h2 className="text-3xl font-light tracking-tight text-white mt-3 mb-4">
        Why RSVP works
      </h2>
      <p className="text-zinc-400 font-light mb-12 max-w-2xl">
        Rapid Serial Visual Presentation isn't a gimmick — it's grounded in decades of cognitive science on how humans process written language.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map(c => (
          <div
            key={c.title}
            className="rounded-2xl border border-white/10 bg-zinc-950 p-6 flex flex-col gap-3"
          >
            <h3 className="font-medium text-white leading-snug">{c.title}</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed flex-1">{c.body}</p>
            <p className="text-xs font-mono text-zinc-600 border-t border-white/10 pt-3">
              {c.cite}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Features ────────────────────────────────────────────────────────────────

function Features() {
  const items = [
    { icon: <EyeIcon />, title: 'Reader mode', body: 'Strips ads, navigation, and clutter — leaving just the text.' },
    { icon: <BoltIcon />, title: 'RSVP player', body: 'Play any article at 100–1000 WPM with real-time speed control.' },
    { icon: <ChunksIcon />, title: 'Word chunking', body: 'Flash 1, 2, or 3 words at a time to match your reading style.' },
    { icon: <KeyboardIcon />, title: 'Keyboard first', body: 'Space to play/pause, arrow keys to skip — hands stay on the keyboard.' },
    { icon: <SpeedIcon />, title: 'Custom speed', body: 'Dial in your exact WPM — from a leisurely 100 to a blazing 1000.' },
    { icon: <LockIcon />, title: 'Fully local', body: 'No data leaves your browser. No account. No tracking.' },
  ]

  return (
    <section className="py-20 px-6 bg-zinc-950 border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>Features</SectionLabel>
        <h2 className="text-3xl font-light tracking-tight text-white mt-3 mb-12">
          Everything you need, nothing you don't
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(f => (
            <div key={f.title} className="flex gap-4">
              <span className="mt-0.5 shrink-0 text-zinc-400">{f.icon}</span>
              <div>
                <h3 className="font-medium text-white mb-1">{f.title}</h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Try It Out ──────────────────────────────────────────────────────────────

const NORMAL_TEXT = `The human brain is remarkably adaptable. Scientists have found that with consistent practice, people can dramatically increase their reading speed without sacrificing comprehension. The key lies in reducing subvocalization, the habit of silently pronouncing each word, and training your eyes to scan more efficiently. Most adults read at around 200 to 300 words per minute, but trained readers can comfortably reach 500 or more.`

const RSVP_CHALLENGE_TEXT = `Working memory plays a crucial role in how quickly we absorb written language. When words appear one at a time at a fixed position, your brain no longer needs to track eye movements or reposition its focus. This frees up cognitive resources for deeper processing of meaning. Research shows that readers using serial visual presentation often report sharper focus and less fatigue during extended reading sessions.`

const RSVP_CHALLENGE_WORDS = RSVP_CHALLENGE_TEXT.split(/\s+/).filter(Boolean)
const RSVP_WPM = 400
const RSVP_MS = Math.round(60000 / RSVP_WPM)

const NORMAL_WORD_COUNT = NORMAL_TEXT.split(/\s+/).filter(Boolean).length

function TryItOut() {
  const [normalPhase, setNormalPhase] = useState<'idle' | 'reading' | 'done'>('idle')
  const [normalElapsed, setNormalElapsed] = useState(0)
  const normalStartRef = useRef<number>(0)

  const [rsvpPhase, setRsvpPhase] = useState<'idle' | 'reading' | 'done'>('idle')
  const [rsvpWordIdx, setRsvpWordIdx] = useState(0)
  const [rsvpElapsed, setRsvpElapsed] = useState(0)
  const rsvpStartRef = useRef<number>(0)

  // Tick the normal reading timer
  useEffect(() => {
    if (normalPhase !== 'reading') return
    const id = setInterval(() => setNormalElapsed(Date.now() - normalStartRef.current), 100)
    return () => clearInterval(id)
  }, [normalPhase])

  // Advance RSVP words
  useEffect(() => {
    if (rsvpPhase !== 'reading') return
    const id = setInterval(() => {
      setRsvpWordIdx(i => {
        if (i >= RSVP_CHALLENGE_WORDS.length - 1) {
          setRsvpElapsed(Date.now() - rsvpStartRef.current)
          setRsvpPhase('done')
          return i
        }
        return i + 1
      })
    }, RSVP_MS)
    return () => clearInterval(id)
  }, [rsvpPhase])

  function startNormal() {
    normalStartRef.current = Date.now()
    setNormalElapsed(0)
    setNormalPhase('reading')
  }
  function doneNormal() {
    setNormalElapsed(Date.now() - normalStartRef.current)
    setNormalPhase('done')
  }
  function startRsvp() {
    rsvpStartRef.current = Date.now()
    setRsvpWordIdx(0)
    setRsvpElapsed(0)
    setRsvpPhase('reading')
  }
  function reset() {
    setNormalPhase('idle'); setNormalElapsed(0)
    setRsvpPhase('idle'); setRsvpElapsed(0); setRsvpWordIdx(0)
  }

  const bothDone = normalPhase === 'done' && rsvpPhase === 'done'
  const speedup = bothDone && rsvpElapsed > 0 ? (normalElapsed / rsvpElapsed).toFixed(1) : null
  const normalWpm = normalElapsed > 0 ? Math.round((NORMAL_WORD_COUNT / normalElapsed) * 60000) : 0
  const rsvpWord = RSVP_CHALLENGE_WORDS[rsvpWordIdx] ?? ''

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>Try it out</SectionLabel>
        <h2 className="text-3xl font-light tracking-tight text-white mt-3 mb-4">
          Feel the difference yourself
        </h2>
        <p className="text-zinc-400 font-light mb-12 max-w-2xl">
          Read the first passage at your natural pace, then watch the second one fly by with RSVP. Both passages are the same length — very different experience.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {/* ── Normal reading card ── */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 flex flex-col gap-4 min-h-64">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-white">Normal reading</h3>
              <span className="text-xs font-mono text-zinc-500 border border-white/10 rounded-full px-2 py-0.5">your pace</span>
            </div>

            {normalPhase === 'idle' && (
              <>
                <p className="text-sm text-zinc-500 font-light leading-relaxed flex-1">
                  The passage will appear the moment you click Start. Read it as fast as you comfortably can, then click Done.
                </p>
                <button onClick={startNormal} className="self-start px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-100 transition-colors">
                  Start reading
                </button>
              </>
            )}

            {normalPhase === 'reading' && (
              <>
                <p className="text-sm text-zinc-300 font-light leading-relaxed flex-1">{NORMAL_TEXT}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="font-mono text-zinc-400 text-sm tabular-nums">{(normalElapsed / 1000).toFixed(1)}s</span>
                  <button onClick={doneNormal} className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-100 transition-colors">
                    Done
                  </button>
                </div>
              </>
            )}

            {normalPhase === 'done' && (
              <>
                <p className="text-sm text-zinc-500 font-light leading-relaxed flex-1">{NORMAL_TEXT}</p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-zinc-500 font-light mb-1">Your time</p>
                  <p className="font-mono text-3xl font-light text-white">
                    {(normalElapsed / 1000).toFixed(1)}<span className="text-lg text-zinc-500">s</span>
                  </p>
                  <p className="text-xs text-zinc-600 mt-1">≈ {normalWpm} WPM</p>
                </div>
              </>
            )}
          </div>

          {/* ── RSVP card ── */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 flex flex-col gap-4 min-h-64">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-white">RSVP reading</h3>
              <span className="text-xs font-mono text-zinc-500 border border-white/10 rounded-full px-2 py-0.5">{RSVP_WPM} WPM</span>
            </div>

            {rsvpPhase === 'idle' && (
              <>
                <p className="text-sm text-zinc-500 font-light leading-relaxed flex-1">
                  A similar-length passage, delivered word by word at {RSVP_WPM} WPM. Just watch — no scrolling, no eye movement required.
                </p>
                <button onClick={startRsvp} className="self-start px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-100 transition-colors">
                  Start RSVP
                </button>
              </>
            )}

            {rsvpPhase === 'reading' && (
              <>
                {/* Word display */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative flex items-center justify-center h-20 w-full select-none">
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10"></div>
                    <span className="font-mono text-3xl font-medium text-white relative z-10">
                      {rsvpWord.slice(0, 1)}
                      <span className="text-zinc-400 underline underline-offset-4">{rsvpWord.slice(1, 2)}</span>
                      {rsvpWord.slice(2)}
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-px bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/40 transition-none"
                    style={{ width: `${((rsvpWordIdx + 1) / RSVP_CHALLENGE_WORDS.length) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-zinc-600 text-xs">{rsvpWordIdx + 1} / {RSVP_CHALLENGE_WORDS.length}</span>
                  <span className="font-mono text-zinc-400 text-sm tabular-nums">{((Date.now() - rsvpStartRef.current) / 1000).toFixed(1)}s</span>
                </div>
              </>
            )}

            {rsvpPhase === 'done' && (
              <>
                <p className="text-sm text-zinc-500 font-light leading-relaxed flex-1">{RSVP_CHALLENGE_TEXT}</p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-zinc-500 font-light mb-1">Your time</p>
                  <p className="font-mono text-3xl font-light text-white">
                    {(rsvpElapsed / 1000).toFixed(1)}<span className="text-lg text-zinc-500">s</span>
                  </p>
                  <p className="text-xs text-zinc-600 mt-1">{RSVP_WPM} WPM</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Comparison banner */}
        {bothDone && speedup && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-zinc-500 font-light mb-1">Speed comparison</p>
              <p className="text-xl font-light text-white">
                You read <span className="font-bold text-white">{speedup}× faster</span> with RSVP
              </p>
            </div>
            <button onClick={reset} className="shrink-0 text-xs text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2">
              Try again
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="py-24 px-6 text-center max-w-2xl mx-auto">
      <h2 className="text-4xl font-light tracking-tight text-white mb-4">
        Start reading faster today
      </h2>
      <p className="text-zinc-400 font-light mb-8">
        Free, open-source, and respects your privacy. Add it to Chrome in seconds.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={CHROME_STORE_URL}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black font-medium hover:bg-zinc-100 transition-colors text-lg"
        >
          <ChromeIcon />
          Add to Chrome — It's free
        </a>
        <a
          href={EXTENSION_ZIP_URL}
          download="tempo-chrome.zip"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/20 text-zinc-300 font-light hover:bg-white/5 transition-colors text-lg"
        >
          <DownloadIcon />
          Download ZIP
        </a>
      </div>
      <ManualInstallSteps />
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <div className="flex items-center gap-2 font-medium text-zinc-400">
          <BookIcon />
          Tempo
        </div>
        <p className="font-light">Built with React + TypeScript. No tracking. No data collection.</p>
      </div>
    </footer>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium tracking-widest uppercase text-zinc-500">
      {children}
    </span>
  )
}

// ─── Manual Install Steps ────────────────────────────────────────────────────

function ManualInstallSteps() {
  const steps = [
    { n: '1', text: <>Download the ZIP above and extract it to a folder on your computer.</> },
    { n: '2', text: <>Open Chrome and go to <span className="font-mono text-zinc-300">chrome://extensions</span>.</> },
    { n: '3', text: <>Toggle on <span className="text-zinc-300 font-medium">Developer mode</span> in the top-right corner.</> },
    { n: '4', text: <>Click <span className="text-zinc-300 font-medium">Load unpacked</span> and select the extracted folder.</> },
    { n: '5', text: <>Tempo will appear in your extensions bar — pin it for easy access.</> },
  ]
  return (
    <div className="mt-6 mx-auto max-w-md text-left rounded-xl border border-white/10 bg-zinc-950 px-5 py-4">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">How to install manually</p>
      <ol className="space-y-2.5">
        {steps.map(s => (
          <li key={s.n} className="flex items-start gap-3 text-sm text-zinc-400 font-light">
            <span className="shrink-0 w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 text-xs flex items-center justify-center font-medium mt-0.5">{s.n}</span>
            <span>{s.text}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function ChromeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" y1="8" x2="12" y2="8" />
      <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
      <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function ChunksIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

function KeyboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
    </svg>
  )
}

function SpeedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 1 7.38 16.75" />
      <path d="M12 2a10 10 0 0 0-7.38 16.75" />
      <line x1="12" y1="12" x2="15.5" y2="8.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}


function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
