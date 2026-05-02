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
import { useProjectUpdate } from "@/hooks/resources/useProjectUpdate";
import type { ProjectInterface } from "@/interfaces/project.interface";
import { useEffect } from "react";
import { toast } from "sonner";

interface props {
  project: ProjectInterface;
  closeModal: () => void;
}

export const ProjectUpdate = ({ project, closeModal }: props) => {
  const status = ["stand by", "active", "done", "cancelled"];
  const { onSubmit, serverError, form, isSubmitting, success } =
    useProjectUpdate(project as ProjectInterface);

  useEffect(() => {
    if (success) {
      toast.success("Actualizado exitosamente");
      closeModal();
    }
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
        name="status"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="select-status">Descripcion</FieldLabel>
            <Select
              {...field}
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              id="select-status"
              aria-invalid={fieldState.invalid}
              required
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent className="dark">
                <SelectGroup>
                  <SelectLabel>Estados de proyecto</SelectLabel>
                  {status.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
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
