// @flow

export const createReducer = (
  initialState: *,
  handlers: *,
  finalizer: (*) => * = (x) => x
): Object => (state: * = initialState, action: *) => {
  if (action.type) {
    const handler = handlers[action.type];
    if (handler) {
      const result = handler(state, action);
      if (result === null) {
        return state;
      }
      return finalizer({ ...state, ...result });
    }
  }
  return state;
};
