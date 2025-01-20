import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Addmedicine from "../pages/Dashboard/Seller/Addmedicine";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyInventory from "../pages/Dashboard/Seller/MyInventory";
import ManageOrders from "../pages/Dashboard/Seller/ManageOrders";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import SellerRoute from "./SellerRoute";
import AdminRoute from "./AdminRoute";

import HeroSlider from "../components/Home/HeroSlider";
import Categories from "../components/Home/Categories";
import AskAdd from "../components/Dashboard/Sidebar/Menu/Advertisement/AskAdd";
import AddRequest from "../components/Dashboard/Sidebar/Menu/Advertisement/AddRequest";
import Shop from "../pages/Shop/Shop";
import CartPage from "../pages/Cart/CartPage";
import CheckoutPage from "../pages/Cart/CheckoutPage";
import InvoicePage from "../pages/Cart/InvoicePage";
import SalesReport from "../pages/Dashboard/Admin/SalesReport";
import SalesRevenue from "../pages/Dashboard/Seller/SalesRevenue";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/:category",
        element: <Shop />,
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "invoice/:id",
        element: <InvoicePage />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-medicine",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <Addmedicine />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <MyInventory />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "sales-revenue",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <SalesRevenue />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "sales-report",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SalesReport />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-category",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Categories />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-banner",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <HeroSlider />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <ManageOrders />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "ask-add",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <AskAdd />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders-all",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageOrders />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-request",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddRequest />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
