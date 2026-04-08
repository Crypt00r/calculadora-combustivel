import { useState } from 'react'

// svgs inline pra nao precisar de imagem externa
const IconeBomba = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-20 h-20">
    <rect x="15" y="35" width="50" height="58" rx="4" fill="#e53935" />
    <rect x="22" y="42" width="36" height="18" rx="3" fill="#fff" />
    <text x="40" y="56" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#333">0100</text>
    <rect x="10" y="90" width="60" height="8" rx="3" fill="#78909c" />
    <rect x="65" y="30" width="8" height="38" rx="3" fill="#78909c" />
    <path d="M73 30 Q90 28 88 15 Q86 5 80 8" stroke="#78909c" strokeWidth="5" fill="none" strokeLinecap="round"/>
    <rect x="76" y="6" width="14" height="8" rx="3" fill="#546e7a" />
  </svg>
)

const IconeInfo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" className="w-9 h-9">
    <rect x="2" y="2" width="48" height="44" rx="10" fill="#5c9ee6" />
    <polygon points="14,46 8,58 28,46" fill="#5c9ee6" />
    <circle cx="26" cy="15" r="3.5" fill="#fff" />
    <rect x="22.5" y="22" width="7" height="18" rx="3" fill="#fff" />
  </svg>
)

// usa o fuso horario de brasilia pra nao dar ruim pra quem acessa de outro lugar
function getSaudacao() {
  const hora = parseInt(
    new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      hour12: false,
    })
  )
  if (hora >= 5 && hora < 12) return 'Bom dia'
  if (hora >= 12 && hora < 18) return 'Boa tarde'
  return 'Boa noite'
}

function App() {
  const [alcool, setAlcool] = useState('')
  const [gasolina, setGasolina] = useState('')
  const [gnv, setGnv] = useState('')
  const [resultado, setResultado] = useState(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  function moverMouse(e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    setMouse({ x, y })
  }

  function calcular(e) {
    e.preventDefault()
    const a = parseFloat(alcool)
    const g = parseFloat(gasolina)
    const n = gnv ? parseFloat(gnv) : null
    if (!a || !g) return

    // meio gambiarra mas funciona kkkk
    // regra dos 70%: se alcool custar menos de 70% da gasolina, compensa
    // pro GNV uso 65% porque o rendimento é diferente nos carros adaptados
    const normA = a / 0.70
    const normG = g
    const normN = n !== null ? n / 0.65 : Infinity

    const menor = Math.min(normA, normG, normN)
    let melhor
    if (menor === normN) melhor = 'gnv'
    else if (menor === normA) melhor = 'alcool'
    else melhor = 'gasolina'

    setResultado({ melhor, a, g, n })
  }

  function limpar() {
    setAlcool('')
    setGasolina('')
    setGnv('')
    setResultado(null)
  }

  const msgs = {
    alcool: 'Álcool tá mais barato! 🌿',
    gasolina: 'Gasolina ganha dessa vez! ⛽',
    gnv: 'GNV é o mais em conta! 🔥',
  }

  const cores = {
    alcool: 'bg-green-500/10 border-green-400/30',
    gasolina: 'bg-orange-500/10 border-orange-400/30',
    gnv: 'bg-blue-500/10 border-blue-400/30',
  }

  const combustiveis = resultado ? [
    { key: 'alcool', label: 'Álcool', preço: resultado.a },
    { key: 'gasolina', label: 'Gasolina', preço: resultado.g },
    resultado.n !== null && { key: 'gnv', label: 'GNV (m³)', preço: resultado.n },
  ].filter(Boolean) : []

  return (
    <div
      onMouseMove={moverMouse}
      className="relative min-h-screen bg-[#180428] overflow-hidden flex items-center justify-center p-4"
    >
      {/* blobs que flutuam no fundo, cada um com velocidade diferente */}
      <div className="blob blob-1" style={{ transform: `translate(${mouse.x * -40}px, ${mouse.y * -40}px)` }} />
      <div className="blob blob-2" style={{ transform: `translate(${mouse.x * 30}px, ${mouse.y * 25}px)` }} />
      <div className="blob blob-3" style={{ transform: `translate(${mouse.x * -20}px, ${mouse.y * 35}px)` }} />

      <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-sm">

        <div className="text-center">
          <p className="saudacao text-3xl font-black leading-tight">
            {getSaudacao()}, Senhor(a) 👋
          </p>
          <p className="saudacao-sub mt-1 text-sm">
            Álcool, gasolina ou gás? Vamos calcular.
          </p>
        </div>

        <main className="glass-card w-full p-8 flex flex-col items-center gap-6">

          <IconeBomba />

          <h1 className="text-2xl font-bold text-white text-center">
            Qual combustível vale mais?
          </h1>

          <form onSubmit={calcular} className="w-full flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                Álcool — preço por litro
              </label>
              <input
                type="number"
                placeholder="ex: 4.90"
                min="1"
                step="0.01"
                value={alcool}
                onChange={e => setAlcool(e.target.value)}
                required
                className="glass-input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                Gasolina — preço por litro
              </label>
              <input
                type="number"
                placeholder="ex: 6.50"
                min="1"
                step="0.01"
                value={gasolina}
                onChange={e => setGasolina(e.target.value)}
                required
                className="glass-input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wide flex justify-between">
                <span>GNV — preço por m³</span>
                <span className="text-white/30 normal-case font-normal">(opcional)</span>
              </label>
              <input
                type="number"
                placeholder="ex: 3.80"
                min="1"
                step="0.01"
                value={gnv}
                onChange={e => setGnv(e.target.value)}
                className="glass-input"
              />
            </div>

            <div className="flex gap-3 mt-1">
              <button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-purple-900/50"
              >
                Calcular
              </button>

              {resultado && (
                <button
                  type="button"
                  onClick={limpar}
                  className="px-4 border border-white/20 text-white/50 hover:border-white/40 hover:text-white/80 rounded-xl text-sm transition-all cursor-pointer"
                >
                  Limpar
                </button>
              )}
            </div>
          </form>

          {resultado && (
            <section className={`anima w-full rounded-2xl p-5 flex flex-col items-center gap-4 border ${cores[resultado.melhor]}`}>

              <IconeInfo />

              <p className="text-lg font-bold text-white text-center">
                {msgs[resultado.melhor]}
              </p>

              {/* lista de combustiveis com destaque no vencedor */}
              <div className="flex flex-col gap-2 w-full">
                {combustiveis.map(item => (
                  <div
                    key={item.key}
                    className={`flex justify-between items-center rounded-xl px-4 py-3 border transition-all ${resultado.melhor === item.key ? 'bg-white/10 border-purple-400/50' : 'bg-white/5 border-white/10'}`}
                  >
                    <span className="text-sm text-white/60 font-semibold uppercase tracking-wide">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white">
                        R$ {item.preço.toFixed(2)}
                      </span>
                      {resultado.melhor === item.key && (
                        <span className="text-xs bg-purple-500/40 text-purple-200 px-2 py-0.5 rounded-full font-semibold">
                          melhor
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* regra usada no calculo */}
              <p className="text-xs text-white/40 text-center leading-relaxed">
                regra: álcool &lt; 70% da gasolina
                {resultado.n !== null && ' • gnv < 65% da gasolina'}
              </p>
            </section>
          )}

        </main>

        {/* credits */}
        <p className="text-white/25 text-xs text-center">
          feito por{' '}
          <span className="text-white/50 font-semibold">ygorsec</span>
          {' '}•{' '}
          <a
            href="https://github.com/Crypt00r"
            target="_blank"
            rel="noreferrer"
            className="text-purple-300/50 hover:text-purple-300 transition-colors underline underline-offset-2"
          >
            github.com/Crypt00r
          </a>
        </p>

      </div>
    </div>
  )
}

export default App