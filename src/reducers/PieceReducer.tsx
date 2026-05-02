interface PieceState {
  action: number;
}

export type PieceAction = { type: "ACTION" };

export const initialState: PieceState = {
  action: 0,
};

export const piecesReducer = (
  state: PieceState,
  action: PieceAction,
): PieceState => {
  switch (action.type) {
    case "ACTION":
      return { action: state.action + 1 };

    default:
      return initialState;
  }
};
