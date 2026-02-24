# Pair Programming Terminal

## Setup

```bash
npm run install:all
```

---

## Task (1 hour)

Build a feature that lets the user browse a public GitHub repository in the browser.

1. **Get file tree** — returns the file tree for a repo. Clones or pulls it behind the scenes.
2. **Get file content** — returns the content of a single file from the repo.

The client displays the file tree in the sidebar and opens files in the Monaco editor.

---

## Flow

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant FS as Server Filesystem

    Client->>Server: GET /files/:owner/:repoName
    Server->>FS: git clone / git pull
    FS-->>Server: done
    Server-->>Client: file tree []

    Client->>Server: GET /file-content/:owner/:repoName?file=src/index.ts
    Server->>FS: read file
    FS-->>Server: file content
    Server-->>Client: { content }

    Client->>Client: render FileTree + Editor
```

---

## Endpoints to implement

| Method | Path                                   | Description                                              |
| ------ | -------------------------------------- | -------------------------------------------------------- |
| `GET`  | `/files/:owner/:repoName`              | Clone or pull repo (behind the scenes), return file tree |
| `GET`  | `/file-content/:owner/:repoName?file=` | Return content of a single file                          |
