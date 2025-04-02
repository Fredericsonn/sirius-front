import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomeLayout, Register, Error, Landing, Login, About, Tracer, Profile, Catalog, Collections, Collection, Consumptions, MachineList, Resources, QuizPage } from "./pages";
import { ErrorElement, Logs } from "./components";

import ConsumptionLifestyleFeedback from './pages/ConsumptionLifestyleFeedback';

// Loaders
import { loader as catalogLoader } from "./pages/Catalog";
import { loader as collectionsLoader } from "./pages/Collections";
import { loader as collectionLoader } from "./pages/Collection";
import { loader as consumptionsLoader } from "./pages/Consumptions";
import Consumption, { loader as consumptionLoader } from "./pages/Consumption";

// Actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as collectionsAction } from "./pages/Collections";
import ResourceWelcome from "./pages/Welcome2Resourec";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from "./store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />
      },
      {
        path: '/about',
        element: <About />,
        errorElement: <ErrorElement />
      },
      {
        path: '/tracer',
        element: <Tracer />,
        errorElement: <ErrorElement />,
      },
      {
        path: '/tracer/collections',
        element: <Collections />,
        errorElement: <ErrorElement />,
        loader: collectionsLoader(store),
        action: collectionsAction(store)
      },
      {
        path: "/tracer/collections/:name",
        element: <Collection />,
        errorElement: <ErrorElement />,
        loader: collectionLoader(store)
      },

      {
        path: '/tracer/consumptions',
        element: <Consumptions />,
        errorElement: <ErrorElement />,
        loader: consumptionsLoader(queryClient,store)
      },
      {
        path: '/tracer/consumptions/:id',
        element: <Consumption />,
        loader: consumptionLoader,
      },
      {
        path: '/tracer/consumptions/:consumptionId/feedback', 
        element: <ConsumptionLifestyleFeedback />,
        errorElement: <ErrorElement /> 
      },
     
      {
        path: '/profile',
        element: <Profile />,
        errorElement: <ErrorElement />
      },
      {
        path: '/catalog',
        element: <Catalog />,
        errorElement: <ErrorElement />,
        loader: catalogLoader(queryClient)
      },
      {
        path: '/resource',
        element: <ResourceWelcome />,
        errorElement: <ErrorElement />
      },
      {
        path: '/resource/dashboard',
        element: <Logs />,
        errorElement: <ErrorElement />
      },
      {
        path: '/tracer/consumptions/optimize/:consumptionId',
        element: <QuizPage />,
        errorElement: <ErrorElement />
      }
    ]
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorElement />,
    action: registerAction
  },


  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorElement />,
    action: loginAction(store)
  }
]);

const App = () => {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />;
  </QueryClientProvider>
};

export default App;