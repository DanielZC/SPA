import { use, useState } from "react";

import { UserContext } from "@/context/userContext";
import { loginSchema, type LoginFormSchema } from "@/schemas/authSchema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  LoginErrorsInterface,
  ServerErrorInteface,
} from "@/interfaces/auth.interfaces";

type fields = "email" | "password" | `root.${string}` | "root";

export const useLogin = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [serverError, setServerError] = useState<ServerErrorInteface | null>(
    null,
  );
  const { handleLogin } = use(UserContext);

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const setErrorField = (errors: LoginErrorsInterface) => {
    Object.entries(errors).map(([field, [error]]) => {
      form.setError(field as fields, {
        type: "server",
        message: error,
      });
    });
  };

  const onSubmit = async (data: LoginFormSchema) => {
    const { auth, errors, server, data: userData } = await handleLogin(data);

    if (!auth) {
      if (server) {
        setServerError(server);
        return;
      }
      setServerError(null);
      setErrorField(errors as LoginErrorsInterface);
      return;
    }
    console.log("hola");
    console.log(auth);
    console.log(userData);

    if (userData) {
      localStorage.setItem("name", userData.user.name);
      localStorage.setItem("email", userData.user.email);
      localStorage.setItem("token", userData.token);
    }
    setServerError(null);
    setIsAuth(auth);
  };

  return {
    isAuth,
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    serverError: serverError,
  };
};
