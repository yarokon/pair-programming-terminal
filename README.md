# Pair Programming Terminal

## Setup

```bash
npm run install:all
```

## Start

**Server**

```bash
cd server && npm run start:dev
```

**Client**

```bash
cd client && npm run dev
```

---

## Task (1 hour)

Build a feature that lets the user browse a public GitHub repository in the browser.

1. **Get file tree** — returns the file tree for a repo. Clones or pulls it behind the scenes.
2. **Get file content** — returns the content of a single file from the repo. Clones or pulls it behind the scenes.

The client displays the file tree in the sidebar and opens files in the Monaco editor.

---

## Flow

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant GitHub

    Client->>Server: GET /files/:owner/:repoName
    Server->>GitHub: git clone
    GitHub-->>Server: repository data
    Server-->>Client: file tree []

    Client->>Client: render FileTree + Editor
```

---

## Endpoints to implement

| Method | Path                                   | Description                     |
| ------ | -------------------------------------- | ------------------------------- |
| `GET`  | `/files/:owner/:repoName`              | Return file tree                |
| `GET`  | `/file-content/:owner/:repoName?file=` | Return content of a single file |
