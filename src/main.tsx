import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { Route as RootRoute } from './routes/__root';
import { homeRoute } from './routes/home';
import { loginRoute } from './routes/login';
import { registerRoute } from './routes/register';
import { indexRoute } from './routes';
import { myCharactersRoute } from './routes/my-characters';
import { listSheetsRoute } from './routes/list-sheets';

const routeTree = RootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  indexRoute,
  myCharactersRoute,
  listSheetsRoute
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
