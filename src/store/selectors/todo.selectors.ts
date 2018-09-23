import { createFeatureSelector, createSelector } from 'store/store';

import * as fromTodo from '../reducers/todo.reducer';

export const selectTodoState = createFeatureSelector<fromTodo.State>('todo');

export const selectEntities = createSelector(
  selectTodoState,
  fromTodo.getEntities,
);
