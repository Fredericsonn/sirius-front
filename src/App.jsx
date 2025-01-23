<<<<<<< HEAD
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Register, Users, Error, MachineList } from "./pages";
=======
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout, Register, Error, Landing, Login, About, Tracer, Profile, Catalog, Collections, Consumptions } from "./pages";
import { ErrorElement } from "./components";

// Loaders
import { loader as catalogLoader } from "./pages/Catalog";
import { loader as collectionsLoader } from "./pages/Collections";
import { loader as collectionLoader } from "./pages/Collection";

// Actions
>>>>>>> ec138d07e4457c2aeb8b8b6b312b7e0d501d065e
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import Collection from "./pages/Collection";

import { store } from "./store";


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
        loader: collectionsLoader(store)
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
    path: '/machineList',
    element: <MachineList />
  },

  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorElement />,
    action: loginAction(store)
  }
])
const App = () => {

  return (
    <RouterProvider router={router} />
  )
};

export default App
