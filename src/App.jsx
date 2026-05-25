import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const [stars, setStars] = useState([])

  useEffect(() => {
    const generatedStars = []
    for (let i = 0; i < 150; i++) {
      generatedStars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4
      })
    }
    setStars(generatedStars)
  }, [])

  const handleShowMessage = () => {
    if (name.trim() === '') {
      alert('Masukkan nama dulu ya 💖')
      return
    }
    setShowMessage(true)
    createFloatingHearts()
    createConfetti()
  }

  const createFloatingHearts = () => {
    const heartsContainer = document.getElementById('hearts-container')
    const heartEmojis = ['💖', '💕', '❤️', '💗', '💝', '💓']

    for (let i = 0; i < 40; i++) {
      const heart = document.createElement('div')
      heart.className = 'floating-heart'
      heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
      heart.style.left = Math.random() * 100 + 'vw'
      heart.style.animationDuration = (3 + Math.random() * 4) + 's'
      heart.style.fontSize = (18 + Math.random() * 20) + 'px'
      heart.style.animationDelay = (Math.random() * 2) + 's'

      heartsContainer.appendChild(heart)

      setTimeout(() => {
        heart.remove()
      }, 8000)
    }
  }

  const createConfetti = () => {
    const confettiContainer = document.getElementById('confetti-container')
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ffa801', '#4a69bd', '#6a89cc', '#b8e994', '#78e08f']

    for (let i = 0; i < 80; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'confetti'
      confetti.style.left = Math.random() * 100 + 'vw'
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.animationDuration = (2 + Math.random() * 3) + 's'
      confetti.style.animationDelay = (Math.random() * 0.5) + 's'

      confettiContainer.appendChild(confetti)

      setTimeout(() => {
        confetti.remove()
      }, 6000)
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className="birthday-app">
      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>

      <div id="hearts-container" className="hearts-container"></div>
      <div id="confetti-container" className="confetti-container"></div>

      <div className="main-container">
        <div className="birthday-card" data-testid="birthday-card">
          <h1 className="title" data-testid="birthday-title">Happy Birthday</h1>
          <p className="subtitle">A little surprise made with love ✨</p>

          {!showMessage ? (
            <div className="input-section" data-testid="input-section">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama kamu..."
                className="name-input"
                data-testid="name-input"
                onKeyPress={(e) => e.key === 'Enter' && handleShowMessage()}
              />
              <button onClick={handleShowMessage} className="show-btn" data-testid="show-message-btn">
                Buka Pesan 💖
              </button>
            </div>
          ) : (
            <div className="message-section" data-testid="message-section">
              <div className="display-name" data-testid="display-name">Untuk {name} ✨</div>

              <div className="birthday-message" data-testid="birthday-message">
                <p>
                  Happy Birthday cintaku ❤️
                  <br />
                  <br />
                  Semoga tahun ini jadi tahun terbaik buat kamu.
                  Semoga kamu selalu sehat, bahagia, dan Semoga semua hal baik selalu datang ke hidup kamu.
                  <br />
                  <br />
                  Aku cuma mau bilang kalau aku bersyukur banget bisa kenal kamu sampai sekarang.
                  Makasih sudah bertahan sejauh ini bersama aku ✨
                </p>
              </div>

              <div className="love-heart" data-testid="love-heart">❤️</div>

              <button onClick={toggleMusic} className="music-btn" data-testid="music-btn">
                {isPlaying ? '⏸️ Pause Musik' : '🎵 Putar Musik'}
              </button>

              <div className="footer">Made with love by someone who cares about you.</div>
            </div>
          )}
        </div>
      </div>

      <audio
        ref={audioRef}
        src="https://customer-assets.emergentagent.com/job_love-birthday-32/artifacts/9cgopkjr_Rizkyfebian%20-%20Selamat%20Ulang%20tahun%20%28Lyrics%29.mp3"
        loop
      />
    </div>
  )
}

export default App
