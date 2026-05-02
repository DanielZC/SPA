import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";

interface props {
  title: string;
  description: string;
}

export const ErrorServerAlert = ({ title, description }: props) => {
  return (
    <Alert className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50">
      <AlertTriangleIcon />
      <AlertTitle className="font-bold">{title}</AlertTitle>
      <AlertDescription className="text-white">{description}</AlertDescription>
    </Alert>
  );
};
