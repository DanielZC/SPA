import { PieceContext } from "@/context/pieceContext";
import type { ServerErrorInteface } from "@/interfaces/auth.interfaces";
import type {
  PieceErrorsInterface,
  PieceInterface,
} from "@/interfaces/piece.interface";
import { pieceSchema, type PieceFormSchema } from "@/schemas/resourceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState } from "react";
import { useForm } from "react-hook-form";

type fields =
  | "name"
  | "status"
  | "real_weight"
  | "standard_weight"
  | "block_id"
  | `root.${string}`
  | "root";

export const usePieceUpdate = (piece: PieceInterface) => {
  const { handleUpdate } = use(PieceContext);
  const [success, setSucess] = useState(false);
  const [serverError, setServerError] = useState<ServerErrorInteface | null>(
    null,
  );
  const form = useForm<PieceFormSchema>({
    resolver: zodResolver(pieceSchema),
    defaultValues: {
      name: piece.name,
      status: piece.status,
      real_weight: piece.real_weight,
      standard_weight: piece.standard_weight,
      block_id: piece.block_id,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const setErrorField = (errors: PieceErrorsInterface) => {
    Object.entries(errors).map(([field, [error]]) => {
      form.setError(field as fields, {
        type: "server",
        message: error,
      });
    });
  };

  const onSubmit = async (data: PieceFormSchema) => {
    const { server, success, errors } = await handleUpdate(
      piece.id as number,
      data,
    );
    if (!success) {
      if (server) {
        setServerError(server);
        return;
      }
      setServerError(null);
      setErrorField(errors as PieceErrorsInterface);
      return;
    }
    setSucess(success);
    setServerError(null);
  };

  return {
    form,
    success,
    serverError,
    isSubmitting: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
