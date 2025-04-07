import { useState, useEffect } from 'react';
import { updateTodo } from '../api/todoApi';
import { useTodoCount } from '../contexts/TodoCountContext';

function EditTodoForm({ todo, onCancel, onUpdate }) {
  const { refreshCounts } = useTodoCount();
  const [formData, setFormData] = useState({
    title: todo.title || '',
    description: todo.description || '',
    dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Update form data if todo prop changes
    setFormData({
      title: todo.title || '',
      description: todo.description || '',
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
    });
  }, [todo]);

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
    
    // Check if there are actual changes
    const hasChanged = 
      formData.title !== todo.title || 
      formData.description !== todo.description || 
      formData.dueDate !== (todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '');
    
    if (!hasChanged) {
      onCancel(); // No changes, just close the form
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      await updateTodo(todo._id, {
        ...formData,
        status: todo.status // Preserve the current status
      });
      refreshCounts(); // Refresh the counts in the navbar
      onUpdate();
    } catch (error) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Task</h3>
        <button 
          onClick={onCancel}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {error && (
        <div className="p-4 bg-red-100 border-b border-red-400 text-red-700">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="edit-title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
            placeholder="Enter task title"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="edit-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
            placeholder="Enter task description"
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label htmlFor="edit-dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="edit-dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto order-2 sm:order-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto order-1 sm:order-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTodoForm; 