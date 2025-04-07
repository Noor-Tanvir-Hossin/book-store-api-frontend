import App from "@/App";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ProductDetails from "@/pages/ProductDetails";
import Products from "@/pages/Products";
import SignUp from "@/pages/SignUp";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/productDetails",
        element: <ProductDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  // {
  //   path: "/admin",
  //   element :<App/>,
  //   children: routerGenerator(adminPaths)
  // },
  // {
  //   path: "/faculty",
  //   element: <App />,
  //   children: routerGenerator(facultyPaths)
  // },
  // {
  //   path: "/student",
  //   element: <App />,
  //   children: routerGenerator(studentPaths)
  // },
]);
export default router;
