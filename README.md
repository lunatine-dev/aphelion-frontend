# 🌙 aphelion-frontend

> 🖥️ SvelteKit dashboard to manage your auto‑deploy repos with Docker

![SvelteKit](https://img.shields.io/badge/SvelteKit-%23FF3E00.svg?logo=svelte&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Issues](https://img.shields.io/github/issues/lunatine-dev/aphelion-frontend)
![Stars](https://img.shields.io/github/stars/lunatine-dev/aphelion-frontend?style=social)

## ✨ Purpose

`aphelion-frontend` is the companion web UI for `aphelion`. It's designed to be the successor to my previous app `comet` which is limited to just NodeJS projects, whereas aphelion is designed to use Docker to auto-deploy for better support.

From here you can:

-   Add new repos to watch & auto-deploy using docker
-   Edit and save environment variables
-   View deployment logs and status

---

## ⚙️ Technical stack

-   **Frontend**: [SvelteKit](https://kit.svelte.dev)
-   **UI**: Tailwind CSS & shadcn-svelte
-   **Backend API**: Connects to `aphelion` & `perihelion`

## 📦 Related project

-   **[aphelion](https://github.com/lunatine-dev/aphelion)** – Fastify webhook server to pull & restart projects on main branch updates.
-   **perihelion** - Docker proxy to safely and easily manage Docker Containers
