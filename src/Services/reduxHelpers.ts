export const createReducer = (initialState: any, handlers: any) => (
  state = initialState,
  action: any
) => {
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
