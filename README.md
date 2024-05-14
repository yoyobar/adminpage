<h3 align="center">Admin 페이지 구현 프로젝트</h2>
<p align="center">
<img src="https://img.shields.io/badge/-typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=48a0eb">
<img src="https://img.shields.io/badge/-React-20232a?style=for-the-badge&logo=React&logoColor=61dafb">
  <img src="https://img.shields.io/badge/-Docker-2ca4e0?style=for-the-badge&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/-mySQL-0c0b13?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/-TailwindCSS-647f8d?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4">
  <img src="https://img.shields.io/badge/-ZUSTAND-5c1f70?style=for-the-badge">
  <img src="https://img.shields.io/badge/-React_Query-20232a?style=for-the-badge&logo=ReactQuery&logoColor=FF4154">
</p>
<hr>

### 프로젝트 목적

`OAuth`를 통해 일반적인 회원가입 / 로그인을 지원하는 간단한 태스크매니저 프로젝트입니다.

데이터베이스`Mysql`을 이용해 서버단과 직접 통신하고 `CRUD`을 구현했습니다.

Dark Theme, Modal등 간단한 사용자 친화적인 기능을 추가하였습니다.

<br>

### 기술스택 사용목적

-   `TypeScript`를 직접적으로 연습해보고자 도입 했습니다.
-   `mySql`과 효율적인 통신을 위해 `Docker`를 활용하여 구현 하였습니다.
-   `Global State`를 통한 상태관리에 익숙해지기위해 `Zustand`를 도입하여 사용 했습니다.
-   간단한 테마 지원과 빠른 스타일링 작성을 위해 `Tailwind CSS`를 도입하여 사용 했습니다.
-   `Token Verify`등 간단한 사용자 정보 비동기관리를 위해 `React-query`를 도입하여 사용 했습니다.

<br>

### 디렉터리 구조

<img style="border-radius: 15px" src='./docs/img/tree.png'>

### 기능별 구현 과정

[서버 구현](./docs/server.md) <br>
[회원가입 구현](./docs/register.md) <br>
[로그인 구현](./docs/login.md) <br>
[검증 구현](./docs/verify.md) <br>
[태스크 페이지 구현](./docs/task.md) <br>
[어드민 페이지 구현](./docs/admin.md) <br>
