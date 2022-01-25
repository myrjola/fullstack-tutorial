import React, {Fragment, useState} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';

import {Loading, Header} from '../components';
import {RouteComponentProps} from '@reach/router';
import Todo from "../containers/todo";

export const FIND_ALL_TODOS = gql`
    query FindAllTodos($offset: Int, $limit: Int) {
        todos(offset: $offset, limit: $limit) {
            id
            todo
            done
        }
    }
`;

export const INSERT_TODO = gql`
    mutation InsertTodo($todo: String!) {
        insertTodo(todo: $todo) {
            id
            todo
            done
        }
    }
`;

interface TodosProps extends RouteComponentProps {
}

const Todos: React.FC<TodosProps> = () => {
    const {
        data,
        loading,
        error,
        fetchMore
    } = useQuery(
        FIND_ALL_TODOS,
        {variables: {offset: 0, limit: 5}}
    );
    const [insertTodo, {loading: insertingTodo}] = useMutation(INSERT_TODO, {
        update(cache, {data: {insertTodo}}) {
            cache.modify({
                fields: {
                    todos(existingTodos = []) {
                        const newTodoRef = cache.writeFragment({
                            data: insertTodo,
                            fragment: gql`
                                fragment NewTodo on Todo {
                                    id
                                }
                            `
                        });
                        return [newTodoRef, ...existingTodos];
                    }
                }
            });
        }
    });
    const [newTodo, setNewTodo] = useState("");

    if (loading) return <Loading/>;
    if (error) return <p>ERROR: {error.message}</p>;
    if (data === undefined) return <p>ERROR</p>;

    const onAddTodo = async (e: any) => {
        e.preventDefault();
        await insertTodo({variables: {todo: newTodo}});
        setNewTodo("");
        return true;
    }

    return (
        <Fragment>
            <Header>Todos</Header>

            <form onSubmit={onAddTodo}>
                <label>
                    Add todo:{' '}
                    <input disabled={insertingTodo} onChange={e => setNewTodo(e.target.value)} value={newTodo}/>
                </label>
            </form>

            <h2>Todos</h2>
            {data?.todos?.length ? (
                data?.todos?.map((todo: any) => <Todo key={todo.id} todo={todo}/>)
            ) : (
                <p>You haven't created any todos.</p>
            )}
            <button onClick={() => fetchMore({
                variables: {
                    offset: data?.todos?.length
                },
            })}>Fetch more</button>
        </Fragment>
    );
}

export default Todos;
