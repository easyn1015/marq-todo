import React, { useState } from 'react';
import ReferenceItem from './ReferenceItem';
import { Todo } from '../api';

interface ReferenceListProps {
    onSaveTodo: (referenced_todos?: number[]) => void;
    todos: Todo[];
    referenced_todos?: number[];
}

const ReferenceList = (props: ReferenceListProps) => {
    const [activeReferenceIds, setActiveReferenceIds] = useState<number[]>(props.referenced_todos || []);
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
        if (props.referenced_todos === undefined) setActiveReferenceIds([]);
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
