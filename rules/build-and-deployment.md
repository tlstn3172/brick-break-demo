# Build and Deployment Rules

## Build System

### GitHub Actions
- **모든 빌드는 GitHub Actions를 통해 자동화됩니다.**
- `main` 브랜치에 push 시 자동으로 빌드가 트리거됩니다.
- 빌드 프로세스:
  1. Node.js 환경 설정 (v18 이상)
  2. 의존성 설치 (`npm ci`)
  3. 테스트 실행 (`npm test`)
  4. 프로덕션 빌드 (`npm run build`)
  5. 빌드 산출물 검증

### Build Configuration
- **빌드 도구**: Vite
- **출력 디렉토리**: `dist/`
- **Base Path**: `/brick-break-demo/`
- **최적화**:
  - Minification 활성화
  - Source maps 비활성화 (프로덕션)
  - Console 로그 제거
  - Asset 최적화

## Deployment

### GitHub Pages
- **모든 배포는 GitHub Pages를 통해 이루어집니다.**
- 배포 대상: `gh-pages` 브랜치
- 배포 URL: `https://<username>.github.io/brick-break-demo/`

### Deployment Process
1. GitHub Actions에서 빌드 완료 후 자동 배포
2. `peaceiris/actions-gh-pages@v3` 액션 사용
3. `dist/` 폴더 내용을 `gh-pages` 브랜치에 배포
4. GitHub Pages 자동 갱신

### Deployment Checklist
- [ ] 빌드가 성공적으로 완료되었는지 확인
- [ ] 모든 테스트가 통과했는지 확인
- [ ] 배포 후 실제 사이트에서 동작 확인
- [ ] 모바일 환경에서 테스트

## Environment Variables
- 환경 변수는 GitHub Secrets에 저장
- `GITHUB_TOKEN`은 자동으로 제공됨
- 추가 환경 변수가 필요한 경우 `.env.example` 파일 생성

## Workflow File Location
`.github/workflows/deploy.yml`

## Manual Deployment (비상시)
```bash
# 로컬에서 빌드
npm run build

# gh-pages 브랜치에 수동 배포 (필요시)
npm run deploy
```

## Rollback Strategy
- 이전 커밋으로 되돌리기
- GitHub Pages 설정에서 이전 배포 버전 선택
- 긴급 수정 후 재배포
