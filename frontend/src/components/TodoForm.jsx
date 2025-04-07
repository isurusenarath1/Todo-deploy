import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTodo } from '../api/todoApi';
import { useTodoCount } from '../contexts/TodoCountContext';

function TodoForm() {
  const navigate = useNavigate();
  const { refreshCounts } = useTodoCount();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      await createTodo({
        ...formData,
        status: 'active'
      });
      refreshCounts();
      navigate('/');
    } catch (error) {
      setError('Failed to create todo. Please try again.');
      console.error('Error creating todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-none rounded-t-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
            placeholder="Enter task title"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
            placeholder="Enter task description"
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto order-2 sm:order-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto order-1 sm:order-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm; 