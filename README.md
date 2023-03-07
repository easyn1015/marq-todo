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

<br>

# 프로젝트 작업 시 고민한 내용 및 설명

-   Question. SCSS를 효과적으로 사용하여 CSS를 유지보수하기 쉽게 작성하고자 했습니다.

    Solution. BEM 방법론을 사용하여 각 블록마다 클래스 이름을 작성하였습니다. 예를 들어, header 블록의 클래스 이름은 `header`로, 헤더 내 버튼 블록의 클래스 이름은 `header__button`으로 작성하였습니다. 이렇게 하면 코드를 보고 각 블록이 어떤 역할을 하는지 쉽게 파악할 수 있으며, 클래스 이름을 중복해서 사용하지 않아서 CSS 스타일 규칙을 작성할 때 혼란을 방지할 수 있습니다.

    또한 modifier에 대해서는 `--`를 이용하여 클래스 이름을 작성하였습니다. 예를 들어, todo-list-item의 라벨에서 references 라벨, created 라벨, updated 라벨을 구분하기 위해 클래스 이름을 `todo-list-item__label--references`과 `todo-list-item__label--created`, `todo-list-item__label--updated`로 작성하였습니다. 이로 인해 CSS 스타일 규칙을 작성할 때, 특정 버튼에 대해서만 스타일을 지정할 수 있게 되어 효과적인 스타일링이 가능해졌습니다.

-   Question. 특정 TODO 항목을 업데이트 한 후, 전체 TODO 항목을 모두 불러오게 되면 불필요한 데이터 송수신이 발생하게 됩니다. 최소한의 데이터 송수신을 통해 효율적인 TODO 항목 관리를 할 수 있는 구조에 대해 고민하였습니다.

    Solution. React에서는 Virtual DOM을 사용하여 컴포넌트의 상태가 변경될 때마다 전체적인 DOM을 다시 그리지 않고 변경된 부분만 업데이트하는 방식을 채택하고 있습니다. 이를 최대한 활용하여, 해당 코드에서 상태 변수인 todos를 업데이트 할 때, setTodos 함수를 사용하여 전체 데이터를 모두 재로딩하지 않고, 변경된 데이터만 업데이트 하는 방식을 사용하였습니다. 이를 위해 updateTodo와 deleteTodo 함수에서 상태 변수인 todos를 직접 업데이트하는 것이 아니라, map 함수와 filter 함수를 사용하여 변경된 데이터만 업데이트 하도록 하였습니다. 이를 통해 전체 데이터를 모두 재로딩하지 않아도, 변경된 데이터만 업데이트 함으로써 애플리케이션의 성능을 개선하였습니다.

-   Question. 참조 항목의 툴팁이 열린 상태에서 다른 참조 항목의 툴팁이 열리게 되면 기존에 열렸던 툴팁이 닫히는 형태를 구현하고 싶었습니다.

    Solution. 참조 항목의 툴팁이 열린 상태에서 다른 참조 항목의 툴팁이 열리게 되면 기존에 열렸던 툴팁이 닫히도록 하였습니다. handleGlobalOpenItemId 함수에서 itemId를 인자로 받아 setOpenItemId 함수를 호출하여 openItemId 값을 변경하는데, 이때 새로운 itemId 값이 null이 아닌 경우 기존에 열려 있던 참조 항목의 툴팁이 있으면 닫도록 하였습니다.

-   Question. 새로운 Todo를 작성하는 부분과 등록된 Todo 부분에서 ReferenceList를 공통 컴포넌트로 사용하기 위한 구조를 구현하고 싶었습니다.

    Solution. TodoForm 컴포넌트에서는 새로운 Todo를 작성하는 부분과 등록된 Todo를 선택하는 부분에서 모두 ReferenceList 컴포넌트를 사용하고 있습니다. 이는 TodoForm과 TodoListItem의 구조를 의도적으로 유사한 형태로 만들었기 때문입니다. 디자인과 구조를 유사하게 가져가면서도 코드를 효율적으로 구현하기 위해서는 ReferenceList 컴포넌트를 공통 컴포넌트로 추출하였습니다. 이렇게 설계하면 중복된 코드를 방지할 수 있고, 추후에 ReferenceList 컴포넌트의 동작 방식이 변경되더라도 한 번만 수정하면 모든 부모 컴포넌트에서 적용할 수 있기 때문에 유지보수성이 좋아집니다.

-   Question. 필터와 페이지네이션 같이 일반적으로 사용되는 훅을 분리하여 재사용성 높은 코드를 작성하고자 하였습니다.

    Solution. useFilter 훅은 todos 데이터를 받아 필터링된 데이터와 현재 선택된 필터값, 필터를 선택하는 함수를 반환합니다. usePagination 훅은 한 페이지당 보여줄 아이템 수와 전체 데이터를 받아 현재 페이지, 현재 페이지의 아이템들, 전체 페이지 수, 이전 페이지로 이동하는 함수, 다음 페이지로 이동하는 함수를 반환합니다.

    이렇게 분리하면 TodoList 컴포넌트에서는 필터와 페이지네이션을 사용하는 대신 useFilter와 usePagination 훅을 사용하여 데이터를 가져오고 렌더링할 수 있습니다. 이렇게 분리된 훅을 다른 컴포넌트에서도 사용할 수 있으므로 코드 재사용성이 높아집니다.
