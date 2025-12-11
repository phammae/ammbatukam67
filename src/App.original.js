import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Info } from 'lucide-react';

const SlotMachine = () => {
  const [reels, setReels] = useState([
    [0, 0, 0], [1, 1, 1], [2, 2, 2], [3, 3, 3], [4, 4, 4]
  ]);
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(10000);
  const [bet, setBet] = useState(100);
  const [jackpot, setJackpot] = useState(921.82);
  const [message, setMessage] = useState('READY TO SPIN');
  const [spinCount, setSpinCount] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [showFlag, setShowFlag] = useState(false);
  const [muted, setMuted] = useState(true);
  const [glowEffect, setGlowEffect] = useState(false);
  const [secretProgress, setSecretProgress] = useState([]);
  const [reelSpinOffset, setReelSpinOffset] = useState([0, 0, 0, 0, 0]);
  
  // Symbol configuration - EASY TO REPLACE WITH PNG FILES
  const symbols = [
    { id: 0, emoji: '💎', name: 'diamond', image: null }, // Replace with: image: 'symbols/diamond.png'
    { id: 1, emoji: '💰', name: 'money', image: null },   // Replace with: image: 'symbols/money.png'
    { id: 2, emoji: '7️⃣', name: 'seven', image: null },   // Replace with: image: 'symbols/seven.png'
    { id: 3, emoji: '🍀', name: 'clover', image: null },  // Replace with: image: 'symbols/clover.png'
    { id: 4, emoji: '⭐', name: 'star', image: null },    // Replace with: image: 'symbols/star.png'
    { id: 5, emoji: '♥️', name: 'bar', image: null },    // Replace with: image: 'symbols/bar.png'
    { id: 6, emoji: '🔔', name: 'bell', image: null }     // Replace with: image: 'symbols/bell.png'
  ];
  
  const audioRef = useRef(null);
  
  // Secret winning conditions
  const _0x1337 = 13;
  const _0x4269 = [0, 4, 0, 4, 0]; // diamond-star-diamond-star-diamond
  const _0xdead = 42;
  
  useEffect(() => {
    console.log('%c🎰 AMMBATUKAM67 SLOT MACHINE 🎰', 'font-size: 20px; color: #ffd700; font-weight: bold;');
    console.log('%cDeveloper Tools Detected! 👀', 'font-size: 14px; color: #ff4444;');
    console.log('%cHint: Something special happens at lucky spins...', 'color: #44ff44;');
    console.log('%cCurrent spin count:', 'color: #4444ff;', spinCount);
    
    const originalBalance = balance;
    setTimeout(() => {
      if (balance > originalBalance + 50000 && spinCount < 10) {
        console.log('%c⚠️ CHEATER DETECTED! Balance manipulation!', 'color: red; font-size: 16px;');
        setMessage('🚫 CHEATER DETECTED!');
      }
    }, 100);
    
    // Jackpot counter animation
    const interval = setInterval(() => {
      setJackpot(prev => prev + Math.random() * 0.05);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [balance, spinCount]);
  
  const playSound = (type) => {
    if (muted) return;
    console.log(`🔊 Playing sound: ${type}`);
    // To add audio: new Audio(`sounds/${type}.mp3`).play()
  };
  
  const checkWin = (finalReels, count) => {
    const centerLine = finalReels.map(reel => reel[1]);
    
    // All 5 match
    if (centerLine.every(s => s === centerLine[0])) {
      if (centerLine[0] === 2) return { type: 'MEGA WIN', multiplier: 50 }; // 7️⃣
      if (centerLine[0] === 0) return { type: 'JACKPOT', multiplier: 100 }; // 💎
      return { type: 'BIG WIN', multiplier: 20 };
    }
    
    // First 3 match
    if (centerLine[0] === centerLine[1] && centerLine[1] === centerLine[2]) {
      return { type: 'WIN', multiplier: 5 };
    }
    
    // SECRET CONDITION 1: Spin #13 with pattern
    if (count === _0x1337) {
      console.log('%c🔮 LUCKY SPIN #13 DETECTED!', 'color: purple; font-size: 16px;');
      if (centerLine[0] === 0 && centerLine[2] === 4 && centerLine[4] === 0) {
        return { type: 'SECRET_1', multiplier: 0 };
      }
    }
    
    // SECRET CONDITION 2: Exact pattern after 3 wins
    if (totalWins >= 3 && JSON.stringify(centerLine) === JSON.stringify(_0x4269)) {
      return { type: 'SECRET_2', multiplier: 0 };
    }
    
    // SECRET CONDITION 3: Multiple of 42 with low balance
    if (count > 0 && count % _0xdead === 0 && balance < 1000) {
      console.log('%c🍀 LUCKY NUMBER COMBO!', 'color: green; font-size: 16px;');
      return { type: 'SECRET_3', multiplier: 0 };
    }
    
    return null;
  };
  
  const revealFlag = (secretType) => {
    const flagParts = ['UbigCTF{', 'GaC0oORRrrr_K4n', '9gg_6767}'];
    const fullFlag = flagParts.join('');
    
    setShowFlag(true);
    setGlowEffect(true);
    playSound('jackpot');
    
    console.log('%c' + '═'.repeat(50), 'color: gold;');
    console.log('%c🎊 CONGRATULATIONS! SECRET UNLOCKED! 🎊', 'color: gold; font-size: 20px; font-weight: bold;');
    console.log('%c' + '═'.repeat(50), 'color: gold;');
    console.log('%cSecret Type:', 'color: cyan;', secretType);
    console.log('%cYour Flag:', 'color: lime; font-size: 16px;', fullFlag);
    console.log('%c' + '═'.repeat(50), 'color: gold;');
    
    setMessage(`🎉 SECRET UNLOCKED! CHECK CONSOLE! 🎉`);
    
    setTimeout(() => {
      alert(`🎊 CONGRATULATIONS! 🎊\n\n${fullFlag}\n\nCheck console for details!`);
    }, 1000);
  };
  
  const getRandomSymbol = () => Math.floor(Math.random() * symbols.length);
  
  const spin = () => {
    if (spinning || balance < bet) {
      setMessage(balance < bet ? '💸 INSUFFICIENT BALANCE' : 'SPINNING...');
      return;
    }
    
    setSpinning(true);
    setBalance(balance - bet);
    setMessage('🎰 SPINNING...');
    playSound('spin');
    
    const newSpinCount = spinCount + 1;
    setSpinCount(newSpinCount);
    
    // Generate final reels FIRST
    const finalReels = [];
    for (let i = 0; i < 5; i++) {
      finalReels.push([
        getRandomSymbol(),
        getRandomSymbol(),
        getRandomSymbol()
      ]);
    }
    
    // Animate each reel with staggered timing
    const spinDurations = [1500, 1700, 1900, 2100, 2300];
    const intervals = [];
    
    // Start spinning animation for all reels
    reels.forEach((_, index) => {
      let offset = 0;
      const interval = setInterval(() => {
        offset += 25;
        setReelSpinOffset(prev => {
          const updated = [...prev];
          updated[index] = offset % 600; // Loop every 600px
          return updated;
        });
      }, 50);
      
      intervals.push(interval);
      
      // Stop this reel after its duration
      setTimeout(() => {
        clearInterval(interval);
        
        // Set final position smoothly
        setReels(prev => {
          const updated = [...prev];
          updated[index] = finalReels[index];
          return updated;
        });
        
        setReelSpinOffset(prev => {
          const updated = [...prev];
          updated[index] = 0;
          return updated;
        });
        
        playSound('stop');
      }, spinDurations[index]);
    });
    
    // Check result after all reels stop
    setTimeout(() => {
      const result = checkWin(finalReels, newSpinCount);
      
      if (result) {
        if (result.type.startsWith('SECRET')) {
          revealFlag(result.type);
          setSecretProgress([...secretProgress, result.type]);
        } else {
          const winAmount = bet * result.multiplier;
          setBalance(balance - bet + winAmount);
          setTotalWins(totalWins + 1);
          setMessage(`🎉 ${result.type}! +${winAmount}`);
          setGlowEffect(true);
          playSound('win');
          
          setTimeout(() => setGlowEffect(false), 2000);
        }
      } else {
        setMessage('TRY AGAIN');
      }
      
      setSpinning(false);
    }, Math.max(...spinDurations) + 300);
  };
  
  const adjustBet = (amount) => {
    const newBet = bet + amount;
    if (newBet >= 10 && newBet <= balance) {
      setBet(newBet);
    }
  };
  
  const renderSymbol = (symbolId, size = 'large') => {
    const symbol = symbols[symbolId];
    const sizeClass = size === 'small' ? 'text-3xl' : 'text-5xl md:text-6xl';
    
    // If PNG image is provided, use it. Otherwise use emoji
    if (symbol.image) {
      return (
        <img 
          src={symbol.image} 
          alt={symbol.name}
          className={`w-full h-full object-contain ${spinning ? 'blur-sm' : ''}`}
        />
      );
    } else {
      return (
        <span className={`${sizeClass} ${spinning ? 'blur-sm' : ''}`}>
          {symbol.emoji}
        </span>
      );
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Lightning bolts for blink effect */}
      {glowEffect && [...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute text-6xl animate-ping pointer-events-none"
          style={{
            left: `${20 + i * 10}%`,
            top: `${10 + (i % 3) * 30}%`,
            animationDuration: '0.5s'
          }}
        >
          ⚡
        </div>
      ))}
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
      }}></div>
      
      {/* Main container */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Header with Zeus theme */}
        <div className="text-center mb-6 relative">
          {/* Lightning effects on header */}
          <div className="absolute -top-10 left-1/4 text-6xl animate-pulse">⚡</div>
          <div className="absolute -top-10 right-1/4 text-6xl animate-pulse" style={{animationDelay: '0.5s'}}>⚡</div>
          
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 animate-pulse drop-shadow-2xl tracking-wider" style={{
              textShadow: '0 0 30px rgba(255,215,0,0.8), 0 0 60px rgba(255,215,0,0.5)',
              animation: 'pulse 1.5s ease-in-out infinite, glow 2s ease-in-out infinite alternate'
            }}>
              AMMBATUKAM67
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-red-500 blur opacity-40 animate-pulse"></div>
          </div>
          <p className="text-yellow-300 text-lg mt-3 tracking-widest font-semibold animate-pulse">⚡ MEGA SLOT MACHINE ⚡</p>
          
          {/* Zeus emoji */}
          <div className="text-6xl mt-2 animate-bounce">⚡👑⚡</div>
        </div>
        
        {/* Jackpot Display with blink */}
        <div className={`relative bg-gradient-to-r from-red-900 via-red-700 to-red-900 rounded-2xl p-6 mb-6 shadow-2xl transform transition-all ${glowEffect ? 'scale-105 animate-pulse' : 'scale-100'}`} style={{
          boxShadow: glowEffect ? '0 0 50px rgba(255,215,0,0.8), 0 0 100px rgba(255,215,0,0.5)' : '0 20px 50px rgba(0,0,0,0.5)',
          border: '3px solid rgba(255,215,0,0.5)',
          animation: 'blink 1s ease-in-out infinite'
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent animate-pulse rounded-2xl"></div>
          
          {/* Sparkles around jackpot - REMOVED */}
          
          <div className="text-center relative z-10">
            <div className="text-yellow-400 text-sm font-bold mb-2 tracking-wider uppercase animate-pulse">Mega Jackpot</div>
            <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200" style={{
              textShadow: '0 0 20px rgba(255,215,0,0.8)',
              animation: 'glow 1s ease-in-out infinite alternate'
            }}>
              ${jackpot.toFixed(2)}
            </div>
          </div>
        </div>
        
        {/* Slot Machine Frame */}
        <div className="relative bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-3xl p-8 shadow-2xl" style={{
          border: '8px solid',
          borderImage: 'linear-gradient(135deg, #d4af37, #f4e5a1, #d4af37) 1',
          boxShadow: '0 30px 60px rgba(0,0,0,0.9), inset 0 0 50px rgba(212,175,55,0.1)'
        }}>
          
          {/* Reels Container */}
          <div className="bg-black rounded-2xl p-4 mb-6 relative overflow-hidden" style={{
            boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.9)'
          }}>
            {/* Highlight line */}
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50 transform -translate-y-1/2 z-10"></div>
            
            {/* Reels */}
            <div className="grid grid-cols-5 gap-2">
              {reels.map((reel, reelIndex) => (
                <div 
                  key={reelIndex}
                  className="relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden"
                  style={{
                    height: '200px',
                    boxShadow: 'inset 0 5px 15px rgba(0,0,0,0.8)'
                  }}
                >
                  {/* Reel strip with 3 symbols */}
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-start transition-transform duration-100 ease-linear"
                    style={{
                      transform: `translateY(${spinning ? -reelSpinOffset[reelIndex] % 600 : 0}px)`
                    }}
                  >
                    {/* Show previous, current, next symbols in a loop */}
                    {[...reel, ...reel, ...reel].map((symbolId, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-center"
                        style={{
                          height: '66.67px',
                          minHeight: '66.67px'
                        }}
                      >
                        {renderSymbol(symbolId, 'large')}
                      </div>
                    ))}
                  </div>
                  
                  {/* Top shadow */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>
                  {/* Bottom shadow */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message Display */}
          <div className="relative mb-6 overflow-hidden rounded-xl" style={{
            background: 'linear-gradient(135deg, #1a1a1a, #000000)',
            border: '3px solid rgba(212,175,55,0.5)',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.8)'
          }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent animate-pulse"></div>
            <p className="text-yellow-300 text-2xl md:text-3xl font-bold tracking-wider text-center py-4 relative z-10" style={{
              textShadow: '0 0 10px rgba(255,215,0,0.5)'
            }}>
              {message}
            </p>
          </div>
          
          {/* Balance & Bet Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="relative rounded-xl p-4 text-center overflow-hidden" style={{
              background: 'linear-gradient(135deg, #064e3b, #022c22)',
              border: '2px solid rgba(16,185,129,0.5)',
              boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
            }}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
              <p className="text-green-400 text-sm mb-1 uppercase tracking-wider relative z-10">Balance</p>
              <p className="text-white text-3xl font-bold relative z-10">${balance.toLocaleString()}</p>
            </div>
            <div className="relative rounded-xl p-4 text-center overflow-hidden" style={{
              background: 'linear-gradient(135deg, #1e3a8a, #1e1b4b)',
              border: '2px solid rgba(59,130,246,0.5)',
              boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
            }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
              <p className="text-blue-400 text-sm mb-1 uppercase tracking-wider relative z-10">Bet</p>
              <p className="text-white text-3xl font-bold relative z-10">${bet.toLocaleString()}</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* Bet Controls */}
            <div className="flex gap-2">
              {[-50, -10, 10, 50].map(amount => (
                <button
                  key={amount}
                  onClick={() => adjustBet(amount)}
                  className="px-4 py-2 rounded-lg font-bold text-sm transition-all transform hover:scale-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37, #f4e5a1)',
                    color: '#000',
                    boxShadow: '0 4px 10px rgba(212,175,55,0.5)',
                    border: '2px solid rgba(255,215,0,0.8)'
                  }}
                >
                  {amount > 0 ? '+' : ''}{amount}
                </button>
              ))}
            </div>
            
            {/* Spin Button */}
            <button
              onClick={spin}
              disabled={spinning || balance < bet}
              className={`relative px-12 py-6 rounded-full text-3xl font-black tracking-wider transition-all transform ${
                spinning || balance < bet
                  ? 'opacity-50 cursor-not-allowed scale-95'
                  : 'hover:scale-110 active:scale-95'
              }`}
              style={{
                background: spinning || balance < bet 
                  ? 'linear-gradient(135deg, #666, #444)' 
                  : 'linear-gradient(135deg, #dc2626, #ef4444, #dc2626)',
                color: '#fff',
                boxShadow: spinning || balance < bet 
                  ? '0 10px 30px rgba(0,0,0,0.5)' 
                  : '0 10px 40px rgba(220,38,38,0.8), 0 0 30px rgba(239,68,68,0.5)',
                border: '4px solid rgba(255,255,255,0.2)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              {spinning ? (
                <span className="animate-pulse">🎰 SPINNING</span>
              ) : (
                '▶ SPIN'
              )}
            </button>
            
            {/* Sound Toggle */}
            <button
              onClick={() => setMuted(!muted)}
              className="p-3 rounded-full transition-all transform hover:scale-110 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #374151, #1f2937)',
                border: '2px solid rgba(156,163,175,0.5)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
              }}
            >
              {muted ? <VolumeX size={24} className="text-gray-400" /> : <Volume2 size={24} className="text-white" />}
            </button>
          </div>
          
          {/* Stats */}
          <div className="mt-6 text-center text-gray-500 text-xs">
            <p>Spins: {spinCount} | Wins: {totalWins}</p>
          </div>
        </div>
        
        {/* Info Button */}
        <div className="text-center mt-4">
          <button
            onClick={() => {
              alert('🎰 AMMBATUKAM67 SLOT MACHINE\n\n' +
                    '💎 Match symbols to win big!\n' +
                    '🍀 Special combinations unlock secrets...\n' +
                    '🔍 Try inspecting the source code!\n\n' +
                    'Hint: Lucky numbers... 13? 42? 🤔');
            }}
            className="px-6 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transition-all transform hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
              color: '#fff',
              boxShadow: '0 5px 15px rgba(59,130,246,0.5)',
              border: '2px solid rgba(96,165,250,0.5)'
            }}
          >
            <Info size={20} />
            How to Play
          </button>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          <p className="mb-1">🎰 UbigCTF - Reverse Engineering Category 🎰</p>
          <p className="text-xs text-gray-700">© 2025 AMMBATUKAM67 | All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes glow {
    from {
      filter: brightness(1) drop-shadow(0 0 10px rgba(255,215,0,0.5));
    }
    to {
      filter: brightness(1.3) drop-shadow(0 0 30px rgba(255,215,0,0.8));
    }
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;
document.head.appendChild(style);