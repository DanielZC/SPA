import { Auth } from "@/pages/auth/Auth";
import { Dashboard } from "@/pages/main/Dashboard";
import { Blocks } from "@/pages/resources/Blocks";
import { Layout } from "@/pages/resources/Layout";
import { Pieces } from "@/pages/resources/Pieces";
import { Projects } from "@/pages/resources/Projects";
import { createBrowserRouter } from "react-router";
import { PrivateRoute } from "./PrivateRoute";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute element={<Layout />} />,
    children: [{ index: true, element: <Dashboard /> }],
  },
  {
    path: "/projects",
    element: <PrivateRoute element={<Layout />} />,
    children: [{ index: true, element: <Projects /> }],
  },
  {
    path: "/blocks",
    element: <PrivateRoute element={<Layout />} />,
    children: [{ index: true, element: <Blocks /> }],
  },
  {
    path: "/pieces",
    element: <PrivateRoute element={<Layout />} />,
    children: [{ index: true, element: <Pieces /> }],
  },
]);
