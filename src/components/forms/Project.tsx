import { Button } from "../ui/button";
import { ErrorServerAlert } from "../alerts/ErrorServer";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useProject } from "@/hooks/resources/useProject";
import { Textarea } from "../ui/textarea";
import { useEffect } from "react";
import { toast } from "sonner";

interface props {
  closeModal: () => void;
}

export const Project = ({ closeModal }: props) => {
  const { onSubmit, serverError, form, isSubmitting, success } = useProject();

  useEffect(() => {
    if (success) {
      toast.success("Proyecto creado exitosamente");
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
