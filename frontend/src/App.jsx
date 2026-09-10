import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "./layout/applayout";
import AdminLayout from "./layout/adminlayout";

import Home from "./component/home";
import Destinations from "./component/destinations";
import Tour from "./component/tour";
import About from "./component/about";
import Stories from "./component/stories";
import Contact from "./component/Contact";
import StoryDetails from "./component/StoryDetails";
import Profile from "./component/Profile";

import AdminDashboard from "./component/pages/AdminDashboard";
import AddTour from "./component/pages/AddTour";
import ManageTours from "./component/pages/ManageTours";
import Bookings from "./component/pages/Bookings";
import AdminUsers from "./component/pages/AdminUsers";

const router = createBrowserRouter([
  // Website Routes
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "destinations",
        element: <Destinations />,
      },
      {
        path: "tours/:id",
        element: <Tour />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "stories",
        element: <Stories />,
      },
      {
        path: "stories/:id",
        element: <StoryDetails />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ],
  },

  // Admin Routes
  {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <AdminDashboard />,
    },
    {
      path: "add-tour",
      element: <AddTour />,
    },
    {
      path: "tours",
      element: <ManageTours />,
    },
    {
   path: "/admin/bookings",
   element: <Bookings />,
},
    {
      path: "users",
      element: <AdminUsers />,
    }
  ],
},
]);

export default function App() {
  return <RouterProvider router={router} />;
}
