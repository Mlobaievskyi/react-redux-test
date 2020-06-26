import type { formReducerInitialState } from "Store/reducers/formReducer";

type initialStateType = formReducerInitialState;

export const createReducer = (
  initialState: initialStateType,
  handlers: any
) => (state = initialState, action: any) => {
  if (action.type) {
    const handler = handlers[action.type];
    if (handler) {
      const result = handler(state, action);
      if (result === null) {
        return state;
      }

      return { ...state, ...result };
    }
  }
  return state;
};
