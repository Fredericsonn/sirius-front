import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout, Register, Error, Landing, Login, About, Tracer, Profile, Catalog, Collections, Collection, Consumptions } from "./pages";
import { ErrorElement } from "./components";

// Loaders
import { loader as catalogLoader } from "./pages/Catalog";
import { loader as collectionsLoader } from "./pages/Collections";
import { loader as collectionLoader } from "./pages/Collection";

// Actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as collectionsAction } from "./pages/Collections";

// Composants
import { store } from "./store";
import Resources from "./pages/Resource";

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
      },
      {
        path:'/resource',
        element: <Resources />,
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
  return (
    <RouterProvider router={router} />
  );
};

export default App;