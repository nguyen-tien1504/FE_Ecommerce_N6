import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home/home.jsx";
import About from "./pages/About/about.jsx";
import Shop from "./pages/Shop/shop.jsx";
import Contact from "./pages/Contact/contact.jsx";
import Cart from "./pages/Cart/cart.jsx";
import LoginSignin from "./pages/Login/loginSignin.jsx";
import ProductDetail from "./pages/ProductDetail/productDetail.jsx";
import AdminHome from "./pages/Admin/Home/adminHome.jsx";
import Orders from "./pages/Admin/Orders/orders.jsx";
import AddProduct from "./pages/Admin/AddProduct/addproduct.jsx";
import { Provider } from "react-redux";
import { store } from "./services/Redux/store.jsx";
import Products from "./pages/Admin/Products/products.jsx";
import EditProduct from "./pages/Admin/EditProduct/editProduct.jsx";
import Checkout from "./pages/Checkout/checkout.jsx";
const validate = true;
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
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/login",
        element: <LoginSignin />,
      },
      {
        path: "/product-detail/:productId",
        element: <ProductDetail />,
      },
      { path: "/checkout", element: <Checkout /> },
    ],
  },
  {
    path: "/admin",
    element: validate ? <AdminHome /> : <Navigate to={"/"} />,
    children: [
      {
        path: "/admin",
        element: <Orders />,
      },
      {
        path: "/admin/add-product",
        element: <AddProduct />,
      },
      {
        path: "/admin/products",
        element: <Products />,
      },
      { path: "/admin/edit/product/:productId", element: <EditProduct /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
