import {
  deleteBlock,
  getBlock,
  listBlocks,
  storeBlock,
  updateBlock,
} from "@/api/services/block.services";
import type {
  BlockInterface,
  BlockResponse,
} from "@/interfaces/block.interface";
import { blocksReducer, initialState } from "@/reducers/BlockReducer";
import { createContext, useReducer, type PropsWithChildren } from "react";

interface BlockContextProps {
  action: number;
  handleCreate: (data: BlockInterface) => Promise<BlockResponse>;
  handleUpdate: (id: number, data: BlockInterface) => Promise<BlockResponse>;
  handleGet: (id: number) => Promise<BlockResponse>;
  handleDelete: (id: number) => Promise<BlockResponse>;
  handleList: () => Promise<BlockResponse>;
}

export const BlockContext = createContext({} as BlockContextProps);

export const BlockContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(blocksReducer, initialState);
  const { action } = state;

  const handleCreate = async (
    blockData: BlockInterface,
  ): Promise<BlockResponse> => {
    const { success, errors, server } = await storeBlock(blockData);

    if (!success) {
      return { success: success, errors: errors, server: server };
    }

    dispatch({ type: "ACTION" });
    return { success: success };
  };

  const handleUpdate = async (
    id: number,
    blockData: BlockInterface,
  ): Promise<BlockResponse> => {
    const { success, errors, server } = await updateBlock(id, blockData);

    if (!success) {
      return { success: success, errors: errors, server: server };
    }

    dispatch({ type: "ACTION" });
    return { success: success };
  };

  const handleGet = async (id: number): Promise<BlockResponse> => {
    const { success, server, data } = await getBlock(id);
    if (!success) {
      return { success, server };
    }

    dispatch({ type: "ACTION" });
    const block = data as BlockInterface;
    return { success, data: block };
  };
  const handleDelete = async (id: number): Promise<BlockResponse> => {
    const { success, server, data } = await deleteBlock(id);
    if (!success) {
      return { success, server };
    }

    dispatch({ type: "ACTION" });
    const block = data as BlockInterface;
    return { success, data: block };
  };
  const handleList = async (): Promise<BlockResponse> => {
    const { success, data, server } = await listBlocks();
    if (!success) {
      return { success, server };
    }
    const blocks = data as BlockInterface[];
    return { success, data: blocks };
  };

  return (
    <BlockContext
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
    </BlockContext>
  );
};
