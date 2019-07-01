import { createStore, compose, combineReducers } from 'redux';
import merge from 'lodash.merge';
import { actionsHistoryEnhancer, mergeStateEnhancer } from '../enhancers';
import configureStore from '../main';

const initial_value1 = { keyA: 'value', keyB: 'value2' };
const initial_value2 = { keyA: 'value3', keyB: 'value4' };
const reducer1 = (state = initial_value1) => state;
const reducer2 = (state = initial_value2) => state;

const reducer = combineReducers({ state1: reducer1, state2: reducer2 });

describe('actionsHistoryEnhancer', () => {
  let store;
  beforeEach(() => {
    store = createStore(reducer, compose(actionsHistoryEnhancer));
  });
  it('adds the necessary keys to the store', () => {
    expect(store).toMatchObject({
      getActions: expect.any(Function),
      clearActions: expect.any(Function)
    });
  });

  it('records all the previously dispatched actions', () => {
    const action1 = { type: 'a' };
    const action2 = { type: 'b' };

    store.dispatch(action1);

    store.dispatch(action2);

    expect(store.getActions()).toEqual([action1, action2]);

    store.clearActions();

    expect(store.getActions()).toEqual([]);
  });
});

describe('mergeStateEnhancer', () => {
  it('updates the state of the store', () => {
    let store = createStore(reducer, compose(mergeStateEnhancer));

    expect(store.getState()).toEqual({
      state1: initial_value1,
      state2: initial_value2
    });

    const state = merge(
      {},
      store.getState(),
      { state1: { valueC: 5 } },
      { state1: { keyA: 4 } }
    );

    store.updateState(state);

    expect(store.getState()).toEqual({
      state1: { ...initial_value1, valueC: 5, keyA: 4 },
      state2: initial_value2
    });
  });

  it('', () => {
    let store = createStore(reducer, compose(mergeStateEnhancer));

    //store.updateState();
  });
});

describe('configureStore', () => {
  it('construct a default state', () => {
    const store = configureStore();
    expect(store).toMatchObject({
      getActions: expect.any(Function),
      clearActions: expect.any(Function),
      updateState: expect.any(Function)
    });
  });
});
