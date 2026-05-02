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
import { useHelper } from "@/hooks/useHelper";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { BlockContext } from "@/context/blockContext";
import type { BlockInterface } from "@/interfaces/block.interface";
import { ModalViewBlock } from "../modals/ModalViewBlock";
import { ModalSavingBlock } from "../modals/ModalSavingBlock";

export const BlocksTable = () => {
  const [blocks, setBlocks] = useState<BlockInterface[]>([]);
  const { handleDelete, handleGet, handleList, action } = use(BlockContext);
  const { limitString } = useHelper();
  const [block, setBlock] = useState<BlockInterface>();
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
    setBlock(data as BlockInterface);
    setIsModalOpen(true);
  };

  const openModalUpdate = async (id: number) => {
    const { data } = await handleGet(id);
    if (!data) return;
    setBlock(data as BlockInterface);
    setIsModalUpdateOpen(true);
  };

  const closeModalView = () => {
    setIsModalOpen(false);
  };

  const projectList = async () => {
    const { data } = await handleList();
    if (data) {
      setBlocks(data as BlockInterface[]);
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
            <TableHead className="text-center">Bloque</TableHead>
            <TableHead className="text-center">Proyecto</TableHead>
            <TableHead className="text-center">Descripcion</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blocks.length > 0 ? (
            blocks.map((block) => (
              <TableRow key={block.id}>
                <TableCell className="font-medium text-center">
                  {block.name}
                </TableCell>
                <TableCell className="text-center">
                  {block.project_id}
                </TableCell>
                <TableCell className="text-center">
                  {limitString(block.description, 60)}
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
                        onClick={() => openModalUpdate(block.id as number)}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openModalView(block.id as number)}
                      >
                        ver
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => deleteAction(block.id as number)}
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
      {isModalUpdateOpen && block && (
        <ModalSavingBlock
          mode="update"
          blockSelected={block}
          onClose={() => setIsModalUpdateOpen(false)}
        />
      )}
      {isModalOpen && block && (
        <ModalViewBlock
          blockSelected={block}
          onClose={() => closeModalView()}
        />
      )}
    </>
  );
};
