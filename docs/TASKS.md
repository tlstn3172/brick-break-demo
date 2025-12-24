# TASKS - Neon Breaker 개발 작업 목록

## 📋 Phase 1: 프로젝트 초기 설정

### 1.1 npm 프로젝트 초기화
- [ ] `npm init -y`로 package.json 생성
- [ ] package.json 메타데이터 수정 (name, version, description)
- [ ] package.json scripts 섹션 정의
  - [ ] `dev`: 개발 서버 실행
  - [ ] `build`: 프로덕션 빌드
  - [ ] `preview`: 빌드 미리보기
  - [ ] `test`: 테스트 실행
  - [ ] `test:coverage`: 커버리지 리포트

### 1.2 빌드 도구 설치 및 설정
- [ ] Vite 설치
  - [ ] `npm install -D vite` 실행
  - [ ] `vite.config.js` 생성
  - [ ] base path 설정 (`/brick-break-demo/`)
  - [ ] build 옵션 설정 (outDir, minify, sourcemap)
- [ ] Vite 플러그인 설정
  - [ ] HTML 플러그인 설정 (필요시)

### 1.3 Tailwind CSS 설치 및 설정
- [ ] Tailwind CSS 및 관련 패키지 설치
  - [ ] `npm install -D tailwindcss postcss autoprefixer`
  - [ ] `npx tailwindcss init -p` 실행
- [ ] `tailwind.config.js` 설정
  - [ ] content 경로 설정
  - [ ] darkMode 설정 ('class')
  - [ ] theme.extend 설정 (colors, fontFamily, borderRadius, boxShadow)
- [ ] `postcss.config.js` 확인 및 수정
  - [ ] tailwindcss 플러그인
  - [ ] autoprefixer 플러그인

### 1.4 테스트 프레임워크 설치
- [ ] Vitest 설치
  - [ ] `npm install -D vitest` 실행
  - [ ] `npm install -D @vitest/ui` 설치 (선택사항)
- [ ] Vitest 설정
  - [ ] `vite.config.js`에 test 설정 추가
  - [ ] coverage 도구 설정 (c8 또는 istanbul)
  - [ ] globals 옵션 설정

### 1.5 프로젝트 폴더 구조 생성
- [ ] 루트 레벨 디렉토리 생성
  - [ ] `mkdir src` 실행
  - [ ] `mkdir public` 실행
  - [ ] `mkdir .github` 실행
- [ ] src 하위 디렉토리 생성
  - [ ] `src/scripts/` 생성
  - [ ] `src/scripts/game/` 생성
  - [ ] `src/scripts/ui/` 생성
  - [ ] `src/scripts/utils/` 생성
  - [ ] `src/scripts/config/` 생성
  - [ ] `src/styles/` 생성
  - [ ] `src/assets/` 생성 (선택사항)
- [ ] 테스트 디렉토리 생성
  - [ ] `src/scripts/game/__tests__/` 생성
  - [ ] `src/scripts/utils/__tests__/` 생성
- [ ] GitHub 워크플로우 디렉토리 생성
  - [ ] `.github/workflows/` 생성

### 1.6 설정 파일 작성
- [ ] `.gitignore` 작성
  - [ ] node_modules 제외
  - [ ] dist 제외
  - [ ] .env 파일 제외
  - [ ] IDE 설정 파일 제외
  - [ ] 커버리지 리포트 제외
- [ ] `.env.example` 작성 (필요시)
- [ ] `jsconfig.json` 또는 `tsconfig.json` 작성 (선택사항)
  - [ ] path alias 설정

### 1.7 프로젝트 README 작성
- [ ] README.md 기본 구조 작성
  - [ ] 프로젝트 제목 및 설명
  - [ ] 주요 기능 나열
  - [ ] 스크린샷 섹션 (추후 추가)
- [ ] 설치 방법 작성
  - [ ] 필수 요구사항 (Node.js 버전)
  - [ ] 클론 및 설치 명령어
- [ ] 실행 방법 작성
  - [ ] 개발 서버 실행 방법
  - [ ] 빌드 방법
  - [ ] 테스트 실행 방법
- [ ] 개발 가이드 작성
  - [ ] 프로젝트 구조 설명
  - [ ] 개발 규칙 링크 (rules/)
  - [ ] 기여 방법 (선택사항)

---

## 📋 Phase 2: 코어 로직 구현 (TDD)

### 2.1 상수 및 설정 정의
- [ ] `src/scripts/config/constants.js` 작성
  - [ ] 게임 설정 상수 정의
  - [ ] 컬러 상수 정의
  - [ ] 점수 시스템 상수 정의
- [ ] `src/scripts/config/levels.js` 작성
  - [ ] 레벨 데이터 구조 정의
  - [ ] 최소 5개 레벨 데이터 작성

### 2.2 Ball 클래스 (TDD)
- [ ] `Ball.test.js` 테스트 작성
  - [ ] 생성자 테스트
  - [ ] `update()` 메서드 테스트 (위치 업데이트)
  - [ ] `launch()` 메서드 테스트
  - [ ] `reset()` 메서드 테스트
  - [ ] 경계 충돌 테스트
- [ ] `Ball.js` 구현
  - [ ] 생성자 구현
  - [ ] `update()` 메서드 구현
  - [ ] `launch()` 메서드 구현
  - [ ] `reset()` 메서드 구현
  - [ ] 경계 충돌 로직 구현

### 2.3 Paddle 클래스 (TDD)
- [ ] `Paddle.test.js` 테스트 작성
  - [ ] 생성자 테스트
  - [ ] `update()` 메서드 테스트
  - [ ] `moveTo()` 메서드 테스트
  - [ ] 화면 경계 제한 테스트
  - [ ] `getBounceAngle()` 메서드 테스트
- [ ] `Paddle.js` 구현
  - [ ] 생성자 구현
  - [ ] `update()` 메서드 구현
  - [ ] `moveTo()` 메서드 구현
  - [ ] 경계 제한 로직 구현
  - [ ] `getBounceAngle()` 메서드 구현

### 2.4 Brick 클래스 (TDD)
- [ ] `Brick.test.js` 테스트 작성
  - [ ] 생성자 테스트
  - [ ] `hit()` 메서드 테스트 (체력 감소)
  - [ ] 벽돌 타입별 체력 테스트
  - [ ] 점수 계산 테스트
  - [ ] 파괴 상태 테스트
- [ ] `Brick.js` 구현
  - [ ] 생성자 구현
  - [ ] `hit()` 메서드 구현
  - [ ] `getHealthByType()` 메서드 구현
  - [ ] `getScore()` 메서드 구현

### 2.5 Physics 클래스 (TDD)
- [ ] `Physics.test.js` 테스트 작성
  - [ ] `checkCircleRectCollision()` 테스트
  - [ ] `reflect()` 메서드 테스트 (벡터 반사)
  - [ ] `calculateBounceAngle()` 테스트
  - [ ] 엣지 케이스 테스트
- [ ] `Physics.js` 구현
  - [ ] `checkCircleRectCollision()` 구현
  - [ ] `reflect()` 메서드 구현
  - [ ] `calculateBounceAngle()` 구현
  - [ ] 충돌 감지 최적화

### 2.6 Level 클래스 (TDD)
- [ ] `Level.test.js` 테스트 작성
  - [ ] 생성자 테스트
  - [ ] `loadLevel()` 메서드 테스트
  - [ ] `isComplete()` 메서드 테스트
  - [ ] `getBrickLayout()` 메서드 테스트
- [ ] `Level.js` 구현
  - [ ] 생성자 구현
  - [ ] `loadLevel()` 메서드 구현
  - [ ] `isComplete()` 메서드 구현
  - [ ] `getBrickLayout()` 메서드 구현

### 2.7 Storage 클래스 (TDD)
- [ ] `Storage.test.js` 테스트 작성
  - [ ] `saveHighScore()` 테스트
  - [ ] `getHighScore()` 테스트
  - [ ] `saveSettings()` 테스트
  - [ ] `getSettings()` 테스트
  - [ ] `saveGameState()` / `getGameState()` 테스트
- [ ] `Storage.js` 구현
  - [ ] LocalStorage 래퍼 구현
  - [ ] 데이터 직렬화/역직렬화
  - [ ] 에러 핸들링

### 2.8 점수 시스템 (TDD)
- [ ] `ScoreManager.test.js` 테스트 작성
  - [ ] 기본 점수 계산 테스트
  - [ ] 콤보 시스템 테스트
  - [ ] 콤보 타임아웃 테스트
  - [ ] 최대 콤보 추적 테스트
- [ ] `ScoreManager.js` 구현
  - [ ] 점수 계산 로직
  - [ ] 콤보 시스템 구현
  - [ ] 콤보 타이머 관리

---

## 📋 Phase 3: 게임 엔진 및 렌더링

### 3.1 Game 클래스
- [ ] `Game.js` 기본 구조 작성
  - [ ] 클래스 선언 및 생성자 정의
  - [ ] Canvas 및 Context 초기화
  - [ ] 게임 상태 enum 정의 (START, PLAYING, PAUSED, GAMEOVER)
  - [ ] 초기 상태 변수 설정 (score, lives, level 등)
- [ ] 초기화 메서드 구현
  - [ ] `init()` 메서드 작성
  - [ ] Canvas 크기 설정
  - [ ] 게임 객체 인스턴스 생성 준비
- [ ] 게임 루프 메서드 구현
  - [ ] `update(deltaTime)` 메서드 작성
  - [ ] `render()` 메서드 작성
  - [ ] `gameLoop(timestamp)` 메서드 작성
  - [ ] requestAnimationFrame 연결
- [ ] 게임 객체 생성 및 관리
  - [ ] Ball 인스턴스 생성
  - [ ] Paddle 인스턴스 생성
  - [ ] Level 인스턴스 생성 및 Brick 배열 초기화
  - [ ] ParticleSystem 인스턴스 생성
  - [ ] ScoreManager 인스턴스 생성
- [ ] 충돌 감지 통합
  - [ ] Ball-Paddle 충돌 체크 및 처리
  - [ ] Ball-Brick 충돌 체크 및 처리
  - [ ] Ball-Wall 충돌 체크 및 처리
  - [ ] 충돌 시 파티클 생성
- [ ] 점수 시스템 통합
  - [ ] 벽돌 파괴 시 점수 추가
  - [ ] 콤보 시스템 연동
  - [ ] HUD 업데이트
- [ ] 생명 시스템 구현
  - [ ] Ball 낙하 감지
  - [ ] 생명 감소 로직
  - [ ] 게임 오버 조건 체크
  - [ ] Ball 리셋 로직
- [ ] 레벨 진행 로직
  - [ ] 레벨 완료 조건 체크
  - [ ] 다음 레벨 로드
  - [ ] Ball 속도 증가
  - [ ] 레벨 전환 애니메이션 (선택사항)

### 3.2 GameLoop 클래스
- [ ] `GameLoop.js` 구현
  - [ ] RequestAnimationFrame 기반 루프
  - [ ] Fixed timestep 구현
  - [ ] Delta time 계산
  - [ ] 시작/정지 메서드

### 3.3 렌더링 시스템
- [ ] `Renderer.js` 구현
  - [ ] Canvas 초기화
  - [ ] 클리어 메서드
  - [ ] 배경 렌더링
- [ ] 각 클래스에 `render()` 메서드 추가
  - [ ] `Ball.render()` - 글로우 효과
  - [ ] `Paddle.render()` - 그라데이션 및 글로우
  - [ ] `Brick.render()` - 타입별 색상 및 글로우
  - [ ] 체력에 따른 투명도 처리

### 3.4 Particle 시스템
- [ ] `Particle.js` 구현
  - [ ] Particle 클래스
  - [ ] 생명주기 관리
  - [ ] 페이드아웃 효과
- [ ] `ParticleSystem.js` 구현
  - [ ] 파티클 생성 및 관리
  - [ ] 객체 풀링 적용
  - [ ] 렌더링 최적화

---

## 📋 Phase 4: UI 구현

### 4.1 HTML 구조
- [ ] `index.html` 기본 구조 작성
  - [ ] DOCTYPE 및 html 태그 (lang="ko", class="dark")
  - [ ] head 섹션 작성
  - [ ] body 기본 구조
- [ ] 메타 태그 설정
  - [ ] charset UTF-8
  - [ ] viewport 설정 (width=device-width, initial-scale=1.0)
  - [ ] description 메타 태그
  - [ ] theme-color 메타 태그
  - [ ] Open Graph 태그 (선택사항)
- [ ] 외부 리소스 로드
  - [ ] Google Fonts 링크 (Spline Sans)
  - [ ] Material Symbols Outlined 아이콘 링크
  - [ ] Favicon 링크
- [ ] CSS 파일 연결
  - [ ] main.css 링크
  - [ ] animations.css 링크
- [ ] 화면 컨테이너 구조
  - [ ] Start Screen 컨테이너
  - [ ] Game Screen 컨테이너
  - [ ] Game Over Screen 컨테이너
  - [ ] Pause Modal 컨테이너
- [ ] Canvas 요소 추가
  - [ ] canvas#game-canvas 생성
  - [ ] 기본 크기 설정
- [ ] JavaScript 모듈 로드
  - [ ] main.js를 type="module"로 로드

### 4.2 CSS 스타일링
- [ ] `src/styles/main.css` 작성
  - [ ] Tailwind 임포트
  - [ ] 커스텀 CSS 변수
  - [ ] 기본 스타일
- [ ] `src/styles/animations.css` 작성
  - [ ] 네온 글로우 효과
  - [ ] 펄스 애니메이션
  - [ ] 페이드 인/아웃
  - [ ] 샤인 효과
  - [ ] 벽돌 파괴 애니메이션

### 4.3 시작 화면 (Start Screen)
- [ ] HTML 마크업
  - [ ] 로고 영역
  - [ ] 타이틀
  - [ ] 최고 점수 표시
  - [ ] 버튼 (게임 시작, 설정, 순위표)
  - [ ] 버전 정보
- [ ] 스타일링
  - [ ] 배경 효과
  - [ ] 버튼 호버 효과
  - [ ] 반응형 레이아웃

### 4.4 게임 화면 (Game Screen)
- [ ] HTML 마크업
  - [ ] HUD (헤더)
  - [ ] Canvas 영역
  - [ ] 터치 컨트롤 영역
- [ ] HUD 구현
  - [ ] 일시정지 버튼
  - [ ] 레벨 표시
  - [ ] 생명 표시
  - [ ] 점수 표시
- [ ] 스타일링
  - [ ] HUD 레이아웃
  - [ ] Canvas 크기 조정
  - [ ] 터치 영역 스타일

### 4.5 게임 오버 화면 (Game Over Screen)
- [ ] HTML 마크업
  - [ ] 결과 헤더
  - [ ] 점수 카드
  - [ ] 통계 정보
  - [ ] 액션 버튼
- [ ] 스타일링
  - [ ] 배경 블러 효과
  - [ ] 카드 레이아웃
  - [ ] 별점 표시
  - [ ] 버튼 애니메이션

### 4.6 모달 (Modal)
- [ ] 일시정지 모달
  - [ ] HTML 구조
  - [ ] 스타일링
  - [ ] 버튼 (계속하기, 다시 시작, 메인 메뉴)
- [ ] 설정 모달 (Phase 2)
  - [ ] HTML 구조
  - [ ] 스타일링
  - [ ] 설정 옵션

---

## 📋 Phase 5: 입력 및 상호작용

### 5.1 Input Manager
- [ ] `Input.js` 구현
  - [ ] 마우스 이벤트 처리
  - [ ] 터치 이벤트 처리
  - [ ] 입력 좌표 정규화
  - [ ] 이벤트 리스너 등록/해제

### 5.2 Screen Manager
- [ ] `Screen.js` 구현
  - [ ] 화면 전환 로직
  - [ ] 페이드 인/아웃 애니메이션
  - [ ] 화면별 초기화/정리
- [ ] 각 화면 클래스 구현
  - [ ] `StartScreen.js`
  - [ ] `GameScreen.js`
  - [ ] `GameOverScreen.js`

### 5.3 Modal Manager
- [ ] `Modal.js` 구현
  - [ ] 모달 열기/닫기
  - [ ] 배경 클릭 처리
  - [ ] ESC 키 처리
  - [ ] 애니메이션

### 5.4 이벤트 핸들링
- [ ] 버튼 클릭 이벤트
  - [ ] 게임 시작
  - [ ] 일시정지/재개
  - [ ] 다시 시작
  - [ ] 메인 메뉴로
- [ ] 게임 이벤트
  - [ ] 벽돌 파괴 시 파티클 생성
  - [ ] 생명 감소 시 애니메이션
  - [ ] 레벨 완료 시 전환

---

## 📋 Phase 6: 통합 및 최적화

### 6.1 메인 진입점
- [ ] `src/scripts/main.js` 작성
  - [ ] 초기화 로직
  - [ ] 게임 인스턴스 생성
  - [ ] 화면 관리자 설정
  - [ ] 이벤트 리스너 등록

### 6.2 성능 최적화
- [ ] Canvas 최적화
  - [ ] 오프스크린 캔버스 적용
  - [ ] 레이어 분리 (정적/동적)
  - [ ] 더티 렉트 최적화
- [ ] 객체 풀링
  - [ ] Particle 풀링
  - [ ] 재사용 가능한 객체 풀링
- [ ] 메모리 관리
  - [ ] 불필요한 객체 정리
  - [ ] 이벤트 리스너 정리

### 6.3 반응형 디자인
- [ ] 다양한 화면 크기 대응
  - [ ] Canvas 크기 자동 조정
  - [ ] UI 요소 반응형 처리
  - [ ] 터치 영역 최적화
- [ ] 모바일 최적화
  - [ ] 터치 입력 최적화
  - [ ] Safe area 처리
  - [ ] 성능 최적화

---

## 📋 Phase 7: 테스트 및 검증

### 7.1 단위 테스트 (코어 로직만)
- [ ] 모든 코어 로직 테스트 실행
  - [ ] Ball 클래스 테스트
  - [ ] Paddle 클래스 테스트
  - [ ] Brick 클래스 테스트
  - [ ] Physics 클래스 테스트
  - [ ] Level 클래스 테스트
  - [ ] Storage 클래스 테스트
  - [ ] ScoreManager 클래스 테스트
- [ ] 테스트 커버리지 확인 (코어 로직 80% 이상)
- [ ] 엣지 케이스 추가 테스트

> **중요**: UI 컴포넌트(Input, Screen, Modal, Renderer 등)는 자동화 테스트를 작성하지 않습니다.

### 7.2 통합 테스트 (코어 로직 통합)
- [ ] 게임 로직 통합 테스트
  - [ ] Ball-Paddle 충돌 시나리오
  - [ ] Ball-Brick 충돌 및 파괴 시나리오
  - [ ] 레벨 완료 조건 검증
  - [ ] 점수 계산 및 콤보 시스템 검증
- [ ] 로컬 스토리지 통합 테스트
  - [ ] 최고 점수 저장/로드
  - [ ] 게임 상태 저장/로드

### 7.3 수동 테스트 (UI 및 전체 게임플레이)
- [ ] 게임 플레이 시나리오 수동 테스트
  - [ ] 시작 화면 → 게임 시작 → 플레이 → 게임 오버
  - [ ] 레벨 완료 → 다음 레벨 전환
  - [ ] 일시정지 → 재개
  - [ ] 다시 시작 기능
  - [ ] 메인 메뉴로 돌아가기
- [ ] UI 요소 수동 검증
  - [ ] 모든 버튼 클릭 동작 확인
  - [ ] HUD 정보 정확성 확인 (점수, 생명, 레벨)
  - [ ] 모달 열기/닫기 동작 확인
  - [ ] 화면 전환 애니메이션 확인
- [ ] 입력 시스템 수동 테스트
  - [ ] 마우스 입력 정확성
  - [ ] 터치 입력 정확성
  - [ ] 패들 이동 반응성
- [ ] 브라우저 호환성 테스트
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] 모바일 테스트
  - [ ] iOS Safari
  - [ ] Chrome Mobile
  - [ ] 터치 컨트롤 동작 확인
  - [ ] 화면 회전 대응 확인
- [ ] 반응형 디자인 테스트
  - [ ] 다양한 화면 크기에서 레이아웃 확인
  - [ ] Canvas 크기 조정 확인
  - [ ] UI 요소 배치 확인
- [ ] 성능 테스트
  - [ ] 60 FPS 유지 확인
  - [ ] 메모리 누수 확인
  - [ ] 로딩 시간 확인
- [ ] 시각적 검증
  - [ ] 디자인 파일과 비교
  - [ ] 네온 효과 및 애니메이션 확인
  - [ ] 색상 및 폰트 확인

---

## 📋 Phase 8: 빌드 및 배포

### 8.1 GitHub Actions 설정
- [ ] `.github/workflows/deploy.yml` 작성
  - [ ] Node.js 환경 설정
  - [ ] 의존성 설치
  - [ ] 테스트 실행
  - [ ] 빌드 실행
  - [ ] GitHub Pages 배포

### 8.2 배포 준비
- [ ] 프로덕션 빌드 테스트
- [ ] 빌드 산출물 검증
- [ ] 환경 변수 설정

### 8.3 배포
- [ ] GitHub Pages 설정
- [ ] 첫 배포 실행
- [ ] 배포된 사이트 검증
- [ ] 모바일 환경 검증

---

## 📋 Phase 9: 문서화 및 마무리

### 9.1 코드 문서화
- [ ] JSDoc 주석 추가
- [ ] 복잡한 로직 설명 주석
- [ ] API 문서 생성 (선택사항)

### 9.2 사용자 문서
- [ ] README.md 업데이트
  - [ ] 스크린샷 추가
  - [ ] 플레이 방법 설명
  - [ ] 기술 스택 설명
- [ ] CHANGELOG.md 작성
- [ ] LICENSE 파일 추가

### 9.3 최종 검토
- [ ] 코드 리뷰 체크리스트 확인
- [ ] SOLID 원칙 준수 확인
- [ ] 테스트 커버리지 확인
- [ ] 성능 지표 확인

---

## 📋 Phase 10: 향후 개선 (Phase 2)

### 10.1 사운드 시스템
- [ ] Web Audio API 통합
- [ ] 효과음 추가
  - [ ] 벽돌 파괴
  - [ ] 패들 충돌
  - [ ] 생명 감소
  - [ ] 레벨 완료
- [ ] 배경 음악 추가
- [ ] 사운드 설정 옵션

### 10.2 파워업 시스템
- [ ] 파워업 타입 정의
  - [ ] 멀티볼
  - [ ] 패들 확장
  - [ ] 슬로우 모션
  - [ ] 관통 볼
- [ ] 파워업 드롭 로직
- [ ] 파워업 효과 구현
- [ ] 파워업 UI

### 10.3 추가 기능
- [ ] 더 많은 레벨 디자인 (10개 이상)
- [ ] 난이도 설정
- [ ] 다양한 벽돌 패턴
- [ ] 특수 벽돌 (폭탄, 보너스 등)

### 10.4 PWA 변환
- [ ] Service Worker 구현
- [ ] 오프라인 지원
- [ ] 앱 매니페스트
- [ ] 설치 프롬프트

### 10.5 온라인 기능
- [ ] Firebase 통합
- [ ] 온라인 리더보드
- [ ] 소셜 공유 기능
- [ ] 사용자 프로필

---

## 📊 진행 상황 요약

- **Phase 1**: 프로젝트 초기 설정 - `0/7` 완료
- **Phase 2**: 코어 로직 구현 (TDD) - `0/8` 완료
- **Phase 3**: 게임 엔진 및 렌더링 - `0/4` 완료
- **Phase 4**: UI 구현 - `0/6` 완료
- **Phase 5**: 입력 및 상호작용 - `0/4` 완료
- **Phase 6**: 통합 및 최적화 - `0/3` 완료
- **Phase 7**: 테스트 및 검증 - `0/3` 완료
- **Phase 8**: 빌드 및 배포 - `0/3` 완료
- **Phase 9**: 문서화 및 마무리 - `0/3` 완료
- **Phase 10**: 향후 개선 - `0/5` 완료

**전체 진행률**: 0% (0/46 섹션 완료)

---

## 🎯 다음 단계

현재 진행해야 할 작업은 **Phase 1: 프로젝트 초기 설정**입니다.

### 즉시 시작 가능한 작업
1. npm 프로젝트 초기화 (`npm init -y`)
2. Vite 설치 및 설정
3. Tailwind CSS 설치 및 설정
4. 프로젝트 폴더 구조 생성

### 권장 작업 순서
Phase 1 → Phase 2 (TDD로 코어 로직) → Phase 3 (게임 엔진) → Phase 4 (UI) → Phase 5 (입력) → Phase 6 (최적화) → Phase 7 (테스트) → Phase 8 (배포) → Phase 9 (문서화)

---

## 📝 참고 사항

- 각 Phase는 순차적으로 진행하되, 필요에 따라 유연하게 조정 가능
- Phase 2 (코어 로직)는 반드시 TDD로 진행
- Phase 10은 MVP 완성 후 진행
- 각 작업 완료 시 체크박스를 `[x]`로 표시
- 진행 중인 작업은 `[/]`로 표시 (선택사항)
