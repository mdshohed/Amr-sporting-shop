import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "@/components/layouts/MainLayouts";
import Home from "@/pages/Home/Home";
import Products from "@/pages/Products/Products";
import About from "@/pages/About/About";
import ProductView from "@/pages/Products/Product/ProductView";
import NotFound from "@/pages/shared/NotFound";
import ShoppingCard from "@/pages/ShoppingCard/ShoppingCard";
import ManageProduct from "@/pages/ManageProduct/ManageProduct";
import Checkout from "@/pages/Checkout/Checkout";
import OrderSuccess from "@/pages/Payment/OrderSuccess";
import CardMethod from "@/pages/PaymentMethods/CardMethod";
import Payment from "@/pages/Payment/Payment";

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
        element: <Products></Products>,
      },
      {
        path: '/all-sporting-goods/:id',
        element: <ProductView></ProductView>,
      },
      {
        path: '/manage-sporting-goods',
        element: <ManageProduct></ManageProduct>
      },
      {
        path: '/about-us',
        element: <About></About>
      },
      {
        path: '/card',
        element: <ShoppingCard></ShoppingCard>
      },
      {
        path: '/checkout/card',
        element: <Checkout></Checkout>
      },
      {
        path: '/payment/card',
        element: <Payment></Payment>
      },
      {
        path: '/success',
        element: <OrderSuccess></OrderSuccess>
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]
  },
  
]);

export default router; 