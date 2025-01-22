import {createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Register, Users, Error } from "./pages";
import { action as registerAction } from "./pages/Register";
import { loader as usersLoader } from "./pages/Users";
import Resource from "./pages/Resource";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />,
    action: registerAction
  },
  {
    path: '/users',
    element: <Users />,
    loader: usersLoader,
    errorElement: <Error />
  },
  {
    path: '/khalil',
    element: <Resource />
  }
])
const App = () => {

  return (
    <RouterProvider router={router} />
  )
};

export default App
