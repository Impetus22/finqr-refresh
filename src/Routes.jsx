import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Contact from "./comp/Contact";
import Dashboard from "./comp/Dashboard";
import Found from "./comp/Found";
import Homepage from "./comp/Homepage";
import Login from "./comp/Login";
import Purchase from "./comp/Purchase";
import ResetPassword from "./comp/ResetPassword";
import { ProtectedRoute } from "./ProtectedRoute";
import Register from "./comp/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Success from "./comp/Success";
import Failure from "./comp/Failure";

const Routes = () => {
  const { tokens } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/home",
      element: (
        <>
          <Header />
          <Homepage />
          <Footer />
        </>
      )
    },
    {
      path: "/found",
      element: (
        <>
          <Header />
          <Found />
          <Footer />
        </>
      )
    },
    {
      path: "/contact",
      element: (
        <>
          <Header />
          <Contact />
          <Footer />
        </>
      )
    }
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/dashboard",
          element: (
            <>
              <Header />
              <Dashboard />
              <Footer />
            </>
          )
        },
        {
          path: "/purchase",
          element: (
            <>
              <Header />
              <Purchase />
              <Footer />
            </>
          )
        },
        {
          path: "/success",
          element: (
            <>
              <Header />
              <Success />
              <Footer />
            </>
          )
        },
        {
          path: "/failure",
          element: (
            <>
              <Header />
              <Failure />
              <Footer />
            </>
          )
        },
        {
          path: "/logout",
          element: <div>Logout</div>
        }
      ]
    }
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: (
        <>
          <Header />
          <Login />
          <Footer />
        </>
      )
    },
    {
      path: "/register",
      element: (
        <>
          <Header />
          <Register />
          <Footer />
        </>
      )
    },
    {
      path: "/password/reset",
      element: (
        <>
          <Header />
          <ResetPassword />
          <Footer />
        </>
      )
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...((!(tokens.accessToken) && !(tokens.refreshToken))  ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
