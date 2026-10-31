import { useEffect, useState } from 'react'
import './App.css'
import God from './assets/God.png'

function App() {
  const [installPrompt, setInstallPrompt] = useState(null)

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

  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="A Quiet Moment home">
          <span className="wordmark-mark" aria-hidden="true">✦</span>
          <span>A QUIET MOMENT</span>
        </a>
        {installPrompt ? (
          <button className="install-button" type="button" onClick={installApp}>
            Install app
          </button>
        ) : (
          <span className="header-note">A place to pause, pray, and begin again</span>
        )}
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

        <figure className="artwork">
          <div className="artwork-frame">
            <img src={God} alt="Traditional icon depicting the Holy Trinity" />
          </div>
          <figcaption><span aria-hidden="true">✧</span> A moment of stillness</figcaption>
        </figure>

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
