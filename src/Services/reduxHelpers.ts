export const createReducer = (
  initialState: { items: Object[] },
  handlers: { [x: string]: any },
  finalizer?: (arg0: any) => any
): Object => (state: any, action: any) => {
  if (action.type) {
    const handler = handlers[action.type];
    if (handler) {
      const result = handler(state, action);
      if (result === null) {
        return state;
      }
      if (finalizer) {
        return finalizer({ ...state, ...result });
      }
    }
  }
  return state;
};
