import React, { useState } from 'react';
import { Todo } from '../api';
import TodoListItem from './TodoListItem';
import { useFilter } from '../hooks/useFilter';
import { usePagination } from '../hooks/usePagination';

interface TodoListProps {
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

const PAGE_SIZE = 5; // 한 페이지당 보여줄 아이템 수

const TodoList = (props: TodoListProps) => {
    const { filteredData, filter, handleFilter } = useFilter(props.todos);
    const { currentPage, paginatedData, totalPages, handlePrevPage, handleNextPage } = usePagination(
        PAGE_SIZE,
        filteredData
    );

    return (
        <>
            <div className='todo-list'>
                <div className='todo-list__header'>
                    <div className='todo-list__count'>{filteredData.length} tasks</div>
                    <div className='todo-list__filter'>
                        <button
                            className={`todo-list__filter-button ${
                                filter === 'All' ? 'todo-list__filter-button--active' : ''
                            }`}
                            onClick={() => handleFilter('All')}>
                            All
                        </button>
                        <button
                            className={`todo-list__filter-button ${
                                filter === 'Active' ? 'todo-list__filter-button--active' : ''
                            }`}
                            onClick={() => handleFilter('Active')}>
                            Active
                        </button>
                        <button
                            className={`todo-list__filter-button ${
                                filter === 'Completed' ? 'todo-list__filter-button--active' : ''
                            }`}
                            onClick={() => handleFilter('Completed')}>
                            Completed
                        </button>
                    </div>
                </div>
                <div className='todo-list__items'>
                    {paginatedData.map((todo) => (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            todos={props.todos}
                            onUpdateTodo={props.onUpdateTodo}
                            onDeleteTodo={props.onDeleteTodo}
                            onUpdateTodos={props.onUpdateTodos}
                        />
                    ))}
                </div>
                <div className='todo-list__pagination'>
                    {currentPage > 1 && (
                        <button
                            className='todo-list__pagination-button'
                            onClick={handlePrevPage}>
                            Previous
                        </button>
                    )}
                    <span className='todo-list__pagination-info'>
                        {currentPage} / {totalPages}
                    </span>
                    {currentPage < totalPages && (
                        <button
                            className='todo-list__pagination-button'
                            onClick={handleNextPage}>
                            Next
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default TodoList;
