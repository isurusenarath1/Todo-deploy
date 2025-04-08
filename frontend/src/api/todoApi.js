import axios from 'axios';

// Get API URL from environment variables with fallback to local development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

// Force HTTPS for production deployments if URL starts with http:// and isn't localhost
const secureApiUrl = API_URL.includes('localhost') ? 
  API_URL : 
  API_URL.replace('http://', 'https://');

console.log('API URL:', secureApiUrl);

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: secureApiUrl,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000 // 10 second timeout
});

// Add request logging
api.interceptors.request.use(
  config => {
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response logging
api.interceptors.response.use(
  response => {
    console.log('Received response:', response.status);
    return response;
  },
  error => {
    console.error('Response error:', error.message);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    return Promise.reject(error);
  }
);

// Get all todos
export const getAllTodos = async () => {
  try {
    const response = await api.get('');
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
    const response = await api.post('', todoData);
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