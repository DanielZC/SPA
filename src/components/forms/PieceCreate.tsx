import { BlockContext } from "@/context/blockContext";
import { usePiece } from "@/hooks/resources/usePiece";
import type { BlockInterface } from "@/interfaces/block.interface";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { ErrorServerAlert } from "../alerts/ErrorServer";
import { Controller } from "react-hook-form";
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
import { Button } from "../ui/button";

interface props {
  closeModal: () => void;
}

export const PieceCreate = ({ closeModal }: props) => {
  const [projects, setProjects] = useState<[] | BlockInterface[]>([]);
  const { onSubmit, serverError, form, isSubmitting, success } = usePiece();
  const { handleList } = use(BlockContext);

  const getBlocks = async () => {
    const { data } = await handleList();
    if (!data) return;
    setProjects(data as BlockInterface[]);
  };

  useEffect(() => {
    if (success) {
      toast.success("Proyecto creado exitosamente");
      closeModal();
    }
    getBlocks();
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
            <FieldLabel htmlFor="input-field-name">
              Nombre de proyecto
            </FieldLabel>
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
        name="block_id"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
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
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent className="dark">
                <SelectGroup>
                  <SelectLabel>Asignar proyecto</SelectLabel>
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
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="standard_weight"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="input-field-standard_weight">
                Peso estandar
              </FieldLabel>
              <Input
                {...field}
                id="input-field-standard_weight"
                type="number"
                step="0.01"
                placeholder="Peso estandar"
                aria-invalid={fieldState.invalid}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="real_weight"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="input-field-real_weight">
                Peso real
              </FieldLabel>
              <Input
                {...field}
                id="input-field-real_weight"
                placeholder="Peso real"
                aria-invalid={fieldState.invalid}
                type="number"
                step="0.01"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
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
