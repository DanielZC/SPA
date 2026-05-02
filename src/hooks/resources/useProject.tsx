import { ProjectContext } from "@/context/projectContext";
import type { ServerErrorInteface } from "@/interfaces/auth.interfaces";
import type { ProjectErrorsInterface } from "@/interfaces/project.interface";
import {
  projectSchema,
  type ProjectFormSchema,
} from "@/schemas/resourceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState } from "react";
import { useForm } from "react-hook-form";

type fields = "name" | "description" | "status" | `root.${string}` | "root";

export const useProject = () => {
  const { handleCreate } = use(ProjectContext);
  const [success, setSucess] = useState(false);
  const [serverError, setServerError] = useState<ServerErrorInteface | null>(
    null,
  );
  const form = useForm<ProjectFormSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "stand by",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const setErrorField = (errors: ProjectErrorsInterface) => {
    Object.entries(errors).map(([field, [error]]) => {
      form.setError(field as fields, {
        type: "server",
        message: error,
      });
    });
  };

  const onSubmit = async (data: ProjectFormSchema) => {
    const { server, success, errors } = await handleCreate(data);
    if (!success) {
      if (server) {
        setServerError(server);
        return;
      }
      setServerError(null);
      setErrorField(errors as ProjectErrorsInterface);
      return;
    }
    setSucess(success);
    setServerError(null);
    form.reset();
  };

  return {
    form,
    success,
    serverError,
    isSubmitting: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
