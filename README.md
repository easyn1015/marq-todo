# Marq-TODOS

이 프로젝트는 TypeScript, SCSS, React로 구성되었으며, node-sass로 scss를 컴파일하여 사용합니다.
프로젝트의 구성은 크게 에셋, 컴포넌트, 훅, 모크, 유틸로 되어 있습니다.

    root
    ┣ src
    ┃ ┣ assets                          # 이미지, 스타일시트 등의 자원 파일이 저장되는 폴더
    ┃ ┃ ┣ css                           # 컴파일 된 CSS파일이 저장되는 폴더
    ┃ ┃ ┣ img
    ┃ ┃ ┗ scss
    ┃ ┃   ┣ reset.scss
    ┃ ┃   ┗ style.scss
    ┃ ┣ components                      # 컴포넌트 폴더
    ┃ ┃ ┣ ReferenceItem.tsx             # 참조 하단바 리스트 아이템
    ┃ ┃ ┣ ReferecneList.tsx             # 참조 하단바 리스트
    ┃ ┃ ┣ TodoForm.tsx                  # 신규 TODO 작성 폼
    ┃ ┃ ┣ TodoList.tsx                  # TODO 리스트
    ┃ ┃ ┗ TodoListItem.tsx              # TODO 리스트 아이템
    ┃ ┣ hooks                           # 재사용 가능한 훅이 정의된 폴더
    ┃ ┃ ┣ useFilter.ts
    ┃ ┃ ┗ usePagination.ts
    ┃ ┣ mocks                           # Mock API 관련 폴더
    ┃ ┃ ┣ browser.ts
    ┃ ┃ ┗ handlers.ts                   # TODO Mock API 핸들러 파일
    ┃ ┣ utils
    ┃ ┃ ┗ formatDate.ts                 # 날짜에 관한 유틸 함수가 정의된 파일
    ┃ ┣ App.test.tsx
    ┃ ┣ App.tsx                         # App 컴포넌트 파일
    ┃ ┣ api.ts                          # TODO CRUD API 기능이 구현된 파일
    ┃ ┣ index.css
    ┃ ┣ index.tsx
    ┃ ┣ logo.svg
    ┃ ┣ react-app-env.d.ts
    ┃ ┣ reportWebVitals.ts
    ┃ ┗ setupTests.ts
    ┣ .env                              # 환경변수 저장 파일
    ┣ README.md                         # 프로젝트 설명 파일
    ┣ db.json                           # json-server 데이터베이스 파일
    ┣ package.json                      # 패키지 매니저 모듈 의존성 파일
    ┣ routes.json                       # json-server 라우팅 설정 파일
    ┗ tsconfig.json

<br>

# 실행방법

<br>

### 1. SCSS 컴파일

아래의 커맨드를 통해 node-sass 라이브러리를 전역으로 설치합니다.

```
npm install -g node-sass
```

아래의 커맨드를 통해 node-sass를 사용하여 style.scss 파일을 컴파일하여 style.css 파일로 출력합니다. -w 옵션은 파일을 감시(watch)하며, 파일이 수정될 때마다 자동으로 다시 컴파일하도록 합니다. 이렇게 하면 파일이 변경될 때마다 수동으로 컴파일할 필요가 없습니다.

```
node-sass -w .\src\assets\scss\style.scss .\src\assets\css\style.css
```

<br>

### 2. json-server를 통한 임시 데이터베이스 서버 실행

아래의 커맨드를 통해 json-server 라이브러리를 전역으로 설치합니다.

```
npm install -g json-server
```

아래의 커맨드를 통해 json-server를 실행합니다. 기본 설정에 의해 포트는 3001로 실행해야 합니다. 포트를 바꾸기 위해서는 .env 파일에서 REACT_APP_DB_HOST 값을 수정해야 합니다.

```
json-server --watch db.json --port 3001
```

<br>

### 3. 리액트 서버 실행

```
npm run start
```

