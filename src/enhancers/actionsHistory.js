export function actionsHistoryEnhancer(nextStoreCreator) {
  return function createStore(...args) {
    let actions = [];

    const store = nextStoreCreator(...args);

    const dispatch = action => {
      actions.push(action);
      return store.dispatch(action);
    };

    const clearActions = () => {
      actions = [];
    };

    return {
      ...store,
      dispatch,
      clearActions,
      getActions: () => actions
    };
  };
}
