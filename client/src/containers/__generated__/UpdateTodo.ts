/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTodo
// ====================================================

export interface UpdateTodo_updateTodo {
  __typename: "Todo";
  id: string;
  todo: string | null;
  done: boolean;
}

export interface UpdateTodo {
  updateTodo: UpdateTodo_updateTodo | null;
}

export interface UpdateTodoVariables {
  id: string;
  todo: string;
}
