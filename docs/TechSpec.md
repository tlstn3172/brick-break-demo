# TechSpec: Neon Breaker - 기술 명세서

## 1. 기술 스택 개요

### 1.1 코어 기술
- **HTML5**: 구조 및 Canvas API
- **CSS3**: 스타일링, 애니메이션, 트랜지션
- **JavaScript (ES6+)**: 게임 로직 및 상태 관리
- **Tailwind CSS 3.x**: 유틸리티 기반 UI 스타일링

### 1.2 빌드 도구
- **Vite 5.x**: 개발 서버 및 번들러
- **PostCSS**: CSS 전처리
- **Autoprefixer**: 브라우저 호환성

### 1.3 배포
- **GitHub Pages**: 정적 사이트 호스팅
- **GitHub Actions**: CI/CD 자동화

## 2. 프로젝트 구조

```
brick-break-demo/
├── docs/                      # 문서
│   ├── PRD.md
│   └── TechSpec.md
├── src/                       # 소스 코드
│   ├── index.html            # 메인 HTML
│   ├── styles/               # 스타일시트
│   │   ├── main.css         # 메인 스타일
│   │   └── animations.css   # 애니메이션 정의
│   ├── scripts/              # JavaScript 모듈
│   │   ├── main.js          # 진입점
│   │   ├── game/            # 게임 로직
│   │   │   ├── Game.js      # 게임 메인 클래스
│   │   │   ├── Ball.js      # 공 클래스
│   │   │   ├── Paddle.js    # 패들 클래스
│   │   │   ├── Brick.js     # 벽돌 클래스
│   │   │   ├── Level.js     # 레벨 관리
│   │   │   ├── Physics.js   # 물리 엔진
│   │   │   └── Particle.js  # 파티클 효과
│   │   ├── ui/              # UI 컴포넌트
│   │   │   ├── Screen.js    # 화면 관리
│   │   │   ├── HUD.js       # 헤드업 디스플레이
│   │   │   └── Modal.js     # 모달 관리
│   │   ├── utils/           # 유틸리티
│   │   │   ├── Storage.js   # 로컬 스토리지
│   │   │   ├── Input.js     # 입력 처리
│   │   │   └── Audio.js     # 오디오 관리 (Phase 2)
│   │   └── config/          # 설정
│   │       ├── constants.js # 상수 정의
│   │       └── levels.js    # 레벨 데이터
│   └── assets/              # 에셋
│       ├── images/          # 이미지
│       └── sounds/          # 사운드 (Phase 2)
├── public/                   # 정적 파일
│   └── favicon.ico
├── .github/                  # GitHub 설정
│   └── workflows/
│       └── deploy.yml       # 배포 워크플로우
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 3. 아키텍처 설계

### 3.1 게임 루프 아키텍처

```javascript
// 메인 게임 루프 구조
class Game {
  constructor() {
    this.state = 'START'; // START, PLAYING, PAUSED, GAMEOVER
    this.canvas = null;
    this.ctx = null;
    this.lastTime = 0;
    this.deltaTime = 0;
  }

  init() {
    // Canvas 초기화
    // 게임 객체 생성
    // 이벤트 리스너 등록
  }

  update(deltaTime) {
    // 게임 상태 업데이트
    // 충돌 감지
    // 점수 계산
  }

  render() {
    // Canvas 클리어
    // 게임 객체 렌더링
  }

  gameLoop(timestamp) {
    // deltaTime 계산
    // update() 호출
    // render() 호출
    // requestAnimationFrame
  }
}
```

### 3.2 상태 관리

```javascript
// 게임 상태 관리
const GameState = {
  currentScreen: 'start', // start, game, gameover
  score: 0,
  level: 1,
  lives: 3,
  highScore: 0,
  combo: 0,
  maxCombo: 0,
  isPaused: false
};
```

### 3.3 화면 관리 시스템

```javascript
class ScreenManager {
  constructor() {
    this.screens = {
      start: new StartScreen(),
      game: new GameScreen(),
      gameover: new GameOverScreen()
    };
    this.currentScreen = 'start';
  }

  show(screenName) {
    // 현재 화면 숨기기
    // 새 화면 표시
    // 전환 애니메이션
  }

  update() {
    this.screens[this.currentScreen].update();
  }
}
```

## 4. 핵심 컴포넌트 명세

### 4.1 Ball (공) 클래스

```javascript
class Ball {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.velocity = { x: 0, y: 0 };
    this.active = false;
  }

  update(deltaTime) {
    // 위치 업데이트
    // 벽 충돌 체크
    // 속도 조정
  }

  launch(angle) {
    // 발사 각도로 속도 설정
  }

  reset() {
    // 초기 위치로 리셋
  }

  render(ctx) {
    // Canvas에 그리기
    // 글로우 효과 적용
  }
}
```

**속성**:
- 위치: `x`, `y`
- 반지름: `radius` (8px)
- 속도: `speed` (300-600 px/s, 레벨에 따라 증가)
- 방향: `velocity` (정규화된 벡터)

**메서드**:
- `update()`: 위치 업데이트 및 경계 체크
- `launch(angle)`: 특정 각도로 발사
- `reset()`: 패들 위치로 리셋
- `checkCollision(object)`: 충돌 감지

### 4.2 Paddle (패들) 클래스

```javascript
class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;  // 112px (기본)
    this.height = height; // 20px
    this.speed = 500;     // px/s
  }

  update(deltaTime, input) {
    // 입력에 따라 위치 업데이트
    // 화면 경계 제한
  }

  moveTo(targetX) {
    // 부드러운 이동
  }

  render(ctx) {
    // 그라데이션 렌더링
    // 글로우 효과
  }
}
```

**속성**:
- 위치: `x`, `y`
- 크기: `width` (112px), `height` (20px)
- 이동 속도: `speed` (500 px/s)

**메서드**:
- `update()`: 입력에 따른 위치 업데이트
- `moveTo(x)`: 특정 x 좌표로 이동
- `getBounceAngle(ballX)`: 공의 반사 각도 계산

### 4.3 Brick (벽돌) 클래스

```javascript
class Brick {
  constructor(x, y, width, height, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;        // 'weak', 'medium', 'strong'
    this.health = this.getHealthByType(type);
    this.maxHealth = this.health;
    this.destroyed = false;
    this.opacity = 1;
  }

  getHealthByType(type) {
    const healthMap = {
      'weak': 1,
      'medium': 2,
      'strong': 3
    };
    return healthMap[type];
  }

  hit() {
    this.health--;
    if (this.health <= 0) {
      this.destroyed = true;
      return this.getScore();
    }
    return 0;
  }

  getScore() {
    const scoreMap = {
      'weak': 10,
      'medium': 20,
      'strong': 30
    };
    return scoreMap[this.type];
  }

  render(ctx) {
    // 타입별 색상 그라데이션
    // 체력에 따른 투명도
    // 글로우 효과
  }
}
```

**벽돌 타입**:
- `weak` (틸): 체력 1, 점수 10
- `medium` (블루): 체력 2, 점수 20
- `strong` (보라): 체력 3, 점수 30

### 4.4 Level (레벨) 클래스

```javascript
class Level {
  constructor(levelNumber) {
    this.levelNumber = levelNumber;
    this.bricks = [];
    this.ballSpeed = 300 + (levelNumber * 50);
    this.targetScore = levelNumber * 500;
  }

  loadLevel() {
    // 레벨 데이터 로드
    // 벽돌 배치 생성
  }

  isComplete() {
    return this.bricks.every(brick => brick.destroyed);
  }

  getBrickLayout() {
    // 레벨별 벽돌 배치 패턴 반환
  }
}
```

### 4.5 Physics (물리 엔진)

```javascript
class Physics {
  static checkCircleRectCollision(circle, rect) {
    // AABB 충돌 감지
    // 반사 벡터 계산
  }

  static checkCircleCircleCollision(c1, c2) {
    // 원-원 충돌 감지
  }

  static reflect(velocity, normal) {
    // 반사 벡터 계산
    // v' = v - 2(v·n)n
  }

  static calculateBounceAngle(ballX, paddleX, paddleWidth) {
    // 패들 충돌 시 반사 각도 계산
    // 패들 중앙: 수직 반사
    // 패들 가장자리: 최대 75도
  }
}
```

### 4.6 Particle (파티클 효과)

```javascript
class Particle {
  constructor(x, y, color, velocity, lifetime) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;
    this.lifetime = lifetime;
    this.age = 0;
    this.size = 2;
  }

  update(deltaTime) {
    this.x += this.velocity.x * deltaTime;
    this.y += this.velocity.y * deltaTime;
    this.age += deltaTime;
    this.opacity = 1 - (this.age / this.lifetime);
  }

  isDead() {
    return this.age >= this.lifetime;
  }

  render(ctx) {
    // 페이드아웃 효과
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  emit(x, y, count, color) {
    // 파티클 생성
  }

  update(deltaTime) {
    // 모든 파티클 업데이트
    // 죽은 파티클 제거
  }

  render(ctx) {
    // 모든 파티클 렌더링
  }
}
```

## 5. UI 시스템

### 5.1 HTML 구조

```html
<!DOCTYPE html>
<html lang="ko" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neon Breaker</title>
  <link rel="stylesheet" href="./styles/main.css">
</head>
<body>
  <!-- Start Screen -->
  <div id="start-screen" class="screen">
    <!-- PRD 디자인 참조 -->
  </div>

  <!-- Game Screen -->
  <div id="game-screen" class="screen hidden">
    <header id="hud">
      <!-- HUD 요소 -->
    </header>
    <canvas id="game-canvas"></canvas>
    <div id="touch-control">
      <!-- 터치 컨트롤 영역 -->
    </div>
  </div>

  <!-- Game Over Screen -->
  <div id="gameover-screen" class="screen hidden">
    <!-- PRD 디자인 참조 -->
  </div>

  <!-- Pause Modal -->
  <div id="pause-modal" class="modal hidden">
    <!-- 일시정지 모달 -->
  </div>

  <script type="module" src="./scripts/main.js"></script>
</body>
</html>
```

### 5.2 Tailwind 설정

```javascript
// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0db9f2',
        'background-light': '#f5f8f8',
        'background-dark': '#101e22',
        'accent-purple': '#a855f7',
        'accent-teal': '#2dd4bf',
      },
      fontFamily: {
        'display': ['Spline Sans', 'sans-serif']
      },
      borderRadius: {
        'DEFAULT': '1rem',
        'lg': '2rem',
        'xl': '3rem',
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(13, 185, 242, 0.6)',
        'glow-white': '0 0 15px rgba(255, 255, 255, 0.8)',
        'glow-purple': '0 0 10px rgba(168, 85, 247, 0.5)',
        'glow-teal': '0 0 10px rgba(45, 212, 191, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
```

### 5.3 CSS 애니메이션

```css
/* animations.css */

/* 네온 글로우 효과 */
.text-glow {
  text-shadow: 0 0 10px rgba(13, 185, 242, 0.5);
}

/* 펄스 애니메이션 */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 15px rgba(13, 185, 242, 0.6);
  }
  50% {
    box-shadow: 0 0 25px rgba(13, 185, 242, 0.8);
  }
}

/* 페이드 인/아웃 */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
}

/* 샤인 효과 */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 벽돌 파괴 애니메이션 */
@keyframes brickDestroy {
  0% { 
    opacity: 1; 
    transform: scale(1); 
  }
  50% { 
    opacity: 0.5; 
    transform: scale(1.2); 
  }
  100% { 
    opacity: 0; 
    transform: scale(0.8); 
  }
}
```

## 6. 입력 시스템

### 6.1 Input Manager

```javascript
class InputManager {
  constructor() {
    this.mouseX = 0;
    this.touchX = 0;
    this.isMouseDown = false;
    this.isTouching = false;
  }

  init() {
    // 마우스 이벤트
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));

    // 터치 이벤트
    document.addEventListener('touchstart', this.handleTouchStart.bind(this));
    document.addEventListener('touchmove', this.handleTouchMove.bind(this));
    document.addEventListener('touchend', this.handleTouchEnd.bind(this));
  }

  handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
  }

  handleTouchMove(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    this.touchX = e.touches[0].clientX - rect.left;
  }

  getX() {
    return this.isTouching ? this.touchX : this.mouseX;
  }
}
```

## 7. 데이터 관리

### 7.1 Local Storage

```javascript
class StorageManager {
  static KEYS = {
    HIGH_SCORE: 'neonbreaker_highscore',
    SETTINGS: 'neonbreaker_settings',
    GAME_STATE: 'neonbreaker_gamestate'
  };

  static saveHighScore(score) {
    localStorage.setItem(this.KEYS.HIGH_SCORE, score.toString());
  }

  static getHighScore() {
    return parseInt(localStorage.getItem(this.KEYS.HIGH_SCORE) || '0');
  }

  static saveSettings(settings) {
    localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
  }

  static getSettings() {
    const defaults = {
      soundEnabled: true,
      musicEnabled: true,
      difficulty: 'normal'
    };
    const stored = localStorage.getItem(this.KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : defaults;
  }

  static saveGameState(state) {
    localStorage.setItem(this.KEYS.GAME_STATE, JSON.stringify(state));
  }

  static getGameState() {
    const stored = localStorage.getItem(this.KEYS.GAME_STATE);
    return stored ? JSON.parse(stored) : null;
  }

  static clearGameState() {
    localStorage.removeItem(this.KEYS.GAME_STATE);
  }
}
```

### 7.2 레벨 데이터 구조

```javascript
// levels.js
export const LEVELS = [
  {
    level: 1,
    ballSpeed: 300,
    targetScore: 500,
    layout: [
      ['weak', 'weak', 'weak', 'weak', 'weak', 'weak'],
      ['weak', 'weak', 'weak', 'weak', 'weak', 'weak'],
      ['medium', 'medium', 'medium', 'medium', 'medium', 'medium'],
    ]
  },
  {
    level: 2,
    ballSpeed: 350,
    targetScore: 800,
    layout: [
      ['strong', 'strong', 'strong', 'strong', 'strong', 'strong'],
      ['medium', 'medium', 'medium', 'medium', 'medium', 'medium'],
      ['weak', 'weak', 'weak', 'weak', 'weak', 'weak'],
      ['weak', 'weak', 'weak', 'weak', 'weak', 'weak'],
    ]
  },
  // ... 더 많은 레벨
];
```

## 8. 성능 최적화

### 8.1 Canvas 최적화

```javascript
// 오프스크린 캔버스 사용
const offscreenCanvas = document.createElement('canvas');
const offscreenCtx = offscreenCanvas.getContext('2d');

// 레이어 분리 (정적 요소 vs 동적 요소)
class CanvasLayerManager {
  constructor() {
    this.staticLayer = document.createElement('canvas');
    this.dynamicLayer = document.createElement('canvas');
  }

  renderStatic() {
    // 벽돌 등 정적 요소는 한 번만 렌더링
  }

  renderDynamic() {
    // 공, 패들 등 매 프레임 렌더링
  }
}
```

### 8.2 객체 풀링

```javascript
class ObjectPool {
  constructor(createFn, resetFn, initialSize = 10) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
    this.active = [];
    
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(createFn());
    }
  }

  acquire() {
    const obj = this.pool.length > 0 
      ? this.pool.pop() 
      : this.createFn();
    this.active.push(obj);
    return obj;
  }

  release(obj) {
    const index = this.active.indexOf(obj);
    if (index > -1) {
      this.active.splice(index, 1);
      this.resetFn(obj);
      this.pool.push(obj);
    }
  }
}

// 파티클 풀 사용 예
const particlePool = new ObjectPool(
  () => new Particle(),
  (p) => p.reset(),
  50
);
```

### 8.3 RequestAnimationFrame 최적화

```javascript
class GameLoop {
  constructor(updateFn, renderFn) {
    this.updateFn = updateFn;
    this.renderFn = renderFn;
    this.lastTime = 0;
    this.accumulator = 0;
    this.fixedTimeStep = 1000 / 60; // 60 FPS
    this.running = false;
  }

  start() {
    this.running = true;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  loop(currentTime) {
    if (!this.running) return;

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    this.accumulator += deltaTime;

    // Fixed timestep update
    while (this.accumulator >= this.fixedTimeStep) {
      this.updateFn(this.fixedTimeStep / 1000);
      this.accumulator -= this.fixedTimeStep;
    }

    // Render
    this.renderFn();

    requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    this.running = false;
  }
}
```

## 9. 빌드 및 배포

### 9.1 Vite 설정

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/brick-break-demo/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

### 9.2 GitHub Actions 워크플로우

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 10. 테스트 전략

### 10.1 자동화 테스트 (코어 로직만)

**테스트 대상**: 게임 로직, 물리 엔진, 데이터 관리만 자동화 테스트 작성

```javascript
// Ball 클래스 테스트
describe('Ball', () => {
  test('should update position based on velocity', () => {
    const ball = new Ball(100, 100, 8, 300);
    ball.velocity = { x: 1, y: 0 };
    ball.update(1); // 1 second
    expect(ball.x).toBe(400); // 100 + 300*1
  });

  test('should bounce off walls', () => {
    const ball = new Ball(395, 100, 8, 300);
    ball.velocity = { x: 1, y: 0 };
    ball.update(0.1);
    expect(ball.velocity.x).toBeLessThan(0); // Should reverse
  });
});

// Physics 클래스 테스트
describe('Physics', () => {
  test('reflect vector correctly', () => {
    const velocity = { x: 1, y: 1 };
    const normal = { x: 0, y: -1 };
    const result = Physics.reflect(velocity, normal);
    expect(result).toEqual({ x: 1, y: -1 });
  });

  test('calculate bounce angle from paddle position', () => {
    const angle = Physics.calculateBounceAngle(50, 100, 112);
    expect(angle).toBeGreaterThan(-Math.PI / 2);
    expect(angle).toBeLessThan(Math.PI / 2);
  });
});

// Brick 클래스 테스트
describe('Brick', () => {
  test('weak brick destroyed in one hit', () => {
    const brick = new Brick(0, 0, 50, 20, 'weak');
    const score = brick.hit();
    expect(brick.destroyed).toBe(true);
    expect(score).toBe(10);
  });

  test('strong brick requires three hits', () => {
    const brick = new Brick(0, 0, 50, 20, 'strong');
    brick.hit();
    expect(brick.destroyed).toBe(false);
    brick.hit();
    expect(brick.destroyed).toBe(false);
    const score = brick.hit();
    expect(brick.destroyed).toBe(true);
    expect(score).toBe(30);
  });
});

// Storage 클래스 테스트
describe('StorageManager', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('save and load high score', () => {
    StorageManager.saveHighScore(1000);
    expect(StorageManager.getHighScore()).toBe(1000);
  });

  test('return 0 for non-existent high score', () => {
    expect(StorageManager.getHighScore()).toBe(0);
  });
});
```

> **중요**: UI 컴포넌트(Input, Screen, Modal, Renderer, HUD 등)는 자동화 테스트를 작성하지 않습니다.

### 10.2 수동 테스트 체크리스트 (UI 및 통합)

**UI 기능 테스트**
- [ ] 시작 화면 표시 및 버튼 동작
- [ ] 게임 시작 버튼 클릭 시 게임 화면 전환
- [ ] 설정 버튼 클릭 시 모달 표시
- [ ] 순위표 버튼 동작 (구현 시)

**게임플레이 테스트**
- [ ] 패들이 마우스/터치 입력에 정확히 반응
- [ ] 공이 패들에서 발사됨
- [ ] 공이 벽에서 정확히 반사
- [ ] 공이 패들에서 정확히 반사 (각도 확인)
- [ ] 공이 벽돌과 충돌 시 벽돌 파괴
- [ ] 벽돌 타입별 체력 시스템 동작
- [ ] 파티클 효과 생성 및 표시

**HUD 및 상태 테스트**
- [ ] 점수가 정확히 업데이트
- [ ] 생명 표시가 정확함
- [ ] 레벨 표시가 정확함
- [ ] 콤보 시스템 동작 (구현 시)

**화면 전환 테스트**
- [ ] 모든 화면 전환이 부드럽게 작동
- [ ] 페이드 인/아웃 애니메이션 동작
- [ ] 일시정지 모달 열기/닫기
- [ ] 게임 오버 화면 표시 및 통계 정확성

**입력 시스템 테스트**
- [ ] 마우스 입력이 정확하게 작동
- [ ] 터치 입력이 정확하게 작동
- [ ] 터치 컨트롤 영역 반응
- [ ] 패들이 화면 경계를 벗어나지 않음

**데이터 저장 테스트**
- [ ] 최고 점수 저장/로드 정상
- [ ] 게임 상태 저장/로드 정상 (구현 시)
- [ ] 설정 저장/로드 정상 (구현 시)

**크로스 브라우저 테스트**
- [ ] Chrome에서 정상 동작
- [ ] Firefox에서 정상 동작
- [ ] Safari에서 정상 동작
- [ ] Edge에서 정상 동작

**모바일 테스트**
- [ ] iOS Safari에서 정상 동작
- [ ] Chrome Mobile에서 정상 동작
- [ ] 터치 컨트롤 정확성
- [ ] 화면 회전 대응
- [ ] Safe area 처리

**반응형 디자인 테스트**
- [ ] 다양한 화면 크기에서 레이아웃 정상
- [ ] Canvas 크기 자동 조정
- [ ] UI 요소 배치 정상
- [ ] 폰트 크기 및 가독성

**성능 테스트**
- [ ] 60 FPS 유지 확인
- [ ] 메모리 누수 없음
- [ ] 로딩 시간 3초 이내
- [ ] 부드러운 애니메이션

**시각적 검증**
- [ ] 디자인 파일과 일치
- [ ] 네온 효과 및 글로우 정상
- [ ] 색상 및 폰트 정확
- [ ] 애니메이션 타이밍 자연스러움

## 11. 상수 정의

```javascript
// constants.js
export const GAME_CONFIG = {
  // Canvas
  CANVAS_WIDTH: 400,
  CANVAS_HEIGHT: 600,
  
  // Ball
  BALL_RADIUS: 8,
  BALL_INITIAL_SPEED: 300,
  BALL_SPEED_INCREMENT: 50,
  BALL_MAX_SPEED: 600,
  
  // Paddle
  PADDLE_WIDTH: 112,
  PADDLE_HEIGHT: 20,
  PADDLE_SPEED: 500,
  PADDLE_Y_OFFSET: 100,
  
  // Brick
  BRICK_ROWS: 4,
  BRICK_COLS: 6,
  BRICK_WIDTH: 60,
  BRICK_HEIGHT: 20,
  BRICK_PADDING: 8,
  BRICK_OFFSET_TOP: 80,
  BRICK_OFFSET_LEFT: 10,
  
  // Game
  INITIAL_LIVES: 3,
  MAX_LIVES: 5,
  COMBO_TIMEOUT: 2000, // ms
  
  // Scoring
  SCORE_WEAK: 10,
  SCORE_MEDIUM: 20,
  SCORE_STRONG: 30,
  COMBO_MULTIPLIER: 1.5,
  
  // Stars (for game over screen)
  STAR_THRESHOLD_1: 0.3,  // 30% of target
  STAR_THRESHOLD_2: 0.7,  // 70% of target
  STAR_THRESHOLD_3: 1.0,  // 100% of target
};

export const COLORS = {
  PRIMARY: '#0db9f2',
  WEAK_BRICK: ['#2dd4bf', '#34d399'],
  MEDIUM_BRICK: ['#06b6d4', '#3b82f6'],
  STRONG_BRICK: ['#a855f7', '#9333ea'],
  BALL: '#ffffff',
  PADDLE: '#0db9f2',
};
```

## 12. 브라우저 호환성

### 12.1 지원 브라우저
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Chrome Mobile (Android)
- Safari Mobile (iOS)

### 12.2 필수 기능
- Canvas API
- ES6+ (let, const, arrow functions, classes)
- LocalStorage
- RequestAnimationFrame
- Touch Events

### 12.3 Polyfill (필요시)
```javascript
// requestAnimationFrame polyfill
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(callback) {
    return setTimeout(callback, 1000 / 60);
  };
}
```

## 13. 개발 워크플로우

### 13.1 개발 서버 실행
```bash
npm run dev
```

### 13.2 프로덕션 빌드
```bash
npm run build
```

### 13.3 빌드 미리보기
```bash
npm run preview
```

### 13.4 코드 포맷팅 (선택사항)
```bash
npm run format
```

## 14. 향후 기술적 개선 사항

### Phase 2
- Web Audio API를 이용한 사운드 시스템
- Service Worker를 이용한 PWA 변환
- WebGL을 이용한 고급 그래픽 효과
- Web Workers를 이용한 물리 계산 최적화

### Phase 3
- WebRTC를 이용한 멀티플레이어
- Firebase를 이용한 온라인 리더보드
- IndexedDB를 이용한 대용량 데이터 저장
- WebAssembly를 이용한 성능 최적화
