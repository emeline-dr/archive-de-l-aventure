import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

import {
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import { Route as RootRoute } from './routes/__root';

import { homeRoute } from './routes/home';
import { loginRoute } from './routes/login';
import { signInRoute } from './routes/signIn';
import { indexRoute } from './routes';
import { myCharactersRoute } from './routes/myCharacters';
import { registersRoute } from './routes/registers';
import { NewSheetRoute } from './routes/newSheet';

const routeTree = RootRoute.addChildren([
  homeRoute,
  loginRoute,
  signInRoute,
  indexRoute,
  myCharactersRoute,
  registersRoute,
  NewSheetRoute
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
