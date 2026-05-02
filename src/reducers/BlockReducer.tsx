interface BlockState {
  action: number;
}

export type BlockAction = { type: "ACTION" };

export const initialState: BlockState = {
  action: 0,
};

export const blocksReducer = (
  state: BlockState,
  action: BlockAction,
): BlockState => {
  switch (action.type) {
    case "ACTION":
      return { action: state.action + 1 };

    default:
      return initialState;
  }
};
