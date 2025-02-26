import App from "@/App";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      
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
    // {
    //   path: '/login',
    //   element: <Login />,
    // },
    // {
    //   path: '/register',
    //   element: <Register />,
    // },
    
  ]);
  export default router;
  