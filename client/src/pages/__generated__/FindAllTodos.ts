/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindAllTodos
// ====================================================

export interface FindAllTodos_todos {
  __typename: "Todo";
  id: string;
  todo: string | null;
  done: boolean;
}

export interface FindAllTodos {
  todos: FindAllTodos_todos[];
}

export interface FindAllTodosVariables {
  offset?: number | null;
  limit?: number | null;
}
