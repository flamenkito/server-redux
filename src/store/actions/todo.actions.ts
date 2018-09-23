import { ActionModel } from 'store/models/action.model';

export namespace TodoActions {
  export const ADD_ONE = '[Todo] Add One';

  export class AddOne implements ActionModel {
    readonly type = ADD_ONE;
    constructor(public readonly todo: any) {}
  }

  export type Types = AddOne;
}
