import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import RootLayout from "./Comps/RootLayout.jsx";
import Login from "./Authentication/Login.jsx";
import Signup from "./Authentication/Signup.jsx";
import DropdownProfile from "./Comps/DropdownProfile.jsx";
import Dashboard from "./Pages/Users/Dashboard.jsx";
import AdminPanel from "./Pages/Admin/AdminPanel.jsx";
import EditProduct from "./Pages/Admin/EditProduct.jsx";
import ProductAddForm from "./Pages/Admin/ProductCRUD/ProductAddForm.jsx";
import ProductDetail from "./Comps/usercomponents/ProductDetail.jsx";
import CheckOut from "./Comps/usercomponents/CheckOut.jsx";
import Orders from "./Pages/Users/Orders.jsx";
import OrderDetail from "./Comps/usercomponents/OrderDetail.jsx";
import UserProfile from "./Pages/Users/UserProfile.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'dropdown',
        element: <DropdownProfile />
      },

      //USER
      {
        path: 'home',
        element: <Dashboard />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />
      },
      {
        path: 'checkout',
        element: <CheckOut />
      },
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'order/:id',
        element: <OrderDetail />
      },
      {
        path: 'profile',
        element: <UserProfile />
      },

      //ADMIN
      {
        path: 'admindashboard',
        element: <AdminPanel />,
      },
      {
        path: 'product-add',
        element: <ProductAddForm />
      },
      {
        path: 'product-edit/:id',
        element: <EditProduct />
      },
    ]
  }

]);

export default function App() {
  return <RouterProvider router={router} />
}
