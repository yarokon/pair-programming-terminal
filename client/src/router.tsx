import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import App from './App';
import type { FileNode } from '../../server/src/modules/files/files.service';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
  loader: async (): Promise<FileNode[]> => {
    const res = await fetch('http://localhost:3000/files/todo-md/todo-md');

    if (!res.ok) {
      throw new Error(`Failed to fetch files: ${res.status}`);
    }

    return res.json() as Promise<FileNode[]>;
  },
});

const routeTree = rootRoute.addChildren([indexRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
