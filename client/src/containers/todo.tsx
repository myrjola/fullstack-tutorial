import React, {FC, useEffect, useRef, useState} from "react";
import {gql, useMutation} from "@apollo/client";

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

interface Props {
    todo: {
        id: number;
        todo?: string;
        done: boolean;
    }
}

const EditTodo: FC<Props & { onDone: () => void }> = ({todo, onDone}) => {
    const [updateTodo] = useMutation(UPDATE_TODO);
    const ref = useRef<HTMLInputElement>(null)

    const onUpdate = async () => {
        await updateTodo({
            variables: {
                id: todo.id,
                todo: ref.current?.value
            }
        })
        onDone()
    }

    useEffect(() => {
        ref.current?.focus()
    }, [])

    return <input
        ref={ref}
        onKeyDown={(e) => {
            (e.key === 'Enter') && onUpdate()
        }}
        onBlur={onUpdate}
        type="text"
        defaultValue={todo.todo}
    />
}

const Todo: FC<Props> = ({todo}) => {
    const [completeTodo] = useMutation(COMPLETE_TODO);
    const [isEditing, setIsEditing] = useState(false)

    return (<div key={todo.id}>
        <input type="checkbox" checked={todo.done} disabled={todo.done}
               onChange={() => completeTodo({variables: {id: todo.id}})}/>
        {isEditing ?
            <EditTodo todo={todo} onDone={() => setIsEditing(false)}/>
            :
            <button disabled={todo.done} onClick={() => setIsEditing(true)}>{todo.todo}</button>
        }
    </div>)
}

export default Todo
