import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPathByValue,
  FieldValues,
} from "react-hook-form";

interface InputPasswordProps<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<
    TFieldValues,
    FieldPathByValue<TFieldValues, string>
  >;
  fieldState: ControllerFieldState;
  placeholder?: string;
  id?: string;
}

export const InputPassword = <TFieldValues extends FieldValues>({
  field,
  fieldState,
  placeholder = "Contraseña",
  id,
}: InputPasswordProps<TFieldValues>) => {
  const [inputType, setInputType] = useState<"password" | "text">("password");

  const toggleInputTypePassword = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <InputGroup>
      <InputGroupInput
        {...field}
        id={id}
        type={inputType}
        placeholder={inputType === "password" ? "••••••••••" : placeholder}
        aria-invalid={fieldState.invalid}
        required
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          onClick={toggleInputTypePassword}
          aria-label={
            inputType === "password"
              ? "Mostrar contraseña"
              : "Ocultar contraseña"
          }
        >
          {inputType === "password" ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};
