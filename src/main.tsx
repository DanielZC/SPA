import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "./components/ui/sonner";
import { UserContextProvider } from "./context/userContext";
import { ProjectContextProvider } from "./context/projectContext";
import { BlockContextProvider } from "./context/blockContext";
import { PieceContextProvider } from "./context/pieceContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContextProvider>
      <ProjectContextProvider>
        <BlockContextProvider>
          <PieceContextProvider>
            <Toaster />
            <App />
          </PieceContextProvider>
        </BlockContextProvider>
      </ProjectContextProvider>
    </UserContextProvider>
  </StrictMode>,
);
