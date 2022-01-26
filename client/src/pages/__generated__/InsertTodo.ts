/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertTodo
// ====================================================

export interface InsertTodo_insertTodo {
  __typename: "Todo";
  id: string;
  todo: string | null;
  done: boolean;
}

export interface InsertTodo {
  insertTodo: InsertTodo_insertTodo | null;
}

export interface InsertTodoVariables {
  todo: string;
}
