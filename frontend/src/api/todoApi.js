import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Enable sending cookies in cross-origin requests
  headers: {
    'Content-Type': 'application/json',
  }
});

// Get all todos
export const getAllTodos = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Get todos by status
export const getTodosByStatus = async (status) => {
  try {
    const response = await api.get(`/status/${status}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${status} todos:`, error);
    throw error;
  }
};

// Get a count of todos by status
export const getTodoCountByStatus = async (status) => {
  try {
    const response = await api.get(`/status/${status}`);
    return response.data.length;
  } catch (error) {
    console.error(`Error fetching ${status} todo count:`, error);
    throw error;
  }
};

// Get all todo counts
export const getAllTodoCounts = async () => {
  try {
    const [active, completed, deleted] = await Promise.all([
      getTodoCountByStatus('active'),
      getTodoCountByStatus('completed'),
      getTodoCountByStatus('deleted')
    ]);
    
    return {
      active,
      completed,
      deleted
    };
  } catch (error) {
    console.error('Error fetching todo counts:', error);
    throw error;
  }
};

// Get a single todo
export const getTodoById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todo:', error);
    throw error;
  }
};

// Create a new todo
export const createTodo = async (todoData) => {
  try {
    const response = await api.post('/', todoData);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Update a todo (full details)
export const updateTodo = async (id, todoData) => {
  try {
    const response = await api.put(`/${id}`, todoData);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// Update todo status only
export const updateTodoStatus = async (id, status) => {
  try {
    const response = await api.put(`/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating todo status:', error);
    throw error;
  }
};

// Delete a todo (soft delete - marks as deleted)
export const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

// Permanently delete a todo
export const permanentlyDeleteTodo = async (id) => {
  try {
    const response = await api.delete(`/${id}/permanent`);
    return response.data;
  } catch (error) {
    console.error('Error permanently deleting todo:', error);
    throw error;
  }
}; 