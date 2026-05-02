import { useBadge } from "../custom/useBadge";
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

interface props {
  pieceSelected: PieceInterface;
  onClose: () => void;
}

export const ModalViewPiece = ({ pieceSelected, onClose }: props) => {
  const { colorBadge } = useBadge();
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="dark border border-gray-700 rounded-lg w-full max-w-2xl shadow-2xl">
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold mb-4">{pieceSelected.name}</h2>
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
            <p>Peso estandar: {pieceSelected.standard_weight}</p>
            <p>Peso real: {pieceSelected.real_weight}</p>
          </div>
          <div className="p-5">
            <p>Estado: {pieceSelected.block_id}</p>
            <p>Estado: {colorBadge(pieceSelected.status)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
