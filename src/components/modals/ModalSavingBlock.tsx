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
import { BlockUpdate } from "../forms/BlockUpdate";
import { BlockCreate } from "../forms/BlockCreate";

type ModalMode = "create" | "update";
interface props {
  mode: ModalMode;
  blockSelected?: BlockInterface;
  onClose: () => void;
}

export const ModalSavingBlock = ({
  mode = "create",
  blockSelected,
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
            {mode == "create" ? "Crear bloque" : "Actualizar bloque"}
          </CardDescription>
          <CardAction>
            <Button variant="outline" onClick={() => onClose()}>
              Cerrar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {mode == "create" ? (
            <BlockCreate closeModal={onClose} />
          ) : (
            <BlockUpdate
              block={blockSelected as BlockInterface}
              closeModal={onClose}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
