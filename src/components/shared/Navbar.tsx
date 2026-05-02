import { NavLink, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { UserContext } from "@/context/userContext";
import { use } from "react";

export const Navbar = () => {
  const { logout } = use(UserContext);
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-neutral-800 dark:bg-black shadow-lg shadow-neutral-700/50">
      <div className="flex justify-center items-center gap-8 p-4">
        <Button variant="default" className="dark">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </Button>
        <Button variant="default" className="dark">
          <NavLink to="/projects">Proyectos</NavLink>
        </Button>
        <Button variant="default" className="dark">
          <NavLink to="/blocks">Bloques</NavLink>
        </Button>
        <Button variant="default" className="dark">
          <NavLink to="/pieces">Piezas</NavLink>
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Cerrar sesion
        </Button>
      </div>
    </nav>
  );
};
