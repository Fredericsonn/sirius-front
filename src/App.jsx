<<<<<<< HEAD

import {createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomeLayout, Register, Error, Landing, Login, About, Tracer, Profile, Catalog, Collections, Collection, Consumptions, MachineList  } from "./pages";
=======
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout, Register, Error, Landing, Login, About, Tracer, Profile, Catalog, Collections, Collection, Consumptions } from "./pages";
>>>>>>> 22c8abde6f0ec29fe6b20e0b851b15039b9d511e
import { ErrorElement } from "./components";

// Loaders
import { loader as catalogLoader } from "./pages/Catalog";
import { loader as collectionsLoader } from "./pages/Collections";
import { loader as collectionLoader } from "./pages/Collection";

// Actions
<<<<<<< HEAD

=======
>>>>>>> 22c8abde6f0ec29fe6b20e0b851b15039b9d511e
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as collectionsAction } from "./pages/Collections";

<<<<<<< HEAD
import { store } from "./store";

=======
// Composants
import { store } from "./store";
import Resources from "./pages/Resource";
>>>>>>> 22c8abde6f0ec29fe6b20e0b851b15039b9d511e

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
<<<<<<< HEAD
=======
      },
      {
        path:'/resource',
        element: <Resources />,
        errorElement: <ErrorElement />
>>>>>>> 22c8abde6f0ec29fe6b20e0b851b15039b9d511e
      }
    ]
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorElement />,
    action: registerAction
  },
<<<<<<< HEAD
  
  {
    path: '/machineList',
    element: <MachineList />
  },

=======
>>>>>>> 22c8abde6f0ec29fe6b20e0b851b15039b9d511e
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorElement />,
    action: loginAction(store)
  }
<<<<<<< HEAD
])
const App = () => {

  return (
    <RouterProvider router={router} />
  )
};

export default App
=======
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
>>>>>>> 22c8abde6f0ec29fe6b20e0b851b15039b9d511e
