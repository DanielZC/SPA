import type { ProjectInterface } from "@/interfaces/project.interface";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useBadge } from "../custom/useBadge";

interface props {
  projectSelected: ProjectInterface;
  onClose: () => void;
}

export const ModalViewProject = ({ projectSelected, onClose }: props) => {
  const { colorBadge } = useBadge();
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="dark border border-gray-700 rounded-lg w-full max-w-2xl shadow-2xl">
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold mb-4">{projectSelected.name}</h2>
          </CardTitle>
          <CardDescription>Vista mas detallada del proyecto</CardDescription>
          <CardAction>
            <Button variant="outline" onClick={() => onClose()}>
              Cerrar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="p-5">
            <p>{projectSelected.description}</p>
          </div>
          <div className="p-5">
            <p>Estado del proyecto: {colorBadge(projectSelected.status)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
