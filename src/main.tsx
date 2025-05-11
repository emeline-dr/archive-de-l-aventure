import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { Route as RootRoute } from './routes/__root';
import { indexRoute } from './routes/index';
import { loginRoute } from './routes/login';
import { registerRoute } from './routes/register';

const routeTree = RootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
