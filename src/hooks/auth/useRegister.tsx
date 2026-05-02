import { use, useState } from "react";

import { registerSchema, type RegisterFormSchema } from "@/schemas/authSchema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  RegisterErrorsInterface,
  ServerErrorInteface,
} from "../../interfaces/auth.interfaces";
import { UserContext } from "@/context/userContext";

type fields =
  | "name"
  | "email"
  | "password"
  | "password_confirmation"
  | `root.${string}`
  | "root";

export const useRegister = () => {
  const { handleRegister } = use(UserContext);
  const [registered, setRegistered] = useState(false);
  const [serverError, setServerError] = useState<ServerErrorInteface | null>(
    null,
  );

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const setErrorField = (errors: RegisterErrorsInterface) => {
    Object.entries(errors).map(([field, [error]]) => {
      form.setError(field as fields, {
        type: "server",
        message: error,
      });
    });
  };

  const onSubmit = async (data: RegisterFormSchema) => {
    const { registered, server, errors } = await handleRegister(data);

    if (!registered) {
      if (server) {
        setServerError(server);
        return;
      }
      setServerError(null);
      setErrorField(errors as RegisterErrorsInterface);
      return;
    }

    setRegistered(registered);
    setServerError(null);
    form.reset();
  };

  const reset = () => {
    setRegistered(false);
  };

  return {
    registered,
    form,
    serverError,

    reset,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
