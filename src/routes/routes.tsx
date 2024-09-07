import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "@/components/layouts/MainLayouts";
import Home from "@/pages/Home/Home";
import Products from "@/pages/Products/Products";
import About from "@/pages/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>, 
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/all-sporting-goods',
        element: <Products></Products>
      },
      {
        path: '/manage-sporting-goods',
        element: <div>Manage Sporting goods</div>
      },
      {
        path: '/about-us',
        element: <About></About>
      },
      {
        path: '/card',
        element: <div>Card</div>
      },
    ]
  },
  
]);

export default router; 