<div align="center">
 <h1 align="center"><a href="https://microsaas.alexgalhardo.com/" target="_blank">Galhardo MicroSaaS</a></h1>
</div>

## Live Demo: <https://microsaas.alexgalhardo.com>

## Introduction

*   This is personal project and challenge I created to learn ReactJS with Typescript using Single Page Applications (SPA) principles, to see if I could program a microsaas MVP within a week.
*   This project uses JWT tokens using stateless authentication.
*   BackEnd is a simple Typescript code using Express REST API endpoints using Clean Architecture Principles (ports, useCases, etc)
*   I choosed to save data in a JSON as database for simplicity and development velocity reasons.

## Code Statistics (FrontEnd + BackEnd)

![code-statis](https://github.com/AlexGalhardo/Galhardo-Finances/assets/19540357/9ad4630e-72fd-4d53-a35a-5db3bed15c65)

## Tools and Services Used

- [Linux Mint XFCE 21.04](https://linuxmint.com/)
- [Git for control version](https://git-scm.com/)
- [Vite v4](https://vitejs.dev/)
- [Boostrap v5](https://getbootstrap.com/)
- [ReacJS](https://react.dev/) v18 + TypeScript v5.2.2
- [NodeJS v20](https://nodejs.org/en)
- [VSCode version 1.81 (July 2023)](https://code.visualstudio.com/)
- [Insomnia for HTTP Requests Tests](https://insomnia.rest/)
- [Vercel.com for FrontEnd deploy](https://vercel.com/)
- [Render.com for Backend (API) deploy](https://render.com/)
- [Resend.com for emails](https://resend.com/)
- [Stripe.com for payments](https://stripe.com/)
- Frontend Global State Management:
   - [React Hooks: createContext, useContext, useMemo, useReducer, useCallback](https://react.dev/reference/react)

## Development Setup Local - FrontEnd

*   Clone this repository

<!---->

    git clone https://github.com/AlexGalhardo/Galhardo-MicroSaaS

*   Enter repository

<!---->

    cd Galhardo-MicroSaaS/

*   Install dependencies

<!---->

    npm install

*   Start local server

<!---->

    npm run dev

*   Go to: <http://localhost:5173/>


## Build for production

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

## Development Setup Local - BackEnd (API)

*   Enter repository

<!---->

    cd Galhardo-MicroSaaS/api/

*   Install dependencies

<!---->

    npm install

*   Start local server

<!---->

    npm run dev

*   Go to: <http://localhost:3000/>

## Before Submit Commits & PRs

*   Run command:

<!---->

    npm run format

<!---->

## Git Conventional Commits

*   You can learn more here: <https://www.conventionalcommits.org/en/v1.0.0/>

*   We highly recommend you to use this pattern to make git commits in this code repository

*   test:
    *   Indicates any type of creation or alteration of test codes.
    *   Example: Creating unit tests.

*   feat:
    *   Indicates the development of a new feature to the project. Example: Addition of a service, functionality, endpoint, etc.

*   refactor:
    *   Used when there is a code refactoring that does not have any impact on the system's business logic/rules. - Example: Code changes after a code review

*   style:
    *   Used when there are formatting and style changes to the code that do not change the system in any way.
    *   Example: Change style-guide, change lint convention, fix indentations, remove whitespace, remove comments, etc..

*   fix:
    *   Used when correcting errors that are generating bugs in the system.
    *   Example: Applying handling to a function that is not having the expected behavior and returning an error.

*   chore:
    *   Indicates changes to the project that do not affect the system or test files. These are developmental changes.
    *   Example: Change eslint rules, add prettier, add more file extensions to .gitignore

*   docs:
    *   Used when there are changes in the project's documentation.
    *   Example: add information in the API documentation, change the README, etc.

*   build:
    *   Used to indicate changes that affect the project's build process or external dependencies.
    *   Example: Gulp, add/remove npm dependencies, etc.

*   perf:
    *   Indicates a change that improved system performance.
    *   Example: change ForEach to while, improve the database query, etc.

*   ci:
    *   Used for changes in CI configuration files.
    *   Example: Circle, Travis, BrowserStack, etc.

*   revert:
    *   Indicates the reversal of a previous commit.

![git-patterns](https://github.com/AlexGalhardo/Software-Engineering/assets/19540357/0111b723-6885-4991-9c4e-e20833cfdbd9)

## Git Branch Names

*   We highly recommend you to use this pattern to make git branchs in this code repository
*   main
    *   Most stable version of the software that is in production
*   staging
    *   Most up-to-date version of the software that is in the staging/testing environment before going to production, used for end-to-end testing
*   feature/feature\_name\_here
    *   Branch created to start implementing a new feature
*   bugfix/bug\_name\_here
    *   Branch created for bug fixing
*   hotfix/hotfix\_summary\_here
    *   Branch created to fix urgent bugs that appeared in production
*   refactor/refactor\_summary\_here
    *   Branch created to refactor code, edit and delete different files, without changing the behavior of the software or adding any new functionality
*   docs/summary\_here
    *   Branch created with main purpose of improving and editing documentations (Swagger, Markdowns, etc)

## Name Patterns

| Context | Pattern to be followed |
|-----------------|----------------------|
| folders name outside src/           | camelCase    |
| functions names |  camelCase |
| common variables names |  camelCase |
| params, args, object attributes |  camelCase |
| folders name inside src/           | PascalCase    |
| interface, enums and types names |  PascalCase |
| class names |  PascalCase |
| components .tsx files |  PascalCase |
| .controller files           | PascalCase    |
| .service files            | PascalCase    |
| .repository files |  PascalCase |
| .useCase files         | PascalCase       |
| .port files         | PascalCase       |
| .test files        | PascalCase       |
| SQL/NoSQL tables and columns |  snake\_case |
| acronyms (example: CRM )         | UPPERCASE       |
| CONSTANTS names |  UPPER\_CASE separated by \_ |
| names of folders, files, variables, functions etc native to libs and frameworks |  KEEP STANDARD |

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) August 2023-present, [Alex Galhardo](https://github.com/AlexGalhardo)
