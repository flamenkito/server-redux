import * as fromTodo from './todo.reducer';

export interface State {
  todo: fromTodo.State;
}

export const reducers = {
  todo: fromTodo.reducer,
};

export const initialState = {
  todo: fromTodo.initialState,
};
