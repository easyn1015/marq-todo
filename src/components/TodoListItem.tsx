import React, { useState, useEffect } from 'react';
import { Todo } from '../api';
import ReferenceList from './ReferenceList';
import { parseDate, formatDate } from '../utils/formatDate';

interface TodoListItemProps {
    todo: Todo;
    todos: Todo[];
    onUpdateTodo: (
        id: number,
        {
            content,
            is_completed,
            referencedTodos,
        }: { content?: string; is_completed?: boolean; referencedTodos?: number[] }
    ) => void;
    onDeleteTodo: (id: number) => void;
    onUpdateTodos: () => void;
}

const TodoListItem = (props: TodoListItemProps) => {
    const [inputValue, setInputValue] = useState(props.todo.content);
    const [checkValue, setCheckValue] = useState(props.todo.is_completed);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const referencedContents: string[] = [];

    props.todo.referenced_todos.forEach((todoId) => {
        const todo = props.todos.find((todo) => todo.id === todoId);
        if (todo) {
            referencedContents.push(todo.content);
        }
    });

    const formatISODate = (dateString: string) => {
        return formatDate(parseDate(dateString));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newCheckValue;

        if (checkValue === false && props.todo.referenced_todos.length > 0) {
            const allCompleted =
                props.todos
                    .filter((todo) => props.todo.referenced_todos.includes(todo.id))
                    .some((todo) => !todo.is_completed) === false;
            if (allCompleted) newCheckValue = !checkValue;
            else newCheckValue = checkValue;
        } else {
            newCheckValue = !checkValue;
        }
        setCheckValue(newCheckValue);
        props.onUpdateTodo(props.todo.id, { is_completed: newCheckValue });
    };

    const handleEditTodo = (referencedTodos?: number[]) => {
        props.onUpdateTodo(props.todo.id, {
            content: inputValue,
            is_completed: checkValue,
            referencedTodos,
        });
        setIsEditMode(false); // 수정 완료되면 수정 모드 종료
    };

    const handleDeleteTodo = () => {
        props.onDeleteTodo(props.todo.id);
        setShowDeleteModal(false); // 삭제 모달 닫기
    };

    return (
        <>
            <div className='todo-list-item'>
                <div className='todo-list-item__wrapper'>
                    <div className='todo-list-item__checkbox'>
                        <input
                            type='checkbox'
                            id={`todo-${props.todo.id}`}
                            checked={checkValue}
                            onChange={handleCheckChange}
                        />
                        <label htmlFor={`todo-${props.todo.id}`}></label>
                    </div>
                    <div className='todo-list-item__content'>
                        <div className='todo-list-item__input-area'>
                            <input
                                type='text'
                                id={`todo-input-${props.todo.id}`}
                                className={`todo-list-item__input ${
                                    isEditMode ? 'todo-list-item__input--edit-mode' : ''
                                }`}
                                value={inputValue}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                            />
                            <button
                                className={`todo-list-item__edit-button ${
                                    isEditMode ? 'todo-list-item__edit-button--edit-mode' : ''
                                }`}
                                onClick={() => setIsEditMode(!isEditMode)}>
                                <span className='visually-hidden'>Edit</span>
                            </button>
                            <button
                                className='todo-list-item__delete-button'
                                onClick={() => setShowDeleteModal(true)}>
                                <span className='visually-hidden'>Delete</span>
                            </button>
                        </div>
                        <div className='todo-list-item__info'>
                            {props.todo.referenced_todos.length > 0 && (
                                <span className='todo-list-item__references'>
                                    <span className='ir'>References</span> {referencedContents.join(', ')}
                                </span>
                            )}
                            <span className='todo-list-item__created-at'>
                                <span className='ir'>Created</span> {formatISODate(props.todo.created_at)}
                            </span>
                            <span className='todo-list-item__updated-at'>
                                <span className='ir'>Updated</span> {formatISODate(props.todo.updated_at)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='todo-list-item__entry-bar'>
                    {isEditMode && (
                        <ReferenceList
                            todos={props.todos}
                            referenced_todos={props.todo.referenced_todos}
                            onSaveTodo={handleEditTodo}
                        />
                    )}
                </div>
                {showDeleteModal && (
                    <div className='todo-list-item__delete-modal'>
                        <div className='todo-list-item__delete-modal-content'>
                            <p className='todo-list-item__delete-modal-message'>삭제하시겠습니까?</p>
                            <div className='todo-list-item__delete-modal-buttons'>
                                <button
                                    className='todo-list-item__delete-modal-button todo-list-item__delete-modal-button--cancel'
                                    onClick={() => setShowDeleteModal(false)}>
                                    취소
                                </button>
                                <button
                                    className='todo-list-item__delete-modal-button todo-list-item__delete-modal-button--delete'
                                    onClick={handleDeleteTodo}>
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default TodoListItem;
