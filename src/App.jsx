import {createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout, Register, Error, Landing, Login, About, Tracer, Profile, Catalog } from "./pages";
import { ErrorElement } from "./components";

// Loaders
import { loader as catalogLoader } from "./pages/Catalog";

// Actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";


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
    path: '/login',
    element: <Login />,
    errorElement: <ErrorElement />,
    action: loginAction
  }
])
const App = () => {

  return (
    <RouterProvider router={router} />
  )
};

export default App
