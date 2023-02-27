import React, { useState } from 'react';
import ReferenceItem from './ReferenceItem';
import { Todo } from '../api';

interface ReferenceListProps {
    onSaveTodo: (referencedTodos?: number[]) => void;
    todos: Todo[];
    referencedTodos?: number[];
    currentTodo?: Todo;
}

const ReferenceList = (props: ReferenceListProps) => {
    const [activeReferenceIds, setActiveReferenceIds] = useState<number[]>(props.referencedTodos || []);
    const [openItemId, setOpenItemId] = useState<number | null>(null);

    const handleAddReference = (todoId: number) => {
        setActiveReferenceIds((prevActiveReferenceIds) => {
            if (prevActiveReferenceIds.includes(todoId)) {
                return prevActiveReferenceIds.filter((id) => id !== todoId);
            } else {
                return [...prevActiveReferenceIds, todoId];
            }
        });
    };

    const handleSaveTodoClick = () => {
        props.onSaveTodo(activeReferenceIds);
        // TodoForm인 경우에만 Save된 후 활성화 된 참조 비움
        if (props.referencedTodos === undefined) setActiveReferenceIds([]);
        setOpenItemId(null);
    };

    const handleGlobalOpenItemId = (itemId: number | null) => {
        setOpenItemId(itemId);
    };

    return (
        <>
            <ul className='reference-list'>
                {activeReferenceIds.map((todoId: number) => (
                    <li key={todoId}>
                        <ReferenceItem
                            todos={props.todos}
                            activeReferenceIds={activeReferenceIds}
                            onAddReference={handleAddReference}
                            referenceTodoId={todoId}
                            isOpen={openItemId === todoId}
                            onGlobalOpen={handleGlobalOpenItemId}
                            currentTodo={props.currentTodo}
                        />
                    </li>
                ))}
                <li>
                    <ReferenceItem
                        todos={props.todos}
                        activeReferenceIds={activeReferenceIds}
                        onAddReference={handleAddReference}
                        isOpen={openItemId === 0}
                        onGlobalOpen={handleGlobalOpenItemId}
                        currentTodo={props.currentTodo}
                    />
                </li>
            </ul>
            <button
                className='reference-list__save-button'
                type='button'
                onClick={handleSaveTodoClick}>
                Save
            </button>
        </>
    );
};
export default ReferenceList;
