import React, { useEffect, useState } from 'react';
import './assets/css/style.css';
import { Api, Todo } from './api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
    const [todos, setTodos] = useState<Todo[]>([]); // 상태 변수 초기화
    const api = new Api(); // Api 클래스 인스턴스 생성

    useEffect(() => {
        updateTodos();
    }, []);

    const updateTodos = async () => {
        try {
            const newTodos = await api.getTodos(); // getTodos 호출
            setTodos(newTodos); // 결과값으로 상태 변수 업데이트
        } catch (error) {
            console.error(error);
        }
    };

    const updateTodo = async (
        id: number,
        {
            content,
            is_completed,
            referencedTodos,
        }: { content?: string; is_completed?: boolean; referencedTodos?: number[] }
    ) => {
        try {
            await api.updateTodo(id, { content, is_completed, referencedTodos });
            const updatedTodos = todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        ...(content !== undefined && { content }),
                        ...(is_completed !== undefined && { is_completed }),
                        ...(referencedTodos !== undefined && { referenced_todos: referencedTodos }),
                    };
                }
                return todo;
            });
            setTodos(updatedTodos);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await todos.forEach((todo) => {
                if (todo.referenced_todos.includes(id)) {
                    const newReferencedTodos = todo.referenced_todos.filter((todoId) => todoId !== id);
                    updateTodo(todo.id, { referencedTodos: newReferencedTodos });
                }
            });

            await api.deleteTodo(id);
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
        } catch (error) {
            console.error(error);
        }
        updateTodos();
    };

    // 새로운 todo를 추가하는 함수
    const addTodo = async (content: string, referencedTodos?: number[]) => {
        try {
            await api.createTodo(content, referencedTodos);
            updateTodos(); // 추가된 todo를 포함해서 todo 목록을 다시 가져옴
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='app'>
            <header className='app__header'>
                <h1 className='app__title'>Marq-TODOS</h1>
            </header>
            <main className='app__main'>
                <div className='todo-section--form'>
                    <TodoForm
                        onAddTodo={addTodo}
                        todos={todos}
                    />
                </div>

                <div className='todo-section--list'>
                    <TodoList
                        onUpdateTodo={updateTodo}
                        onDeleteTodo={deleteTodo}
                        onUpdateTodos={updateTodos}
                        todos={todos}
                    />
                </div>
            </main>
        </div>
    );
}

export default App;
