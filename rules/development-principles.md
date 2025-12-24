# Development Principles

## Test-Driven Development (TDD)

### TDD 적용 범위
- **코어 로직에 대해서만 TDD를 적용합니다.**
- **UI 컴포넌트는 TDD 대상에서 제외하며, 자동화된 테스트를 작성하지 않습니다.**
- **UI는 수동 테스트로만 검증합니다.**

### TDD 대상 (Core Logic)
다음 모듈들은 반드시 TDD로 개발합니다:

1. **게임 로직**
   - `Ball.js` - 공의 이동, 충돌 감지
   - `Paddle.js` - 패들의 이동, 경계 제한
   - `Brick.js` - 벽돌의 체력, 파괴 로직
   - `Level.js` - 레벨 관리, 완료 조건

2. **물리 엔진**
   - `Physics.js` - 충돌 감지, 반사 벡터 계산

3. **점수 시스템**
   - 점수 계산 로직
   - 콤보 시스템
   - 별점 계산

4. **데이터 관리**
   - `Storage.js` - 로컬 스토리지 저장/로드

### TDD 제외 대상 (UI - 자동화 테스트 없음)
다음은 TDD를 적용하지 않으며, **자동화된 테스트를 작성하지 않습니다**:

- HTML 구조
- CSS 스타일링
- DOM 조작
- Canvas 렌더링
- 애니메이션 효과
- 화면 전환
- 사용자 입력 처리 (Input Manager)
- 화면 관리 (Screen Manager)
- 모달 관리 (Modal Manager)

> **중요**: UI 관련 코드는 수동 테스트로만 검증하며, Jest/Vitest 등을 이용한 자동화 테스트를 작성하지 않습니다.

### TDD 워크플로우

#### Red-Green-Refactor Cycle
1. **Red**: 실패하는 테스트 작성
2. **Green**: 테스트를 통과하는 최소한의 코드 작성
3. **Refactor**: 코드 개선 및 리팩토링

#### 테스트 작성 규칙
```javascript
// 1. 테스트는 명확하고 읽기 쉽게 작성
describe('Ball', () => {
  describe('movement', () => {
    it('should move in the direction of velocity', () => {
      // Arrange
      const ball = new Ball(100, 100, 8, 300);
      ball.velocity = { x: 1, y: 0 };
      
      // Act
      ball.update(1); // 1 second
      
      // Assert
      expect(ball.x).toBe(400); // 100 + 300*1
    });
  });
});

// 2. 각 테스트는 독립적이어야 함
// 3. 테스트 이름은 무엇을 테스트하는지 명확히 표현
// 4. AAA 패턴 사용: Arrange, Act, Assert
```

### 테스트 커버리지 목표
- **코어 로직**: 최소 80% 이상
- **중요 함수**: 100% 커버리지
- **엣지 케이스**: 모두 테스트
- **UI 컴포넌트**: 자동화 테스트 없음 (수동 테스트로만 검증)

### UI 검증 방법
UI는 자동화된 테스트 대신 다음 방법으로 검증합니다:
- **수동 테스트**: 브라우저에서 직접 확인
- **시각적 검토**: 디자인 파일과 비교
- **크로스 브라우저 테스트**: 여러 브라우저에서 확인
- **반응형 테스트**: 다양한 화면 크기에서 확인
- **모바일 테스트**: 실제 모바일 기기에서 확인

### 테스트 실행
```bash
# 모든 테스트 실행
npm test

# 특정 파일 테스트
npm test Ball.test.js

# Watch 모드
npm test -- --watch

# 커버리지 리포트
npm test -- --coverage
```

## SOLID 원칙

### S - Single Responsibility Principle (단일 책임 원칙)
**각 클래스는 하나의 책임만 가져야 합니다.**

✅ **Good Example:**
```javascript
// Ball 클래스는 공의 상태와 동작만 관리
class Ball {
  constructor(x, y, radius, speed) { }
  update(deltaTime) { }
  render(ctx) { }
}

// Physics 클래스는 물리 계산만 담당
class Physics {
  static checkCollision(ball, brick) { }
  static reflect(velocity, normal) { }
}
```

❌ **Bad Example:**
```javascript
// Ball 클래스가 너무 많은 책임을 가짐
class Ball {
  constructor() { }
  update() { }
  render() { }
  checkCollisionWithBricks() { }  // Physics의 책임
  updateScore() { }                // ScoreManager의 책임
  saveToLocalStorage() { }         // Storage의 책임
}
```

### O - Open/Closed Principle (개방/폐쇄 원칙)
**확장에는 열려있고, 수정에는 닫혀있어야 합니다.**

✅ **Good Example:**
```javascript
// 기본 Brick 클래스
class Brick {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
  
  hit() {
    // 기본 동작
  }
}

// 새로운 기능은 상속으로 확장
class PowerUpBrick extends Brick {
  hit() {
    super.hit();
    this.dropPowerUp(); // 추가 기능
  }
  
  dropPowerUp() { }
}
```

### L - Liskov Substitution Principle (리스코프 치환 원칙)
**하위 타입은 상위 타입을 대체할 수 있어야 합니다.**

✅ **Good Example:**
```javascript
class GameObject {
  update(deltaTime) { }
  render(ctx) { }
}

class Ball extends GameObject {
  update(deltaTime) {
    // Ball의 구체적인 업데이트 로직
  }
  render(ctx) {
    // Ball의 구체적인 렌더링 로직
  }
}

// Ball은 GameObject를 완전히 대체 가능
function updateGameObject(gameObject) {
  gameObject.update(0.016);
  gameObject.render(ctx);
}
```

### I - Interface Segregation Principle (인터페이스 분리 원칙)
**클라이언트는 사용하지 않는 인터페이스에 의존하지 않아야 합니다.**

✅ **Good Example:**
```javascript
// 작고 구체적인 인터페이스
class Movable {
  move(deltaTime) { }
}

class Renderable {
  render(ctx) { }
}

class Collidable {
  checkCollision(other) { }
}

// 필요한 것만 구현
class Ball extends Movable, Renderable, Collidable {
  // Ball에 필요한 모든 기능
}

class StaticBrick extends Renderable, Collidable {
  // 움직이지 않으므로 Movable 불필요
}
```

### D - Dependency Inversion Principle (의존성 역전 원칙)
**고수준 모듈은 저수준 모듈에 의존하지 않아야 합니다. 둘 다 추상화에 의존해야 합니다.**

✅ **Good Example:**
```javascript
// 추상화된 Storage 인터페이스
class StorageInterface {
  save(key, value) { }
  load(key) { }
}

// 구체적인 구현
class LocalStorage extends StorageInterface {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  load(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

// Game 클래스는 추상화에 의존
class Game {
  constructor(storage) {
    this.storage = storage; // StorageInterface
  }
  
  saveGame() {
    this.storage.save('gameState', this.state);
  }
}

// 사용
const game = new Game(new LocalStorage());
```

❌ **Bad Example:**
```javascript
// Game이 구체적인 구현에 직접 의존
class Game {
  saveGame() {
    localStorage.setItem('gameState', JSON.stringify(this.state));
  }
}
```

## 코드 품질 가이드라인

### 1. 명확한 네이밍
```javascript
// ✅ Good
const ballSpeed = 300;
const checkBrickCollision = (ball, brick) => { };

// ❌ Bad
const s = 300;
const check = (b, br) => { };
```

### 2. 함수는 작고 단순하게
```javascript
// ✅ Good - 한 가지 일만 수행
function calculateScore(brickType) {
  const scoreMap = { weak: 10, medium: 20, strong: 30 };
  return scoreMap[brickType];
}

// ❌ Bad - 너무 많은 일을 수행
function handleBrickHit(ball, brick, score, particles) {
  // 충돌 감지
  // 점수 계산
  // 파티클 생성
  // 사운드 재생
  // 애니메이션 시작
}
```

### 3. 매직 넘버 제거
```javascript
// ✅ Good
const BALL_RADIUS = 8;
const PADDLE_WIDTH = 112;

// ❌ Bad
ball.radius = 8;
paddle.width = 112;
```

### 4. 주석은 "왜"를 설명
```javascript
// ✅ Good
// 패들 가장자리에서 맞으면 더 큰 각도로 반사 (최대 75도)
const maxAngle = 75 * Math.PI / 180;

// ❌ Bad
// 75도를 라디안으로 변환
const maxAngle = 75 * Math.PI / 180;
```

## 코드 리뷰 체크리스트

구현 시 다음 사항을 확인합니다:

- [ ] 각 클래스가 단일 책임을 가지는가?
- [ ] 코어 로직에 대한 테스트가 작성되었는가?
- [ ] 모든 테스트가 통과하는가?
- [ ] SOLID 원칙을 위반하지 않는가?
- [ ] 매직 넘버가 상수로 정의되었는가?
- [ ] 함수와 변수 이름이 명확한가?
- [ ] 불필요한 의존성이 없는가?
- [ ] 코드 중복이 없는가?
- [ ] 에러 처리가 적절한가?
- [ ] 성능 이슈가 없는가?
