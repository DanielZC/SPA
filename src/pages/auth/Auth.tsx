import { CardHeaderLogin } from "@/components/forms/CardHeaderLogin";
import { CardHeaderRegister } from "@/components/forms/CardHeaderRegister";
import { Login } from "@/components/forms/Login";
import { Register } from "@/components/forms/Register";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/auth/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const Auth = () => {
  const navigate = useNavigate();
  const { toggleForm, login } = useAuth();
  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border-2 p-10 w-full max-w-md">
        <div className="fixed inset-0 flex items-center justify-center">
          <Card className="dark mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
            <CardHeader>
              {login ? <CardHeaderLogin /> : <CardHeaderRegister />}
              <CardAction>
                <Button variant="link" onClick={toggleForm}>
                  {login ? "Resgistrarse" : "Iniciar sesión"}
                </Button>
              </CardAction>
            </CardHeader>

            <CardContent>
              {login ? <Login /> : <Register toggleForm={toggleForm} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
