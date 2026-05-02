import { ModalSavingPiece } from "@/components/modals/ModalSavingPiece";
import { PiecesTable } from "@/components/tables/PiecesTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieceContext } from "@/context/pieceContext";
import type { PieceInterface } from "@/interfaces/piece.interface";
import { use, useEffect, useState } from "react";

export const Pieces = () => {
  const { handleList } = use(PieceContext);
  const [pieces, setPieces] = useState<PieceInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pieceList = async () => {
    const { data } = await handleList();
    if (data) {
      setPieces(data as PieceInterface[]);
    }
  };

  useEffect(() => {
    pieceList();
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <Card className="dark">
          <CardHeader>
            <CardTitle>Tabla Piezas</CardTitle>
            <CardDescription>
              En esta tabla se muestran todas las piezas creadas por el usuario
            </CardDescription>
            <CardAction>
              <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                Nuevo bloque
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <PiecesTable pieces={pieces} />
          </CardContent>
        </Card>
        {isModalOpen && (
          <ModalSavingPiece
            mode="create"
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
