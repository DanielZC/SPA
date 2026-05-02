import { useState } from "react";

export const useAuth = () => {
  const [login, setLogin] = useState(true);

  const toggleForm = () => {
    setLogin((prev) => (prev == true ? false : true));
  };

  return {
    login,
    toggleForm,
  };
};
