import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { BlockInterface } from "@/interfaces/block.interface";

interface props {
  blockSelected: BlockInterface;
  onClose: () => void;
}

export const ModalViewBlock = ({ blockSelected, onClose }: props) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="dark border border-gray-700 rounded-lg w-full max-w-2xl shadow-2xl">
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold mb-4">{blockSelected.name}</h2>
          </CardTitle>
          <CardDescription>Vista mas detallada del bloque</CardDescription>
          <CardAction>
            <Button variant="outline" onClick={() => onClose()}>
              Cerrar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="p-5">
            <p>{blockSelected.description}</p>
          </div>
          <div className="p-5">
            <p>Proyecto: {blockSelected.project_id}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
