import { BlockContext } from "@/context/blockContext";
import type { ServerErrorInteface } from "@/interfaces/auth.interfaces";
import type { BlockErrorsInterface } from "@/interfaces/block.interface";
import { blockSchema, type BlockFormSchema } from "@/schemas/resourceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState } from "react";
import { useForm } from "react-hook-form";

type fields = "name" | "description" | "project_id" | `root.${string}` | "root";

export const useBlock = () => {
  const { handleCreate } = use(BlockContext);
  const [success, setSucess] = useState(false);
  const [serverError, setServerError] = useState<ServerErrorInteface | null>(
    null,
  );
  const form = useForm<BlockFormSchema>({
    resolver: zodResolver(blockSchema),
    defaultValues: {
      name: "",
      description: "",
      project_id: 0,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const setErrorField = (errors: BlockErrorsInterface) => {
    Object.entries(errors).map(([field, [error]]) => {
      form.setError(field as fields, {
        type: "server",
        message: error,
      });
    });
  };

  const onSubmit = async (data: BlockFormSchema) => {
    const { server, success, errors } = await handleCreate(data);
    if (!success) {
      if (server) {
        setServerError(server);
        return;
      }
      setServerError(null);
      setErrorField(errors as BlockErrorsInterface);
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
