import { useEffect } from "react";
import { useRegister } from "@/hooks/auth/useRegister";
import { InputPassword } from "../custom/inputs/InputPassword";
import { ErrorServerAlert } from "../alerts/ErrorServer";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { toast } from "sonner";

interface props {
  toggleForm: () => void;
}

export const Register = ({ toggleForm }: props) => {
  const { form, registered, serverError, reset, onSubmit } = useRegister();

  useEffect(() => {
    if (registered) {
      toast.success("El usuario ha sido creado correctamente");
      reset();
      toggleForm();
    }
  }, [registered]);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
            <FieldLabel htmlFor="input-field-name">Nombre completo</FieldLabel>
            <Input
              {...field}
              id="input-field-name"
              type="text"
              placeholder="Nombre completo"
              aria-invalid={fieldState.invalid}
              required
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="input-field-email">
              Correo electronico
            </FieldLabel>
            <Input
              {...field}
              id="input-field-email"
              type="email"
              placeholder="Correo electronico"
              aria-invalid={fieldState.invalid}
              required
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="input-field-pws">Contraseña</FieldLabel>
              <InputPassword
                field={field}
                fieldState={fieldState}
                id="input-field-pws"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password_confirmation"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="input-field-pws-2">
                Confirmar contraseña
              </FieldLabel>
              <InputPassword
                field={field}
                fieldState={fieldState}
                id="input-field-pws-2"
                placeholder="Confirmar contraseña"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Button
        className="w-full"
        disabled={registered}
        variant="default"
        type="submit"
      >
        Registrarse
      </Button>
    </form>
  );
};
