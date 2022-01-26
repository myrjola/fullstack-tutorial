/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CompleteTodo
// ====================================================

export interface CompleteTodo_completeTodo {
  __typename: "Todo";
  id: string;
  todo: string | null;
  done: boolean;
}

export interface CompleteTodo {
  completeTodo: CompleteTodo_completeTodo | null;
}

export interface CompleteTodoVariables {
  id: string;
}
