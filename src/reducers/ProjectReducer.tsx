interface ProjectState {
  action: number;
}

export type ProjectAction = { type: "ACTION" };

export const initialState: ProjectState = {
  action: 0,
};

export const projectReducer = (
  state: ProjectState,
  action: ProjectAction,
): ProjectState => {
  switch (action.type) {
    case "ACTION":
      return { action: state.action + 1 };

    default:
      return initialState;
  }
};
