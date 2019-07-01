import { createStore, compose, applyMiddleware } from 'redux';
import { actionsHistoryEnhancer, mergeStateEnhancer } from './enhancers';

export default function configureStore({
  reducer = () => 0,
  initialState,
  enhancers = [],
  middlewares = []
} = {}) {
  const allEnhancers = [
    actionsHistoryEnhancer,
    mergeStateEnhancer,
    ...enhancers
  ];
  if (middlewares) enhancers.push(applyMiddleware(middlewares));
  return createStore(reducer, initialState, compose(...allEnhancers));
}

export { actionsHistoryEnhancer, mergeStateEnhancer };
