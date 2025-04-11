import App from "@/App";
import AdminProtectedRoute from "@/component/layout/AdminProtectedRoute";
import Dashboard from "@/component/layout/Dashboard/Dashboard";
import ProtectedRoute from "@/component/layout/ProtectedRoute";
import About from "@/pages/About";
import Checkout from "@/pages/Checkout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ProductDetails from "@/pages/ProductDetails";
import Products from "@/pages/Products";
import SignUp from "@/pages/SignUp";
import CreateProduct from "@/pages/admin/CreateProduct";
import OrderManagement from "@/pages/admin/OrderManagement";
import ProductManagement from "@/pages/admin/ProductManagement";
import UpdateProduct from "@/pages/admin/UpdateProduct";
import UserManagement from "@/pages/admin/UserManagement";
import Order from "@/pages/user/Order";
import UpdatePassword from "@/pages/user/UpdatePassword";
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
        element: <Products/>,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
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

  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "user-management",
        element: <AdminProtectedRoute><UserManagement/></AdminProtectedRoute>,
      },
      {
        path: "order-management",
        element: <AdminProtectedRoute><OrderManagement/></AdminProtectedRoute>,
      },
      {
        path: "product-management",
        element: <AdminProtectedRoute><ProductManagement/></AdminProtectedRoute>,
      },
      {
        path: "create-product",
        element: <AdminProtectedRoute><CreateProduct/></AdminProtectedRoute>,
      },
      {
        path: "update-product/:id",
        element: <AdminProtectedRoute><UpdateProduct/></AdminProtectedRoute>,
      },

      // user routes
      {
        path: "order-history",
        element: <ProtectedRoute><Order/></ProtectedRoute>,
      },
      {
        path: "update-password",
        element: <ProtectedRoute><UpdatePassword/></ProtectedRoute>,
      },
    ],
    
  },

  // {
  //   path: "/admin",
  //   element :<App/>,
  //   children: routerGenerator(adminPaths)
  // },
  
]);
export default router;
