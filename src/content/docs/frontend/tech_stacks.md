---
title: Javascript tech stacks
description: Javascript tech stacks
---

## Micro Frontends
- Nx: https://nx.dev/examples/nx-examples
- Vite/Webpack5: https://ruslan.rocks/posts/micro-frontend-architecture

## Vite / ESBuild / SWC
- https://juejin.cn/post/7091655236938366989

## Vite
- https://vitejs.dev/
- Next generation fronend tooling
- competitors: Webpack
- Vite uses ESBuild as pre bundle dependencies (development)
- Vite uses Rollup for bundler (production)
- serves code using native ESM (let browser take over part of the job of a bundler)

## ESBuild
- https://esbuild.github.io/
- Javascript bundler in Go
- To replace Webpack
- competitors: Parcel2 / Rollup / Webpack


## SWC
- https://swc.rs/
- Rust based javascript compiler which can replace bacel
- Next.js use SWC as compiler

## UnJs
- https://github.com/unjs
- Unified JavaScript Tools
- Seems Nuxt3 is using some of the stuffs under UnJS (e.g. nitro as server engine, h3 for deployment)

## React / Redux / Next.js / create-react-app (CRA)
- https://stackoverflow.com/questions/62967958/what-is-the-difference-between-nextjs-and-create-react-app
- create-react-app and Next.js are in same stack
- Next.js supports SSR (server side rendering)
- create-react-app supports CSR (client side rendering)
- Next.js router is file based router

### Next.js
- React based framework created by Vercel
- E2E Testing (Cypress, Playwright)
- Unit Testing (Jest, React Testing)
- Compiler (SWC) - rust based compiler which can replace babel

## Vue.js / Vuex / Vuetify / Nuxt.js

### Vue.js
- javascript library

### Vuex
- State Management library for Vue
- https://vuex.vuejs.org/
- Replaced by Pinia (https://pinia.vuejs.org/)
- Pinia is now default, considered as Vuex 5

### Vuetify
- Material UI component library for Vue
- https://vuetifyjs.com/en/

### Nuxt.js
- webpack + vue loader + vuex + router
- Nuxt3 supports both webpack5 and Vite, be rewritten in typescript
- (Nuxt3) esbuild as transpiler (replace babel)
- (Nuxt3) Nitro as server engine
- (Nuxt3) UnJs - An organization offerering a set of ESM friendly JS tools
- vue-router
- create-nuxt-app

### Pinia Vue3 Todo List
- https://developers.deepgram.com/blog/2022/04/build-a-todo-list-with-pinia-and-vue-3/


## Build systems
- Nx (Mono repo for Angular) by Nwrl 
- TurboRepo by Vercel

### Nx
-With Angular 14, supports mono repo with module federation (micro frontend)