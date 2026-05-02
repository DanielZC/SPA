import { useLogin } from "@/hooks/auth/useLogin";
import { Input } from "@/components/ui/input";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputPassword } from "../custom/inputs/InputPassword";
import { ErrorServerAlert } from "../alerts/ErrorServer";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const { form, onSubmit, isSubmitting, serverError, isAuth } = useLogin();

  useEffect(() => {
    if (isAuth) {
      toast.success("Sesión iniciada", {
        description: `Bienvenido`,
      });

      navigate("/dashboard");
    }
  }, [isAuth]);

  return (
    <form id="form-login" onSubmit={onSubmit} className="space-y-4">
      {serverError && (
        <ErrorServerAlert
          title={serverError.error}
          description={serverError.reason}
        />
      )}
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
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="input-field-password">Contraseña</FieldLabel>
            <InputPassword
              field={field}
              fieldState={fieldState}
              id="input-field-password"
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
        Iniciar sesión
      </Button>
    </form>
  );
};
