# Electron TODO 연습

Electron, React, TypeScript로 만든 간단한 데스크톱 TODO 앱입니다. 할 일을 추가하고, 완료 상태를 바꾸고, 삭제할 수 있습니다. 앱을 다시 열어도 목록이 유지되도록 로컬 파일에 저장합니다.

## 연습한 내용

- Electron 메인 프로세스와 렌더러 프로세스의 역할 구분
- Preload를 통해 렌더러에 필요한 API만 노출하기
- IPC로 할 일 목록을 불러오고 저장하기
- React의 `useState`, `useEffect`, `useRef`를 이용한 상태와 비동기 작업 관리
- 컴포넌트를 나눠 입력 폼과 할 일 목록 구성하기
- `userData` 경로의 `todos.json` 파일을 이용한 로컬 데이터 저장
- Zod 스키마로 저장된 데이터 구조 검증하기
- TypeScript 타입으로 TODO 데이터와 컴포넌트 props 정의하기
- 저장 중 입력을 잠그고 저장 실패 메시지 표시하기

## 주요 기능

- 할 일 추가
- 완료 / 미완료 전환
- 할 일 삭제
- 앱 재실행 후 저장된 목록 불러오기
- 저장 중 중복 조작 방지 및 오류 표시

## 기술 스택

- Electron
- React
- TypeScript
- electron-vite
- Zod

## 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```
