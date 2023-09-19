<div align="center">
 <h1 align="center"><a href="https://nerdapi.com/" target="_blank">nerdapi.com</a></h1>
</div>

## Introduction

*   A personal project I created to learn [ReactJS](https://react.dev/) with Typescript using Stateless Authentication with [JWT](https://jwt.io/) and localStorage, as also improve my skills in product development, UI/UX, SEO, and so on.
*   This is a Micro SaaS (software as a service) project, that uses Stripe checkout to take care of payments and subscriptions management.

## Tools and Services Used

*   [Linux Mint XFCE 21.04](https://linuxmint.com/)
*   [Git for control version](https://git-scm.com/)
*   [Vite v4](https://vitejs.dev/)
*   [Boostrap v5](https://getbootstrap.com/)
*   [ReacJS](https://react.dev/)  + TypeScript
*   [NodeJS v20](https://nodejs.org/en)
*   Code Editor: [VSCode](https://code.visualstudio.com/)
*   Google & Github Social Login
*   HTTP Requests Client: <https://insomnia.rest/>
*   Telegram API for Logs: <https://core.telegram.org/api>
*   Deploy: <https://vercel.com/>
*   Emails API: <https://resend.com/>
*   Payments API: <https://stripe.com/>
*   Frontend Global State Management:
    *   [React Hooks: useContext, useContext, useMemo, useReducer, useCallback](https://react.dev/reference/react)

## API

*   BackEnd Source Code: <https://github.com/AlexGalhardo/api.nerdapi.com>
*   Documentation Source code: <https://github.com/AlexGalhardo/docs.nerdapi.com>
*   Docs Live: <https://docs.nerdapi.com>

## Development Setup Local

*   Clone this repository

<!---->

    git clone https://github.com/AlexGalhardo/nerdapi.com

*   Enter repository

<!---->

    cd nerdapi.com/

*   Install dependencies

<!---->

    npm install

*   Setup enviroment variables

<!---->

    cp .env-example .env

*   Start local server

<!---->

    npm run dev

*   Go to: <http://localhost:5173/>

## Build for deploy

*   Create build

<!---->

    npm run build

*   Preview production build

<!---->

    npm run preview

*   Open production build local server (build + preview)

<!---->

    npm run start

*   Go to: <http://localhost:4173/>

## Before Submit Commits & PRs

*   Run command:

<!---->

    npm run format

<!---->

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) August 2023-present, [Alex Galhardo](https://github.com/AlexGalhardo)
