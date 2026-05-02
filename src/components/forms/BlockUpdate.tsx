import { Controller } from "react-hook-form";
import { ErrorServerAlert } from "../alerts/ErrorServer";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import type { ProjectInterface } from "@/interfaces/project.interface";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import type { BlockInterface } from "@/interfaces/block.interface";
import { useBlockUpdate } from "@/hooks/resources/useBlockUpdate";
import { ProjectContext } from "@/context/projectContext";

interface props {
  block: BlockInterface;
  closeModal: () => void;
}

export const BlockUpdate = ({ block, closeModal }: props) => {
  const [projects, setProjects] = useState<[] | ProjectInterface[]>([]);
  const { onSubmit, serverError, form, isSubmitting, success } = useBlockUpdate(
    block as BlockInterface,
  );
  const { handleList } = use(ProjectContext);

  const getProjects = async () => {
    const { data } = await handleList();
    if (!data) return;
    setProjects(data as ProjectInterface[]);
  };

  useEffect(() => {
    if (success) {
      toast.success("Actualizado exitosamente");
      closeModal();
    }

    getProjects();
  }, [success]);
  return (
    <form id="form-login" onSubmit={onSubmit} className="space-y-4">
      {serverError && (
        <ErrorServerAlert
          title={serverError.error}
          description={serverError.reason}
        />
      )}
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="input-field-name">Nombre de bloque</FieldLabel>
            <Input
              {...field}
              id="input-field-name"
              type="text"
              placeholder="Nombre del proyecto"
              aria-invalid={fieldState.invalid}
              required
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="project_id"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="select-project_id">
              Estados de proyecto
            </FieldLabel>
            <Select
              {...field}
              value={field.value?.toString()}
              onValueChange={(value) =>
                field.onChange(parseInt(value as string))
              }
              id="select-project_id"
              aria-invalid={fieldState.invalid}
              required
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent className="dark">
                <SelectGroup>
                  <SelectLabel>Estados de proyecto</SelectLabel>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="text-area-description">Descripcion</FieldLabel>
            <Textarea
              {...field}
              rows={5}
              id="text-area-description"
              placeholder="Descripcion del proyecto"
              aria-invalid={fieldState.invalid}
              required
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button
        disabled={isSubmitting}
        className="w-full"
        variant="default"
        type="submit"
      >
        Guardar
      </Button>
    </form>
  );
};
