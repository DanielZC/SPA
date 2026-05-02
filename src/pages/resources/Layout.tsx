import { Navbar } from "@/components/shared/Navbar";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="min-h-screen dark:bg-black">
      <Navbar />
      <Outlet />
    </div>
  );
};
