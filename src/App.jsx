import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Register, Users, Error } from "./pages";
import { action as registerAction } from "./pages/Register";
import { loader as usersLoader } from "./pages/Users";
import Resource from "./pages/Resource";
import Dashboard from "./components/Dachboard";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error /> // Add a global error element
  },
  {
    path: '/register',
    element: <Register />,
    action: registerAction,
    errorElement: <Error />
  },
  {
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
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;