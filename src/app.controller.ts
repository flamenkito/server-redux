import { Get, Controller } from '@nestjs/common';

import { Observable } from 'rxjs';

import { AppService } from './app.service';
import { Store } from './store/store';
import { TodoActions } from 'store/actions/todo.actions';
import { selectEntities } from 'store';

@Controller()
export class AppController {
  state$: Observable<any>;

  constructor(
    private readonly appService: AppService,
    private readonly store: Store,
  ) {
    this.state$ = store.select(selectEntities);
    this.state$.subscribe(state => console.log(state));
  }

  @Get()
  root(): string {
    this.store.dispatch(
      new TodoActions.AddOne({ id: 'todo-1', name: 'First one' }),
    );
    setTimeout(() => {
      this.store.dispatch(
        new TodoActions.AddOne({ id: 'todo-2', name: 'Second one' }),
      );
    }, 3000);
    return this.appService.root();
  }
}
