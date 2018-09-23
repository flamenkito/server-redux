import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { ActionModel } from './models';

export interface State {
  [key: string]: any;
}

export class Store {
  private subject: BehaviorSubject<State>;
  private store: Observable<State>;
  private reducers: {
    [key: string]: (state: any, action: ActionModel) => State;
  };

  dispatch(action: ActionModel) {
    const state = {};
    for (const prop of Object.keys(this.reducers)) {
      state[prop] = this.reducers[prop](this.subject.value[prop], action);
    }
    this.subject.next(state);
  }

  select<T>(mapper: Mapper<State, T>): Observable<T> {
    return this.store.pipe(map(mapper));
  }

  constructor(reducers = {}) {
    this.reducers = reducers;
    this.subject = new BehaviorSubject<State>({});
    this.store = this.subject.asObservable().pipe(distinctUntilChanged());
    // get all reducers intial states
    this.dispatch({ type: 'STORE_INIT' });
  }
}

type Mapper<In, Out> = (state: In) => Out;

export function createSelector<T>(): Mapper<T, T>;
export function createSelector<T, A>(a: Mapper<State, A>): Mapper<T, A>;
export function createSelector<T, A, B>(a: Mapper<State, A>, b: Mapper<A, B>): Mapper<T, B>;
export function createSelector<T, A, B, C>(a: Mapper<State, A>, b: Mapper<A, B>, c: Mapper<B, C>): Mapper<T, C>;

export function createSelector<T, R>(...fns: Array<Mapper<T, R>>): Mapper<T, R> {
  return mapperFromArray(fns);
}

export const createFeatureSelector = <T>(name: string) => createSelector(
  (state: State): T => state[name],
);

function noop(state) { return state; }

function mapperFromArray<T, R>(fns: Array<Mapper<T, R>>): Mapper<T, R> {
  if (!fns) {
    return noop as Mapper<any, any>;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input: T): R {
    return fns.reduce((prev: any, fn: Mapper<T, R>) => fn(prev), input as any);
  };
}

const compose = (f, g) => x => g(f(x));
const composeMany = (...args) => args.reduce(compose);
