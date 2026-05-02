import type { JSX } from "react";

export const useBadge = () => {
  const colorBadge = (text: string): JSX.Element => {
    if (text == "stand by")
      return (
        <span className="ml-2 inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20">
          {text}
        </span>
      );
    if (text == "active")
      return (
        <span className="ml-2 inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/20">
          {text}
        </span>
      );
    if (text == "done")
      return (
        <span className="ml-2 inline-flex items-center rounded-md bg-lime-400/10 px-2 py-1 text-xs font-medium text-lime-400 inset-ring inset-ring-lime-400/20">
          {text}
        </span>
      );
    if (text == "pendding")
      return (
        <span className="ml-2 inline-flex items-center rounded-md bg-amber-400/10 px-2 py-1 text-xs font-medium text-amber-400 inset-ring inset-amber-lime-400/20">
          {text}
        </span>
      );
    return (
      <span className="ml-2 inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20">
        {text}
      </span>
    );
  };
  return {
    colorBadge,
  };
};
