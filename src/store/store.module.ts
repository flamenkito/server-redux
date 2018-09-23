import { Module } from '@nestjs/common';

import { Store } from './store';
import { reducers } from './reducers';

const providers = [
  {
    provide: 'Store',
    useFactory: async () => {
      const store = new Store(reducers);
      return store;
    },
  },
];

@Module({
  imports: [],
  controllers: [],
  providers: [...providers],
  exports: [...providers],
})
export class StoreModule {}
