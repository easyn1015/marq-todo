import React, { useState } from 'react';
import ReferenceList from './ReferenceList';
import { Todo } from '../api';
import { formatDate } from '../utils/formatDate';

interface TodoFormProps {
    onAddTodo: (content: string, referenced_todos?: number[]) => void;
    todos: Todo[];
}
const TodoForm = (props: TodoFormProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAddTodo = (referenced_todos?: number[]) => {
        props.onAddTodo(inputValue, referenced_todos);
        setInputValue('');
    };

    return (
        <div className='todo-form'>
            <div className='todo-form__wrapper'>
                <h2 className='todo-form__title'>Add a new todo</h2>
                <p className='todo-form__date'>{formatDate(new Date())}</p>
                <div className='todo-form__input-wrapper'>
                    <div className='todo-form__input-box'>
                        <input
                            type='text'
                            id='todo-input'
                            className='todo-form__input'
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder='Add a to-do'
                        />
                        <label
                            htmlFor='todo-input'
                            className='ir'>
                            Add a new todo
                        </label>
                    </div>
                    <div className='todo-form__entry-bar'>
                        <ReferenceList
                            onSaveTodo={handleAddTodo}
                            todos={props.todos}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoForm;
