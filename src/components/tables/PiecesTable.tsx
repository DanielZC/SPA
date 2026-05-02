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
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { PieceContext } from "@/context/pieceContext";
import type { PieceInterface } from "@/interfaces/piece.interface";
import { ModalViewPiece } from "../modals/ModalViewPiece";
import { ModalSavingPiece } from "../modals/ModalSavingPiece";
import { useBadge } from "../custom/useBadge";

export const PiecesTable = () => {
  const { colorBadge } = useBadge();
  const { handleDelete, handleGet, handleList, action } = use(PieceContext);
  const [pieces, setPieces] = useState<PieceInterface[]>([]);
  const [piece, setPiece] = useState<PieceInterface>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const deleteAction = (id: number) => {
    toast("¿Desea eliminar el bloque?", {
      dismissible: true,
      action: {
        label: "Aceptar",
        onClick: async () => {
          const { success } = await handleDelete(id as number);
          if (success) {
            toast.success("Bloque eliminado");
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
    setPiece(data as PieceInterface);
    setIsModalOpen(true);
  };

  const openModalUpdate = async (id: number) => {
    const { data } = await handleGet(id);
    if (!data) return;
    setPiece(data as PieceInterface);
    setIsModalUpdateOpen(true);
  };

  const closeModalView = () => {
    setIsModalOpen(false);
  };

  const pieceList = async () => {
    const { data } = await handleList();
    if (data) {
      setPieces(data as PieceInterface[]);
    }
  };

  useEffect(() => {
    pieceList();
  }, [action]);
  return (
    <>
      <Table>
        <TableHeader className="bg-neutral-800">
          <TableRow>
            <TableHead className="text-center">Pieza</TableHead>
            <TableHead className="text-center">Bloque</TableHead>
            <TableHead className="text-center">Peso estandar</TableHead>
            <TableHead className="text-center">Peso real</TableHead>
            <TableHead className="text-center">Diferencia de peso</TableHead>
            <TableHead className="text-center">Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pieces.length > 0 ? (
            pieces.map((piece) => (
              <TableRow key={piece.id}>
                <TableCell className="font-medium text-center">
                  {piece.name}
                </TableCell>
                <TableCell className="text-center">{piece.block_id}</TableCell>
                <TableCell className="text-center">
                  {piece.standard_weight}
                </TableCell>
                <TableCell className="text-center">
                  {piece.real_weight}
                </TableCell>
                <TableCell className="text-center">
                  {piece.weight_difference}
                </TableCell>
                <TableCell className="text-center">
                  {colorBadge(piece.status)}
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
                        onClick={() => openModalUpdate(piece.id as number)}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openModalView(piece.id as number)}
                      >
                        ver
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => deleteAction(piece.id as number)}
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
              <TableCell className="font-medium text-center" colSpan={6}>
                No hay proyectos para mostrar
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isModalUpdateOpen && piece && (
        <ModalSavingPiece
          mode="update"
          pieceSelected={piece}
          onClose={() => setIsModalUpdateOpen(false)}
        />
      )}
      {isModalOpen && piece && (
        <ModalViewPiece
          pieceSelected={piece}
          onClose={() => closeModalView()}
        />
      )}
    </>
  );
};
