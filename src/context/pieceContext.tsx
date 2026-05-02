import {
  deletePiece,
  getPiece,
  listPieces,
  storePiece,
  updatePiece,
} from "@/api/services/piece.services";
import type {
  PieceInterface,
  PieceResponse,
} from "@/interfaces/piece.interface";
import { initialState, piecesReducer } from "@/reducers/PieceReducer";

import { createContext, useReducer, type PropsWithChildren } from "react";

interface PieceContextProps {
  action: number;
  handleCreate: (data: PieceInterface) => Promise<PieceResponse>;
  handleUpdate: (id: number, data: PieceInterface) => Promise<PieceResponse>;
  handleGet: (id: number) => Promise<PieceResponse>;
  handleDelete: (id: number) => Promise<PieceResponse>;
  handleList: () => Promise<PieceResponse>;
}

export const PieceContext = createContext({} as PieceContextProps);

export const PieceContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(piecesReducer, initialState);
  const { action } = state;

  const handleCreate = async (
    pieceData: PieceInterface,
  ): Promise<PieceResponse> => {
    const { success, errors, server } = await storePiece(pieceData);

    if (!success) {
      return { success: success, errors: errors, server: server };
    }

    dispatch({ type: "ACTION" });
    return { success: success };
  };

  const handleUpdate = async (
    id: number,
    pieceData: PieceInterface,
  ): Promise<PieceResponse> => {
    const { success, errors, server } = await updatePiece(id, pieceData);

    if (!success) {
      return { success: success, errors: errors, server: server };
    }

    dispatch({ type: "ACTION" });
    return { success: success };
  };

  const handleGet = async (id: number): Promise<PieceResponse> => {
    const { success, server, data } = await getPiece(id);
    if (!success) {
      return { success, server };
    }

    dispatch({ type: "ACTION" });
    const piece = data as PieceInterface;
    return { success, data: piece };
  };
  const handleDelete = async (id: number): Promise<PieceResponse> => {
    const { success, server, data } = await deletePiece(id);
    if (!success) {
      return { success, server };
    }

    dispatch({ type: "ACTION" });
    const piece = data as PieceInterface;
    return { success, data: piece };
  };
  const handleList = async (): Promise<PieceResponse> => {
    const { success, data, server } = await listPieces();
    if (!success) {
      return { success, server };
    }

    const pieces = data as PieceInterface[];
    return { success, data: pieces };
  };

  return (
    <PieceContext
      value={{
        action: action,
        handleCreate: handleCreate,
        handleUpdate: handleUpdate,
        handleGet: handleGet,
        handleDelete: handleDelete,
        handleList: handleList,
      }}
    >
      {children}
    </PieceContext>
  );
};
