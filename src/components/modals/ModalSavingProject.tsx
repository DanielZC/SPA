import type { ProjectInterface } from "@/interfaces/project.interface";
import { Project } from "../forms/Project";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ProjectUpdate } from "../forms/ProjectUpdate";

type ModalMode = "create" | "update";
interface props {
  mode: ModalMode;
  projectSelected?: ProjectInterface;
  onClose: () => void;
}

export const ModalSavingProject = ({
  mode = "create",
  projectSelected,
  onClose,
}: props) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="dark border border-gray-700 rounded-lg w-full max-w-2xl shadow-2xl">
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold mb-4">
              {mode == "create" ? "Formulario crear" : "Formulario actualizar"}
            </h2>
          </CardTitle>
          <CardDescription>
            {mode == "create" ? "Crear proyecto" : "Actualizar proyecto"}
          </CardDescription>
          <CardAction>
            <Button variant="outline" onClick={() => onClose()}>
              Cerrar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {mode == "create" ? (
            <Project closeModal={onClose} />
          ) : (
            <ProjectUpdate
              project={projectSelected as ProjectInterface}
              closeModal={onClose}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
