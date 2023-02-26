import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Todo {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    is_completed: boolean;
    referenced_todos: number[];
}

export interface HttpClientConfig extends AxiosRequestConfig {}

export interface HttpResponse<T> extends AxiosResponse<T> {}

export interface HttpError extends Error {
    response?: HttpResponse<any>;
}

export class HttpClient {
    private readonly client: AxiosInstance;

    constructor(config?: HttpClientConfig) {
        this.client = axios.create(config);
    }

    public async get<T = any>(url: string, config?: HttpClientConfig): Promise<T> {
        try {
            const response = await this.client.get<T>(url, config);
            return response.data;
        } catch (error) {
            throw this.handleHttpError(error);
        }
    }

    public async post<T = any>(url: string, data?: any, config?: HttpClientConfig): Promise<T> {
        try {
            const response = await this.client.post<T>(url, data, config);
            return response.data;
        } catch (error) {
            throw this.handleHttpError(error);
        }
    }

    public async put<T = any>(url: string, data?: any, config?: HttpClientConfig): Promise<T> {
        try {
            const response = await this.client.put<T>(url, data, config);
            return response.data;
        } catch (error) {
            throw this.handleHttpError(error);
        }
    }

    public async delete<T = any>(url: string, config?: HttpClientConfig): Promise<T> {
        try {
            const response = await this.client.delete<T>(url, config);
            return response.data;
        } catch (error) {
            throw this.handleHttpError(error);
        }
    }

    private handleHttpError(error: any): HttpError {
        if (error.response) {
            error.message = error.response.data?.message || error.response.statusText;
        }
        return error as HttpError;
    }
}

export class Api extends HttpClient {
    public async getTodos<T = any>(pageNum?: number, pageSize?: number): Promise<Todo[]> {
        const response = await this.get<Todo[]>(`/todos?pageNum=${pageNum}&pageSize=${pageSize}`);
        return response;
    }
    public async createTodo<T = any>(content: string, referencedTodos?: number[]): Promise<{ id: number }> {
        const data = {
            content,
            referencedTodos,
        };
        const response = await this.post<{ id: number }>('/todos', data);
        return response;
    }
    public async updateTodo<T = any>(
        id: number,
        {
            content,
            is_completed,
            referencedTodos,
        }: { content?: string; is_completed?: boolean; referencedTodos?: number[] }
    ): Promise<void> {
        const data = {
            content,
            is_completed,
            referencedTodos,
        };
        const response = await this.put<void>(`/todos/${id}`, data);
        return response;
    }
    public async deleteTodo<T = any>(id: number): Promise<void> {
        const response = await this.delete<void>(`/todos/${id}`);
        return response;
    }
}
