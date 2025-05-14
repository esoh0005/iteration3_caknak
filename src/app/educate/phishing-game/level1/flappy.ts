// src/main.ts

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    const startScreen = document.getElementById('startScreen')!;
    const gameOverScreen = document.getElementById('gameOverScreen')!;
    const startButton = document.getElementById('startButton')!;
    const restartButton = document.getElementById('restartButton')!;
    const finalScore = document.getElementById('finalScore')!;
    const highScore = document.getElementById('highScore')!;
    const livesContainer = document.getElementById('livesContainer')!;
    const hitEffect = document.getElementById('hitEffect')!;
  
    canvas.width = 400;
    canvas.height = 600;
  
    let score = 0;
    let bestScore = +(localStorage.getItem('cyberflappyHighScore') || 0);
    let gameRunning = false;
    let animationId: number;
    let lives = 5;
    let invincible = false;
    let framesSinceLastPipe = 0;
    let pipeGap = 150;
    let pipeFrequency = 120;
  
    interface Bird {
      x: number;
      y: number;
      width: number;
      height: number;
      velocity: number;
      gravity: number;
      jumpPower: number;
      color: string;
    }
  
    interface Pipe {
      x: number;
      gapY: number;
      width: number;
      gap: number;
      color: string;
      passed: boolean;
    }
  
    const bird: Bird = {
      x: 100,
      y: canvas.height / 2,
      width: 40,
      height: 30,
      velocity: 0,
      gravity: 0.5,
      jumpPower: -10,
      color: '#00ff9d',
    };
  
    const pipes: Pipe[] = [];
  
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
  
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        if (!gameRunning) {
          startGame();
        } else {
          bird.velocity = bird.jumpPower;
          playSound('jump');
        }
      }
    });
  
    canvas.addEventListener('click', () => {
      if (gameRunning) {
        bird.velocity = bird.jumpPower;
        playSound('jump');
      }
    });
  
    function playSound(type: string) {
      console.log(`Playing ${type} sound`);
    }
  
    function createHearts() {
      livesContainer.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.className = `heart ${i < lives ? '' : 'lost'}`;
        heart.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="${i < lives ? '#ff3366' : '#555'}" stroke="${i < lives ? '#ff3366' : '#555'}" stroke-width="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
          2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3
          19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`;
        livesContainer.appendChild(heart);
      }
    }
  
    function startGame() {
      score = 0;
      pipes.length = 0;
      bird.y = canvas.height / 2;
      bird.velocity = 0;
      framesSinceLastPipe = 0;
      lives = 5;
      invincible = false;
  
      createHearts();
      startScreen.classList.add('hidden');
      gameOverScreen.classList.add('hidden');
      gameRunning = true;
      gameLoop();
    }
  
    function showHitEffect() {
      hitEffect.classList.add('active');
      setTimeout(() => {
        hitEffect.classList.remove('active');
      }, 300);
  
      canvas.classList.add('shake');
      setTimeout(() => {
        canvas.classList.remove('shake');
      }, 500);
    }
  
    function loseLife() {
      if (invincible) return;
      lives--;
      createHearts();
      showHitEffect();
      invincible = true;
      setTimeout(() => {
        invincible = false;
      }, 1500);
      playSound('hit');
      if (lives <= 0) gameOver();
    }
  
    function gameOver() {
      gameRunning = false;
      cancelAnimationFrame(animationId);
      if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('cyberflappyHighScore', bestScore.toString());
      }
      finalScore.textContent = score.toString();
      highScore.textContent = bestScore.toString();
      gameOverScreen.classList.remove('hidden');
      playSound('gameOver');
    }
  
    function gameLoop() {
      if (!gameRunning) return;
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      updateBird();
      updatePipes();
      drawBird();
      drawPipes();
      drawScore();
      if (checkCollisions()) loseLife();
      animationId = requestAnimationFrame(gameLoop);
    }
  
    function updateBird() {
      bird.velocity += bird.gravity;
      bird.y += bird.velocity;
      if (bird.y < 0) bird.y = 0;
      if (bird.y > canvas.height - bird.height) bird.y = canvas.height - bird.height;
    }
  
    function drawBird() {
      ctx.fillStyle = bird.color;
      ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
    }
  
    function updatePipes() {
      framesSinceLastPipe++;
      if (framesSinceLastPipe > pipeFrequency) {
        const gapPosition = Math.random() * (canvas.height - pipeGap - 100) + 50;
        pipes.push({
          x: canvas.width,
          gapY: gapPosition,
          width: 70,
          gap: pipeGap,
          color: '#00ff9d',
          passed: false,
        });
        framesSinceLastPipe = 0;
      }
      pipes.forEach((pipe) => {
        pipe.x -= 3;
        if (!pipe.passed && pipe.x + pipe.width < bird.x) {
          pipe.passed = true;
          score++;
          playSound('point');
        }
      });
      while (pipes.length && pipes[0] && pipes[0].x + pipes[0].width < 0) pipes.shift();
    }
  
    function drawPipes() {
      pipes.forEach((pipe) => {
        ctx.fillStyle = pipe.color;
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.gapY);
        ctx.fillRect(pipe.x, pipe.gapY + pipe.gap, pipe.width, canvas.height - pipe.gapY - pipe.gap);
      });
    }
  
    function drawScore() {
      ctx.fillStyle = '#00ff9d';
      ctx.font = '24px "Press Start 2P", cursive';
      ctx.textAlign = 'center';
      ctx.fillText(score.toString(), canvas.width / 2, 50);
    }
  
    function checkCollisions(): boolean {
      if (invincible) return false;
      if (bird.y <= 0 || bird.y + bird.height >= canvas.height) return true;
      return pipes.some(pipe =>
        bird.x + bird.width > pipe.x &&
        bird.x < pipe.x + pipe.width &&
        (bird.y < pipe.gapY || bird.y + bird.height > pipe.gapY + pipe.gap)
      );
    }
  
    createHearts();
  });
  
