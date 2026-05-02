import { ModalSavingBlock } from "@/components/modals/ModalSavingBlock";
import { BlocksTable } from "@/components/tables/BlocksTable";
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

export const Blocks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <Card className="dark">
          <CardHeader>
            <CardTitle>Tabla Bloque</CardTitle>
            <CardDescription>
              En esta tabla se muestran todos los bloques creados por el usuario
            </CardDescription>
            <CardAction>
              <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                Nuevo bloque
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <BlocksTable />
          </CardContent>
        </Card>
        {isModalOpen && (
          <ModalSavingBlock
            mode="create"
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
