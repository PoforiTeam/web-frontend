# 포포리(Pofori) : 이력서 관리 플랫폼 Front-End

- 공유할 수 있는 “이력서 템플릿 web” 과 이를 수정하고 관리하는 “관리자 web”을 개발

# Contributers

- 신은지

# 개발 환경

- Package Manager - yarn
- Library - React v.18.2.0
- Bundler - Vite

# 실행방법

```bash
yarn dev
```

# Dependencies

- "@dnd-kit/core": "^6.1.0",
- "@dnd-kit/sortable": "^8.0.0",
- "@dnd-kit/utilities": "^3.2.2",
- "@react-oauth/google": "^0.12.1",
- "@tanstack/react-query": "^5.45.1",
- "axios": "^1.7.2",
- "formik": "^2.4.6",
- "js-cookie": "^3.0.5",
- "node-sass": "^9.0.0",
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-markdown": "^9.0.1",
- "react-router-dom": "^6.23.1",
- "yup": "^1.4.0"

# 프로젝트 구조

```
pofori
├─ src
│  ├─ components
│  │  ├─ common
│  │  ├─ layout # 공통 레이아웃
│  │  │  ├─ MainContent.jsx
│  │  │  ├─ Header.jsx
│  │  │  ├─ Layout.jsx
│  │  │  └─ Sidebar.jsx
│  │  ├─ modals # 모달 관련 컴포넌트
│  │  │  ├─ AccountEditModal.jsx
│  │  │  ├─ AccountModal.jsx
│  │  │  ├─ LoginModal.jsx
│  │  │  ├─ Modal.jsx
│  │  │  └─ Modal.scss
│  │  ├─ Resume # 상세 페이지 공통 컴포넌트
│  │  │  ├─ AddButton.jsx
│  │  │  ├─ ResumeSection.jsx
│  │  │  ├─ Resume.scss
│  │  │  └─ ResumeBox.jsx
│  │  ├─ Form # 각 이력서 항목 Form 컴포넌트
│  │  │  ├─ CareerForm.jsx
│  │  │  ├─ ExperienceForm.jsx
│  │  │  ├─ LinksForm.jsx
│  │  │  ├─ ProjectForm.jsx
│  │  │  ├─ SkillsForm.jsx
│  │  │  ├─ CareerFormItem.jsx
│  │  │  ├─ ExperienceFormItem.jsx
│  │  │  ├─ LinksFormItem.jsx
│  │  │  ├─ ProjectFormItem.jsx
│  │  │  ├─ SkillsFormItem.jsx
│  │  │  ├─ EducationFormItem.jsx
│  │  │  ├─ IntroduceForm.jsx
│  │  │  ├─ ProfileForm.jsx
│  │  │  └─ EducationForm.jsx
│  │  └─ DnD # Drag-and-Drop 관련 세부 컴포넌트
│  │     └─ SortableItem.jsx
│  ├─ utils
│  │  └─ socialLogin # 소셜로그인
│  │     ├─ GoogleLoginBtn.jsx
│  │     ├─ KakaoLoginBtn.jsx
│  │     ├─ NaverLoginBtn.jsx
│  │     └─ KakaoRedirection.jsx
│  ├─ assets
│  │  ├─ styles
│  │  │  ├─ application.scss
│  │  │  ├─ reset.scss
│  │  │  └─ layout.scss
│  │  └─ img
│  │     ├─ banner.png
│  │     ├─ guide.png
│  │     ├─ logo
│  │     │  ├─ google.png
│  │     │  ├─ kakao.png
│  │     │  └─ naver.png
│  │     ├─ question.png
│  │     └─ draggabledots.png
│  ├─ pages
│  │  ├─ Home # 홈 화면(메인)
│  │  │  ├─ Home.jsx
│  │  │  └─ Home.scss
│  │  ├─ Resume # 이력서 상세 페이지
│  │  │  ├─ Resume.jsx
│  │  │  └─ Resume.scss
│  │  └─ Settings # 회원 정보 수정
│  │     └─ Settings.jsx
│  ├─ api # api 관리
│  │  ├─ core
│  │  │  └─ index.js
│  │  ├─ hooks
│  │  │  └─ useAuth.js
│  │  ├─ services # 로그인 관련 api 관리
│  │  │  └─ authService.js
│  │  └─ resumeApi.js # 이력서 관련 api 관리
│  ├─ context
│  │  └─ AuthContext.jsx
│  ├─ index.jsx
│  ├─ App.jsx
│  └─ router.jsx
├─ .eslintrc.cjs
├─ README.md
├─ .gitignore
├─ vite.config.js
├─ index.html
├─ package.json
└─ yarn.lock

```

# 빌드 및 업로드

```bash
yarn build
```
