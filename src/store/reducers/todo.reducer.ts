import { TodoActions } from 'store/actions/todo.actions';
import { TodoModel } from 'store/models/todo.model';

export interface State {
  entities: { [key: string]: TodoModel };
  loaded: boolean;
  loading: boolean;
}

export const initialState: State = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: TodoActions.Types) {
  switch (action.type) {
    case TodoActions.ADD_ONE: {
      const { id } = action.todo;
      const entities = { ...state.entities, [id]: action.todo };
      return { ...state, entities };
    }
    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;
