import { useEffect, useState } from 'react'
import './App.css'
import God from './assets/God.png'

const morePrayers = [
  {
    title: 'A prayer for peace',
    lead: 'Lord, still my heart,',
    body: [
      'I am carrying more than I should, and my mind is restless. Please quiet the noise around me and the fear within me. Help me remember that Your peace is stronger than my confusion.',
      'When I feel overwhelmed, remind me to breathe and trust You. Teach me to release what I cannot control and lean into Your presence. Let Your calm settle over my thoughts and my day.',
      'I choose to rest in You, knowing that even in uncertainty, You are near. Keep me steady, Lord, and fill me with the peace that only You can give.'
    ],
    signoff: 'I rest in Your peace, Lord.',
    verse: 'The Lord gives strength to his people; the Lord blesses his people with peace.',
    verseRef: 'Psalm 29:11'
  },
  {
    title: 'A prayer for strength',
    lead: 'Father, I need You,',
    body: [
      'Some days feel heavier than others, and I feel tired in ways I cannot explain. Please strengthen me where I am weak and keep me from giving up. You know the weight I carry, and You see the effort it takes to keep going.',
      'Give me courage for the next step, hope for the next morning, and faith to keep moving forward. When I feel discouraged, remind me that Your love is steady and Your grace is enough.',
      'Let me walk through this season with perseverance, trusting that You are shaping me even when I cannot yet see the full picture.'
    ],
    signoff: 'I will keep going because You are with me.',
    verse: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
    verseRef: 'Joshua 1:9'
  },
  {
    title: 'A prayer for guidance',
    lead: 'Dear God, lead me,',
    body: [
      'I do not always know which way to turn. The road ahead feels uncertain, but I know You are the One who sees the whole path. Please guide my steps and help me listen for Your voice above all others.',
      'Show me what to say, where to go, and what to let go of. Give me wisdom to make good choices and humility to trust Your timing. Help me to follow You with faith, even when I cannot see the outcome yet.',
      'Let my life reflect Your heart, and may my decisions bring peace, purpose, and honour to You.'
    ],
    signoff: 'I trust Your direction, Lord.',
    verse: 'Trust in the Lord with all your heart and lean not on your own understanding.',
    verseRef: 'Proverbs 3:5'
  }
]

function App() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false

    const savedTheme = window.localStorage.getItem('a-quiet-moment-theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [activePrayerIndex, setActivePrayerIndex] = useState(0)

  useEffect(() => {
    document.body.dataset.theme = darkMode ? 'dark' : 'light'
    window.localStorage.setItem('a-quiet-moment-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const handleInstallAvailable = (event) => {
      event.preventDefault()
      setInstallPrompt(event)
    }

    const handleInstalled = () => setInstallPrompt(null)

    window.addEventListener('beforeinstallprompt', handleInstallAvailable)
    window.addEventListener('appinstalled', handleInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallAvailable)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  const installApp = async () => {
    if (!installPrompt) return

    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  const featuredPrayer = morePrayers[activePrayerIndex]

  const changePrayer = (direction) => {
    setActivePrayerIndex((currentIndex) => {
      const nextIndex = (currentIndex + direction + morePrayers.length) % morePrayers.length
      return nextIndex
    })
  }

  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="A Quiet Moment home">
          <span className="wordmark-mark" aria-hidden="true">✦</span>
          <span>A QUIET MOMENT</span>
        </a>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setDarkMode((current) => !current)}
          >
            <span aria-hidden="true">{darkMode ? '☀' : '☾'}</span>
            {darkMode ? 'Light' : 'Dark'}
          </button>

          {installPrompt ? (
            <button className="install-button" type="button" onClick={installApp}>
              Install app
            </button>
          ) : (
            <span className="header-note">A Christian place to pause, pray, and begin again</span>
          )}
        </div>
      </header>

      <section className="hero" id="home" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true" /> A PRAYER FOR A NEW BEGINNING</p>
          <h1 id="page-title">You are held.<br /><em>There is hope.</em></h1>
          <p className="intro">
            When life feels heavy, take a breath and remember: you don’t have to
            carry it all alone.
          </p>
          <a className="read-link" href="#prayer">
            Read today’s prayer <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="book-panel" role="group" aria-label="Featured prayer">
          <div className="book-spine" aria-hidden="true" />
          <div className="book-page" key={activePrayerIndex} aria-live="polite">
            <p className="book-badge">Today’s prayer</p>
            <h3>{featuredPrayer.title}</h3>
            <p className="book-lead">{featuredPrayer.lead}</p>
            <div className="book-controls">
              <button type="button" onClick={() => changePrayer(-1)} aria-label="View previous prayer">←</button>
              <span className="book-page-count">{String(activePrayerIndex + 1).padStart(2, '0')} / {String(morePrayers.length).padStart(2, '0')}</span>
              <button type="button" onClick={() => changePrayer(1)} aria-label="View next prayer">→</button>
            </div>
          </div>
          <figure className="artwork book-artwork">
            <div className="artwork-frame">
              <img src={God} alt="Traditional icon depicting the Holy Trinity" />
            </div>
            <figcaption><span aria-hidden="true">✧</span> A moment of stillness</figcaption>
          </figure>
        </div>

        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
      </section>

      <section className="prayer-section" id="prayer" aria-labelledby="prayer-title">
        <div className="section-heading">
          <p className="eyebrow">TAKE A MOMENT</p>
          <h2 id="prayer-title">A prayer for change</h2>
        </div>

        <article className="prayer-card">
          <div className="prayer-symbol" aria-hidden="true">✦</div>
          <p className="prayer-lead">Dear Heavenly Father,</p>
          <div className="prayer-body">
            <p>
              I come before You with a humble heart. I am tired of my struggles,
              my worries, and my disappointments. Lord, please transform my life.
            </p>
            <p>
              Open doors that no one can close. Give me strength when I feel weak,
              hope when I feel lost, and wisdom to make the right decisions.
              Remove everything that is holding me back.
            </p>
            <p>
              Bless my family, my dreams, my work, and my future. Let my life
              become a testimony of Your goodness. I don’t know what tomorrow
              holds, but I trust You, Lord. Please give me a new beginning.
            </p>
          </div>
          <p className="prayer-signoff">I trust You, Lord. My life is in Your hands.</p>
          <div className="prayer-footer">
            <span className="footer-rule" aria-hidden="true" />
            <p>“With God, all things are possible.” <span>Matthew 19:26</span></p>
            <span className="footer-rule" aria-hidden="true" />
          </div>
          <p className="amen">Amen <span aria-hidden="true">✦</span></p>
        </article>

        <div className="more-prayers" aria-labelledby="more-prayers-title">
          <div className="section-heading section-heading-inline">
            <p className="eyebrow">MORE PRAYERS</p>
            <h2 id="more-prayers-title">For every season of a Christian walk</h2>
          </div>

          <div className="prayer-grid">
            {morePrayers.map((prayer) => (
              <article className="prayer-card prayer-mini" key={prayer.title}>
                <div className="prayer-symbol" aria-hidden="true">✦</div>
                <p className="prayer-lead">{prayer.lead}</p>
                <div className="prayer-body">
                  {prayer.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className="prayer-signoff">{prayer.signoff}</p>
                <div className="prayer-footer prayer-footer-compact">
                  <span className="footer-rule" aria-hidden="true" />
                  <p>“{prayer.verse}” <span>{prayer.verseRef}</span></p>
                  <span className="footer-rule" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>MAKE SPACE FOR HOPE</span>
        <span aria-hidden="true">·</span>
        <span>ONE BREATH AT A TIME</span>
        <p className="install-hint">On Android: open in Chrome, tap ⋮, then choose “Install app” or “Add to Home screen”.</p>
      </footer>
    </main>
  )
}

export default App
