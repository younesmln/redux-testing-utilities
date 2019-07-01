export function mergeStateEnhancer(nextStoreCreator) {
  const SECRET_ACTION = Symbol('secret/merge_state');

  const rootReducer = reducer => (state, action) => {
    if (action.type === SECRET_ACTION) {
      return action.payload;
    }
    return reducer(state, action);
  };

  return function createStore(reducer, ...rest) {
    const store = nextStoreCreator(rootReducer(reducer), ...rest);

    function updateState(payload) {
      store.dispatch({ type: SECRET_ACTION, payload });
    }

    return {
      ...store,
      updateState
    };
  };
}
