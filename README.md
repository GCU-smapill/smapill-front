# 🩺 SmaPill – 복약 관리 앱 (Frontend)

> **SmaPill**은 약 복용이 필요한 사용자(노인, 만성 질환자 등)를 위해 설계된 복약 관리 앱입니다. 사용자는 처방전 사진을 촬영하여 약 정보를 등록하고, 자동 생성된 복약 일정에 따라 알림을 받을 수 있으며, 보호자와 연결해 복용 현황을 공유할 수 있습니다.

---

## 📱 주요 기능

* 📸 **약 정보 등록**
  1. 직접 수기로 약 이름, 복용량, 시간대 등을 입력하여 복약 일정을 등록합니다.
  
  2. 처방전 사진을 촬영하면 OCR을 통해 약 이름, 복용량, 시간대 등을 자동으로 추출합니다.

* ⏰ **복약 일정 및 알림**
  사용자는 복용 시작일, 종료일, 시간대를 선택해 복약 일정을 설정할 수 있으며, 해당 시간에 로컬 알림을 받습니다.

* 📒 **복약 기록 확인**
  오늘의 복약 현황을 체크하거나 지난 복용 기록을 확인할 수 있습니다.

* 🧑‍🤝‍🧑 **보호자 연결 기능**
  보호자는 특정 사용자의 복약 이력 및 실시간 복용 상태를 확인할 수 있으며, 서로 등록과 해제가 가능합니다.

---

## 🛠️ 기술 스택

💬 사용 언어

JavaScript (React Native)

TypeScript (일부 컴포넌트)


| 분류         | 기술 스택                                 |
| ---------- | ------------------------------------- |
| **프레임워크**  | React Native CLI, React Navigation v6 |
| **상태 관리**  | Zustand                               |
| **알림**     | react-native-push-notification        |
| **폼/검증**   | React Hook Form, Zod                  |
| **네트워크**   | Axios, REST API 기반 통신                 |
| **이미지 처리** | react-native-image-picker 등           |

---

## 📁 폴더 구조

```
smapill-front/
├── src/
│   ├── components/     # 공통 UI 컴포넌트
│   ├── screens/        # 주요 화면 컴포넌트
│   ├── navigation/     # Stack/Tab Navigation 설정
│   ├── store/          # Zustand 전역 상태 관리
│   ├── services/       # API 요청, OCR, 알림 등 서비스 모듈
│   ├── utils/          # 유틸리티 함수 모음
│   └── assets/         # 이미지, 아이콘 등 정적 리소스
├── app.json
├── package.json
└── README.md
```

---

## ⚙️ 설치 및 실행 방법

### 1. 클론 및 설치

```bash
git clone https://github.com/GCU-smapill/smapill-front.git
cd smapill-front
npm install
```

### 2. 실행

**Android:**

```bash
npx react-native run-android
```

**iOS (Mac에서만):**

```bash
npx pod-install
npx react-native run-ios
```

---

## ✅ 사용 흐름 예시

1. 앱 실행 후 로그인
2. 사용자 또는 보호자 선택
3. 사용자라면 '약 등록' 버튼 클릭 → 사진 촬영 → OCR 분석
4. 복약 일정 자동 생성 및 수동 수정 가능
5. 설정한 시간에 로컬 푸시 알림 수신
6. 복약 완료 토글 및 기록 확인 가능
7. 보호자와 연결하면 실시간으로 상태 공유

---

## 🎯 향후 업데이트 예정

* [ ] 통계 대시보드 및 히스토리 그래프
* [ ] 클라우드 데이터 백업/복원
* [ ] 다크모드 및 폰트 조절 기능

---

## 👥 팀 정보

* 김진성 (프론트엔드)

---

## 📄 라이선스

MIT License © 2025 SmaPill Team

---
