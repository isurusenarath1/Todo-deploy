import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TodoItem from '../components/TodoItem';
import { getTodosByStatus } from '../api/todoApi';

function DeletedTasksPage() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const data = await getTodosByStatus('deleted');
      setTodos(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch deleted tasks. Please try again later.');
      console.error('Error fetching deleted tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Deleted Tasks</h1>
        <Link 
          to="/" 
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
        >
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          <span className="hidden sm:inline">Back to Active</span>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
          {error}
        </div>
      ) : todos.length === 0 ? (
        <div className="p-4 bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded text-center">
          <p className="mb-4">No deleted tasks found.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Go to Active Tasks
          </Link>
        </div>
      ) : (
        <div>
          {todos.map(todo => (
            <TodoItem key={todo._id} todo={todo} onUpdate={fetchTodos} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DeletedTasksPage; 