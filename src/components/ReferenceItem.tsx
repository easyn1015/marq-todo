import React, { useState, useEffect } from 'react';
import { Todo } from '../api';

interface ReferenceItemProps {
    todos: Todo[];
    activeReferenceIds: number[];
    onAddReference: (todoId: number) => void;
    referenceTodoId?: number;
    isOpen: boolean;
    onGlobalOpen: (itemId: number | null) => void;
    currentTodo?: Todo;
}

const ReferenceItem = (props: ReferenceItemProps) => {
    const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

    useEffect(() => {
        if (props.referenceTodoId) {
            const initActiveTodo = props.todos.find((todo) => todo.id === props.referenceTodoId);
            setActiveTodo(initActiveTodo || null);
        }
    }, [props.referenceTodoId, props.todos]);

    const handleAddReference = (todo: Todo) => {
        if (activeTodo) props.onAddReference(activeTodo.id);
        props.onAddReference(todo.id);
        props.onGlobalOpen(null);
    };

    const handleRemoveReference = () => {
        if (activeTodo) props.onAddReference(activeTodo.id);
        setActiveTodo(null);
    };

    const handleToggle = () => {
        const key = activeTodo ? activeTodo.id : 0;
        props.onGlobalOpen(props.isOpen ? null : key);
    };
    return (
        <>
            <div className='reference-item'>
                <button
                    className={`reference-item__add-button ${activeTodo ? 'active' : ''}`}
                    type='button'
                    title='Add Reference'
                    onClick={handleToggle}>
                    {activeTodo && `${activeTodo.content}`}
                </button>
                {props.isOpen && (
                    <div className={`reference-item__modal ${props.isOpen ? 'open' : ''}`}>
                        <div className='reference-item__modal__content'>
                            <p className='reference-item__modal__title'>Reference</p>
                            <ul className='reference-item__list'>
                                {activeTodo && (
                                    <li>
                                        <button
                                            type='button'
                                            onClick={handleRemoveReference}
                                            className='reference-item__remove-button'>
                                            Remove Reference
                                        </button>
                                    </li>
                                )}
                                {props.todos.map((todo: Todo) => (
                                    <li
                                        key={todo.id}
                                        className='reference-item__list-item'>
                                        <button
                                            type='button'
                                            onClick={() => handleAddReference(todo)}
                                            disabled={
                                                props.activeReferenceIds.includes(todo.id) ||
                                                (props.currentTodo ? props.currentTodo.id === todo.id : false)
                                            }
                                            className={`reference-item__list-item-button ${
                                                activeTodo?.id === todo.id ? 'selected' : ''
                                            }`}>
                                            {todo.content}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ReferenceItem;
