import { ModalSavingProject } from "@/components/modals/ModalSavingProject";
import { ProjectsTable } from "@/components/tables/ProjectsTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl pt-20">
        <Card className="dark shadow-lg shadow-neutral-700/50">
          <CardHeader>
            <CardTitle>Tabla proyectos</CardTitle>
            <CardDescription>
              En esta tabla se muestran todos los proyectos creados por el
              usuario
            </CardDescription>
            <CardAction>
              <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                Nuevo proyecto
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ProjectsTable />
          </CardContent>
        </Card>
        {isModalOpen && (
          <ModalSavingProject
            mode="create"
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
