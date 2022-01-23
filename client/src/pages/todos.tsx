import React, {Fragment, useState} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';

import {Loading, Header} from '../components';
import {RouteComponentProps} from '@reach/router';

export const FIND_ALL_TODOS = gql`
    query FindAllTodos {
        todos {
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

export const COMPLETE_TODO = gql`
    mutation CompleteTodo($id: ID!) {
        completeTodo(id: $id) {
            id
            todo
            done
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation UpdateTodo($id: ID!, $todo: String!) {
        updateTodo(id: $id, todo: $todo) {
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
        error
    } = useQuery(
        FIND_ALL_TODOS,
    );
    const [insertTodo, {loading: insertingTodo}] = useMutation(INSERT_TODO);
    const [updateTodo, {loading: updatingTodo}] = useMutation(INSERT_TODO);
    const [completeTodo, {loading: completingTodo}] = useMutation(COMPLETE_TODO);
    const [newTodo, setNewTodo] = useState("");

    if (loading) return <Loading/>;
    if (error) return <p>ERROR: {error.message}</p>;
    if (data === undefined) return <p>ERROR</p>;

    const onAddTodo = async () => {
        await insertTodo({ variables: { todo: newTodo} })
        setNewTodo("")
    }

    return (
        <Fragment>
            <Header>Todos</Header>

            <label>
                Add todo:
                <input disabled={insertingTodo} onChange={e => setNewTodo(e.target.value)} value={newTodo}/>
            </label>
            <button onClick={onAddTodo} type="button"
                    disabled={insertingTodo}>{insertingTodo ? "Adding..." : "Add todo"}</button>

            <h2>Todos</h2>
            {data?.todos?.length ? (
                data?.todos?.map((todo: any) => (
                    <div>
                        <input type="checkbox" checked={todo.done} disabled={todo.done} onChange={() => completeTodo({variables: {id: todo.id}})}/>
                        {todo.todo}
                    </div>
                ))
            ) : (
                <p>You haven't booked any trips</p>
            )}
        </Fragment>
    );
}

export default Todos;
