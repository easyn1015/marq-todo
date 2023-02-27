import { rest } from 'msw';

const dbHost = process.env.REACT_APP_DB_HOST;

interface Todo {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    is_completed: boolean;
    referenced_todos: number[];
}

async function getTodos(pageNum?: number, pageSize?: number): Promise<Todo[]> {
    let response;
    if (!pageSize || !pageNum) {
        response = await fetch(`${dbHost}/todos`);
    } else {
        response = await fetch(`${dbHost}/todos?_page=${pageNum}&_limit=${pageSize}`);
    }
    const data = await response.json();
    return data;
}

async function createTodo(content: string, referencedTodos?: number[]): Promise<{ id: number }> {
    const now = new Date().toISOString();
    const response = await fetch(`${dbHost}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content,
            referenced_todos: referencedTodos || [],
            created_at: now,
            updated_at: now,
            is_completed: false,
        }),
    });
    const data = await response.json();
    return data;
}

async function updateTodo(
    id: number,
    { content, is_completed, referencedTodos }: { content?: string; is_completed?: boolean; referencedTodos?: number[] }
): Promise<void> {
    const todoResponse = await fetch(`${dbHost}/todos/${id}`);
    const todo = await todoResponse.json();
    const body: Partial<Todo> = {
        content: content ?? todo.content,
        is_completed: is_completed ?? todo.is_completed,
        referenced_todos: referencedTodos ?? todo.referenced_todos,
        created_at: todo.created_at,
        updated_at: new Date().toISOString(),
    };

    const response = await fetch(`${dbHost}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    await response.json();
}

async function deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${dbHost}/todos/${id}`, {
        method: 'DELETE',
    });
    await response.json();
}

export const handlers = [
    rest.post<{ content: string; referencedTodos?: number[] }>('/todos', async (req, res, ctx) => {
        const { content, referencedTodos } = req.body;

        // 참조하고 있는 todo ID가 모두 유효한지 확인
        const todos = await getTodos();
        const isValidReference =
            referencedTodos === undefined ||
            referencedTodos.every((todoId) => {
                return todos.some((todo) => todo.id === todoId);
            });

        if (!isValidReference) {
            return res(
                ctx.status(400),
                ctx.json({
                    error: 'Invalid referenced todos',
                })
            );
        }

        const { id } = await createTodo(content, referencedTodos);

        return res(
            ctx.status(201),
            ctx.json({
                id,
            })
        );
    }),

    rest.get('/todos', async (req, res, ctx) => {
        const todos = await getTodos();
        return res(ctx.status(200), ctx.json(todos));
    }),

    rest.put<{ id: number; content?: string; is_completed?: boolean; referencedTodos?: number[] }>(
        '/todos/:id',
        async (req, res, ctx) => {
            const todoId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const { content, is_completed, referencedTodos } = req.body;

            // 참조하고 있는 todo ID가 모두 유효한지 확인
            const todos = await getTodos();
            const isValidReference =
                referencedTodos === undefined ||
                referencedTodos.every((todoId) => {
                    return todos.some((todo) => todo.id === todoId);
                });

            if (!isValidReference) {
                return res(
                    ctx.status(400),
                    ctx.json({
                        error: 'Invalid referenced todos',
                    })
                );
            }

            await updateTodo(parseInt(todoId, 10), {
                content,
                is_completed,
                referencedTodos,
            });

            return res(ctx.status(200), ctx.json({}));
        }
    ),

    rest.delete<{ id: number }>('/todos/:id', async (req, res, ctx) => {
        const todos = await getTodos();
        const todoId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const todoIndex = todos.findIndex((todo) => todo.id === parseInt(todoId, 10));

        if (todoIndex === -1) {
            return res(
                ctx.status(404),
                ctx.json({
                    error: 'Todo not found',
                })
            );
        }

        todos.splice(todoIndex, 1);

        await deleteTodo(parseInt(todoId, 10));

        return res(ctx.status(200), ctx.json({}));
    }),
];
