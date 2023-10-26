import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home'
import Layout from './components/Layout'
import ErrorPage from './components/ErrorPage'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement:<ErrorPage />,
    children:[
      {
        path:"/",
        element:<Home />,
      },
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
