'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Users, Cpu, RefreshCw, ArrowLeft } from 'lucide-react'

function CreativeLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-purple-700">
      <div className="loader">
        <div className="cell d-0"></div>
        <div className="cell d-1"></div>
        <div className="cell d-2"></div>
        <div className="cell d-3"></div>
        <div className="cell d-1"></div>
        <div className="cell d-2"></div>
        <div className="cell d-3"></div>
        <div className="cell d-4"></div>
        <div className="cell d-2"></div>
        <div className="cell d-3"></div>
        <div className="cell d-4"></div>
        <div className="cell d-5"></div>
        <div className="cell d-3"></div>
        <div className="cell d-4"></div>
        <div className="cell d-5"></div>
        <div className="cell d-6"></div>
      </div>
      <style jsx>{`
        .loader {
          --cell-size: 52px;
          --cell-spacing: 1px;
          --cells: 4;
          --total-size: calc(var(--cells) * (var(--cell-size) + 2 * var(--cell-spacing)));
          display: flex;
          flex-wrap: wrap;
          width: var(--total-size);
          height: var(--total-size);
        }
        .cell {
          flex: 0 0 var(--cell-size);
          margin: var(--cell-spacing);
          background-color: transparent;
          box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          animation: 1.5s ripple ease infinite;
        }
        .d-1 { animation-delay: 100ms; }
        .d-2 { animation-delay: 200ms; }
        .d-3 { animation-delay: 300ms; }
        .d-4 { animation-delay: 400ms; }
        .d-5 { animation-delay: 500ms; }
        .d-6 { animation-delay: 600ms; }
        @keyframes ripple {
          0% { background-color: transparent; }
          30% { background-color: rgba(255, 255, 255, 0.3); }
          60% { background-color: transparent; }
          100% { background-color: transparent; }
        }
      `}</style>
    </div>
  )
}

function Square({ value, onSquareClick }) {
  return (
    <motion.button
      className="w-20 h-20 bg-purple-200 border border-purple-400 rounded-lg text-4xl font-bold text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
      onClick={onSquareClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {value}
    </motion.button>
  )
}

function Board({ xIsNext, squares, onPlay, playerNames }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = `Winner: ${playerNames[winner]}`
  } else if (squares.every(Boolean)) {
    status = 'Draw!'
  } else {
    status = `Next player: ${playerNames[xIsNext ? 'X' : 'O']}`
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-2xl font-bold text-purple-800">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  )
}

function ModeSelector({ onSelectMode }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-white mb-4">Select Game Mode</h2>
      <motion.button
        className="px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 flex items-center"
        onClick={() => onSelectMode('multiplayer')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Users className="mr-2" /> Multiplayer
      </motion.button>
      <motion.button
        className="px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 flex items-center"
        onClick={() => onSelectMode('computer')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Cpu className="mr-2" /> Player vs Computer
      </motion.button>
    </div>
  )
}

function PlayerSelector({ onSelectPlayer, onBackToMainMenu }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-white mb-4">Choose Your Symbol</h2>
      <div className="flex gap-4">
        <motion.button
          className="px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          onClick={() => onSelectPlayer('X')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          X
        </motion.button>
        <motion.button
          className="px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          onClick={() => onSelectPlayer('O')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          O
        </motion.button>
      </div>
      <BackToMainMenuButton onClick={onBackToMainMenu} />
    </div>
  )
}

function PlayerNamePopup({ onSubmit, onBackToMainMenu }) {
  const [playerX, setPlayerX] = useState('Player X')
  const [playerO, setPlayerO] = useState('Player O')

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Enter Player Names</h2>
        <div className="mb-4">
          <label htmlFor="playerX" className="block text-sm font-medium text-gray-700">Player X</label>
          <input
            type="text"
            id="playerX"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="playerO" className="block text-sm font-medium text-gray-700">Player O</label>
          <input
            type="text"
            id="playerO"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <motion.button
          className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          onClick={() => onSubmit({ X: playerX, O: playerO })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Game
        </motion.button>
        <BackToMainMenuButton onClick={onBackToMainMenu} className="mt-4" />
      </motion.div>
    </motion.div>
  )
}

function GameEndPopup({ winner, isDraw, playerNames, gameMode, onRestart, onBackToMainMenu }) {
  let title, message
  if (isDraw) {
    title = "It's a Draw!"
    message = "The game ended in a tie."
  } else if (gameMode === 'multiplayer') {
    title = "Congratulations!"
    message = `${playerNames[winner]} wins!`
  } else {
    if (winner === 'X') {
      title = "Congratulations!"
      message = "You win!"
    } else {
      title = "Better luck next time!"
      message = "The computer wins."
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <h2 className="text-3xl font-bold text-purple-800 mb-4">{title}</h2>
        <p className="text-xl mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <motion.button
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 flex items-center"
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="mr-2" /> Restart
          </motion.button>
          <BackToMainMenuButton onClick={onBackToMainMenu} />
        </div>
      </motion.div>
    </motion.div>
  )
}

function BackToMainMenuButton({ onClick, className = '' }) {
  return (
    <motion.button
      className={`px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 flex items-center ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft className="mr-2" /> Back to Main Menu
    </motion.button>
  )
}

function Watermark() {
  return (
    <div className="fixed bottom-2 left-2 text-white text-sm opacity-50">
      Created by: Kuldeep Sahani
    </div>
  )
}

export default function Game() {
  const [loading, setLoading] = useState(true)
  const [gameMode, setGameMode] = useState(null)
  const [playerSymbol, setPlayerSymbol] = useState(null)
  const [playerNames, setPlayerNames] = useState({ X: 'Player X', O: 'Player O' })
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [showHistory, setShowHistory] = useState(false)
  const [winner, setWinner] = useState(null)
  const [isDraw, setIsDraw] = useState(false)
  const [showPlayerNamePopup, setShowPlayerNamePopup] = useState(false)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)

    const gameWinner = calculateWinner(nextSquares)
    if (gameWinner) {
      setWinner(gameWinner)
    } else if (nextSquares.every(Boolean)) {
      setIsDraw(true)
    } else if (gameMode === 'computer' && !gameWinner) {
      setTimeout(() => {
        const computerSymbol = playerSymbol === 'X' ? 'O' : 'X'
        const computerMove = getComputerMove(nextSquares, computerSymbol)
        const computerSquares = nextSquares.slice()
        computerSquares[computerMove] = computerSymbol
        setHistory([...nextHistory, computerSquares])
        setCurrentMove(nextHistory.length)
        const computerWinner = calculateWinner(computerSquares)
        if (computerWinner) {
          setWinner(computerWinner)
        } else if (computerSquares.every(Boolean)) {
          setIsDraw(true)
        }
      }, 500)
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  function getComputerMove(squares, computerSymbol) {
    // Check for winning move
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        const testSquares = squares.slice()
        testSquares[i] = computerSymbol
        if (calculateWinner(testSquares) === computerSymbol) {
          return i
        }
      }
    }

    // Check for blocking move
    const playerSymbol = computerSymbol === 'X' ? 'O' : 'X'
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        const testSquares = squares.slice()
        testSquares[i] = playerSymbol
        if (calculateWinner(testSquares) === playerSymbol) {
          return i
        }
      }
    }

    // Take center if available
    if (!squares[4]) return 4

    // Take a corner
    const corners = [0, 2, 6, 8]
    const availableCorners = corners.filter(i => !squares[i])
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)]
    }

    // Take any available side
    const sides = [1, 3, 5, 7]
    const availableSides = sides.filter(i => !squares[i])
    if (availableSides.length > 0) {
      return availableSides[Math.floor(Math.random() * availableSides.length)]
    }

    // No moves available
    return -1
  }

  function handleRestart() {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
    setWinner(null)
    setIsDraw(false)
    if (gameMode === 'multiplayer') {
      setShowPlayerNamePopup(true)
    }
  }

  function handleModeSelect(mode) {
    setGameMode(mode)
    if (mode === 'multiplayer') {
      setShowPlayerNamePopup(true)
    }
  }

  function handlePlayerNameSubmit(names) {
    setPlayerNames(names)
    setShowPlayerNamePopup(false)
  }

  function handleBackToMainMenu() {
    setGameMode(null)
    setPlayerSymbol(null)
    setPlayerNames({ X: 'Player X', O: 'Player O' })
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
    setShowHistory(false)
    setWinner(null)
    setIsDraw(false)
    setShowPlayerNamePopup(false)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = 'Go to move #' + move
    } else {
      description = 'Go to game start'
    }
    return (
      <li key={move} className="mb-2">
        <motion.button
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          onClick={() => jumpTo(move)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {description}
        </motion.button>
      </li>
    )
  })

  if (loading) {
    return <CreativeLoader />
  }

  if (!gameMode) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600">
        <ModeSelector onSelectMode={handleModeSelect} />
        <Watermark />
      </div>
    )
  }

  if (gameMode === 'computer' && !playerSymbol) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600">
        <PlayerSelector onSelectPlayer={setPlayerSymbol} onBackToMainMenu={handleBackToMainMenu} />
        <Watermark />
      </div>
    )
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-white mb-8">Tic-Tac-Toe</h1>
      <div className="flex flex-col items-center gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <Board 
            xIsNext={gameMode === 'computer' 
              ? currentMove % 2 === 0 
                ? playerSymbol === 'X' 
                : playerSymbol === 'O' 
              : xIsNext
            } 
            squares={currentSquares} 
            onPlay={handlePlay}
            playerNames={playerNames}
          />
        </div>
        <div className="w-full max-w-md">
          <motion.button
            className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 flex items-center justify-center"
            onClick={() => setShowHistory(!showHistory)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showHistory ? (
              <>
                Hide History <ChevronUp className="ml-2" />
              </>
            ) : (
              <>
                Show History <ChevronDown className="ml-2" />
              </>
            )}
          </motion.button>
          <AnimatePresence>
            {showHistory && (
              <motion.div
                className="bg-white p-8 rounded-lg shadow-lg mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-purple-800 mb-4">Game History</h2>
                <ol className="list-decimal list-inside">{moves}</ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <BackToMainMenuButton onClick={handleBackToMainMenu} />
      </div>
      <AnimatePresence>
        {(winner || isDraw) && (
          <GameEndPopup
            winner={winner}
            isDraw={isDraw}
            playerNames={playerNames}
            gameMode={gameMode}
            onRestart={handleRestart}
            onBackToMainMenu={handleBackToMainMenu}
          />
        )}
        {showPlayerNamePopup && (
          <PlayerNamePopup onSubmit={handlePlayerNameSubmit} onBackToMainMenu={handleBackToMainMenu} />
        )}
      </AnimatePresence>
      <Watermark />
    </motion.div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}