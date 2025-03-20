<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Register, Users, Error } from "./pages";
import { action as registerAction } from "./pages/Register";
import { loader as usersLoader } from "./pages/Users";
import Resource from "./pages/Resource";
import Dashboard from "./components/Dachboard";
=======

import {createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomeLayout, Register, Error, Landing, Login, About, Tracer, Profile, Catalog, Collections, Collection, Consumptions, MachineList, Resources  } from "./pages";
import { ErrorElement } from "./components";

// Loaders
import { loader as catalogLoader } from "./pages/Catalog";
import { loader as collectionsLoader } from "./pages/Collections";
import { loader as collectionLoader } from "./pages/Collection";

// Actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as collectionsAction } from "./pages/Collections";
import ResourceWelcome from "./pages/Welcome2Resourec";

import { store } from "./store";
>>>>>>> 3aa184544ff5a491259109f97ea9275cb9ddae5a

const router = createBrowserRouter([
  {
    path: '/',
<<<<<<< HEAD
    element: <Home />,
    errorElement: <Error /> // Add a global error element
=======
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
        loader: catalogLoader
      },
      {
        path:'/resource',
        element: <ResourceWelcome />,
        errorElement: <ErrorElement />
      },
      {
        path:'/resource/dashboard',
        element:<Resources />,
        errorElement: <ErrorElement />
      }
    ]
>>>>>>> 3aa184544ff5a491259109f97ea9275cb9ddae5a
  },
  {
    path: '/register',
    element: <Register />,
<<<<<<< HEAD
    action: registerAction,
    errorElement: <Error />
=======
    errorElement: <ErrorElement />,
    action: registerAction
>>>>>>> 3aa184544ff5a491259109f97ea9275cb9ddae5a
  },
  
  {
<<<<<<< HEAD
    path: '/users',
    element: <Users />,
    loader: usersLoader,
    errorElement: <Error />
  },
  {
    path: '/khalil',
    element: <Resource />,
    errorElement: <Error />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <Error />
=======
    path: '/machineList',
    element: <MachineList />
  },

  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorElement />,
    action: loginAction(store)
>>>>>>> 3aa184544ff5a491259109f97ea9275cb9ddae5a
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;