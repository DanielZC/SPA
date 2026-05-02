import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { PieceInterface } from "@/interfaces/piece.interface";
import { PieceUpdate } from "../forms/PieceUpdate";
import { PieceCreate } from "../forms/PieceCreate";

type ModalMode = "create" | "update";
interface props {
  mode: ModalMode;
  pieceSelected?: PieceInterface;
  onClose: () => void;
}

export const ModalSavingPiece = ({
  mode = "create",
  pieceSelected,
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
            {mode == "create" ? "Crear pieza" : "Actualizar pieza"}
          </CardDescription>
          <CardAction>
            <Button variant="outline" onClick={() => onClose()}>
              Cerrar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {mode == "create" ? (
            <PieceCreate closeModal={onClose} />
          ) : (
            <PieceUpdate
              piece={pieceSelected as PieceInterface}
              closeModal={onClose}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
