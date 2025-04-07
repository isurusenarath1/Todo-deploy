import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ActiveTodoItem from '../components/ActiveTodoItem';
import { getTodosByStatus } from '../api/todoApi';

function ActiveTasksPage() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const data = await getTodosByStatus('active');
      
      // Sort todos by due date in ascending order
      const sortedTodos = [...data].sort((a, b) => {
        // If both have no due date, maintain original order
        if (!a.dueDate && !b.dueDate) return 0;
        
        // If only a has no due date, move it to the end
        if (!a.dueDate) return 1;
        
        // If only b has no due date, move it to the end
        if (!b.dueDate) return -1;
        
        // Compare due dates
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      
      setTodos(sortedTodos);
      setError('');
    } catch (err) {
      setError('Failed to fetch active tasks. Please try again later.');
      console.error('Error fetching active tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
    
    // Set up timer to update date/time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    
    // Clean up the timer
    return () => clearInterval(timer);
  }, []);

  // Format the date and time
  const formatDateTime = () => {
    const options = { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    };
    return currentDateTime.toLocaleString('en-US', options);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center mb-2 sm:mb-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mr-3">Active Tasks</h1>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
            {formatDateTime()}
          </div>
        </div>
        <Link 
          to="/add" 
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="hidden sm:inline">Add Task</span>
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
          <p className="mb-4">No active tasks found. Add a new task to get started.</p>
          <Link 
            to="/add" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Add Tasks
          </Link>
        </div>
      ) : (
        <div>
          {todos.map(todo => (
            <ActiveTodoItem key={todo._id} todo={todo} onUpdate={fetchTodos} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ActiveTasksPage; 