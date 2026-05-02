import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProjectInterface } from "@/interfaces/project.interface";
import { useHelper } from "@/hooks/useHelper";
import { use, useEffect, useState } from "react";
import { ModalViewProject } from "../modals/ModalViewProject";
import { ProjectContext } from "@/context/projectContext";
import { useBadge } from "../custom/useBadge";
import { ModalSavingProject } from "../modals/ModalSavingProject";
import { toast } from "sonner";

export const ProjectsTable = () => {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const { handleList, handleDelete, handleGet, action } = use(ProjectContext);
  const { colorBadge } = useBadge();
  const { limitString } = useHelper();
  const [project, setProject] = useState<ProjectInterface>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const deleteAction = (id: number) => {
    toast("¿Desea eliminar el proyecto?", {
      dismissible: true,
      action: {
        label: "Aceptar",
        onClick: async () => {
          const { success } = await handleDelete(id as number);
          if (success) {
            toast.success("Proyecto eliminado");
            toast.dismiss();
          }
        },
      },
      cancel: {
        label: "Cancelar",
        onClick: () => toast.dismiss(),
      },
    });
  };

  const openModalView = async (id: number) => {
    const { data } = await handleGet(id);
    if (!data) return;
    setProject(data as ProjectInterface);
    setIsModalOpen(true);
  };

  const openModalUpdate = async (id: number) => {
    const { data } = await handleGet(id);
    if (!data) return;
    setProject(data as ProjectInterface);
    setIsModalUpdateOpen(true);
  };

  const closeModalView = () => {
    setIsModalOpen(false);
  };

  const projectList = async () => {
    const { data } = await handleList();
    if (data) {
      setProjects(data as ProjectInterface[]);
    }
  };

  useEffect(() => {
    projectList();
  }, [action]);

  return (
    <>
      <Table>
        <TableHeader className="bg-neutral-800">
          <TableRow>
            <TableHead className="text-center">Proyecto</TableHead>
            <TableHead className="text-center">Descripcion</TableHead>
            <TableHead className="text-center">Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium text-center">
                  {project.name}
                </TableCell>
                <TableCell className="text-center">
                  {limitString(project.description, 60)}
                </TableCell>
                <TableCell className="text-center">
                  {colorBadge(project.status)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="dark">
                      <DropdownMenuItem
                        onClick={() => openModalUpdate(project.id as number)}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openModalView(project.id as number)}
                      >
                        ver
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => deleteAction(project.id as number)}
                      >
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="font-medium text-center" colSpan={4}>
                No hay proyectos para mostrar
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isModalUpdateOpen && project && (
        <ModalSavingProject
          mode="update"
          projectSelected={project}
          onClose={() => setIsModalUpdateOpen(false)}
        />
      )}
      {isModalOpen && project && (
        <ModalViewProject
          projectSelected={project}
          onClose={() => closeModalView()}
        />
      )}
    </>
  );
};
