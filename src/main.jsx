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
import Catalogue from "./pages/Catalogue/catalogue.jsx";
import ThankYou from "./pages/ThankYou/thankYou.jsx";
import ViewUserProfile from "./pages/UserProfile/viewUserProfile.jsx";
import UserOrder from "./pages/UserOrder.jsx";
import UserOrders from "./pages/UserOrders.jsx";
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
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
      { path: "/catalogue", element: <Catalogue /> },
      { path: "/thank-you", element: <ThankYou /> },
      { path: "/view-profile", element: <ViewUserProfile /> },
      { path: "/view-orders", element: <UserOrders /> },
      { path: "/view-order", element: <UserOrder /> },
    ],
  },
  {
    path: "/admin",
    element: getCookie("user") ? <AdminHome /> : <Navigate to={"/login"} />,
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
