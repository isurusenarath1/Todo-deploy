import { useState } from 'react';
import { updateTodoStatus, deleteTodo } from '../api/todoApi';
import EditTodoForm from './EditTodoForm';
import { useTodoCount } from '../contexts/TodoCountContext';

function ActiveTodoItem({ todo, onUpdate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [actionType, setActionType] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const { refreshCounts } = useTodoCount();

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Calculate days until due date
  const calculateDueDays = () => {
    if (!todo.dueDate) return { text: 'No due date', colorClass: 'text-gray-500 dark:text-gray-400' };
    
    const dueDate = new Date(todo.dueDate);
    const today = new Date();
    
    // Reset time part to compare dates only
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} overdue`, colorClass: 'text-red-600 dark:text-red-400 font-bold' };
    } else if (diffDays === 0) {
      return { text: 'Due today', colorClass: 'text-red-600 dark:text-red-400 font-bold' };
    } else if (diffDays <= 2) {
      return { text: `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`, colorClass: 'text-red-600 dark:text-red-400' };
    } else if (diffDays <= 5) {
      return { text: `Due in ${diffDays} days`, colorClass: 'text-yellow-600 dark:text-yellow-400' };
    } else {
      return { text: `Due in ${diffDays} days`, colorClass: 'text-green-600 dark:text-green-400' };
    }
  };

  const dueInfo = calculateDueDays();

  const handleStatusChange = async (newStatus) => {
    try {
      setIsLoading(true);
      setActionType(newStatus === 'completed' ? 'completing' : 'reactivating');
      await updateTodoStatus(todo._id, newStatus);
      onUpdate();
      refreshCounts();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsLoading(false);
      setActionType('');
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      setActionType('deleting');
      await deleteTodo(todo._id);
      onUpdate();
      refreshCounts();
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setIsLoading(false);
      setActionType('');
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  }

  const handleEdit = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsEditing(true);
      setFadeOut(false);
    }, 200);
  };

  const handleCancelEdit = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsEditing(false);
      setFadeOut(false);
    }, 200);
  };

  const handleUpdateComplete = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsEditing(false);
      onUpdate();
      refreshCounts();
      setFadeOut(false);
    }, 200);
  };

  if (isEditing) {
    return <EditTodoForm todo={todo} onCancel={handleCancelEdit} onUpdate={handleUpdateComplete} />;
  }

  // Loading indicator component
  const LoadingSpinner = () => (
    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  // Icons for buttons
  const EditIcon = () => (
    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
    </svg>
  );

  const CompleteIcon = () => (
    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  );

  const DeleteIcon = () => (
    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
    </svg>
  );

  return (
    <div className={`bg-white dark:bg-slate-800 shadow rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700 transition-opacity duration-200 ${fadeOut ? 'opacity-50' : 'opacity-100'}`}>
      {/* Desktop view */}
      <div className="hidden md:block">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{todo.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-wrap">{todo.description}</p>
            <div className="flex mt-2 items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mr-3">
                Due date: {formatDate(todo.dueDate)}
              </p>
              <p className={`text-sm font-medium ${dueInfo.colorClass}`}>
                {dueInfo.text}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              disabled={isLoading}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center disabled:opacity-70"
            >
              {isLoading && actionType === 'editing' ? <LoadingSpinner /> : <EditIcon />}
              Edit
            </button>
            
            <button
              onClick={() => handleStatusChange('completed')}
              disabled={isLoading}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm flex items-center disabled:opacity-70"
            >
              {isLoading && actionType === 'completing' ? <LoadingSpinner /> : <CompleteIcon />}
              Complete
            </button>
            
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm flex items-center disabled:opacity-70"
            >
              {isLoading && actionType === 'deleting' ? <LoadingSpinner /> : <DeleteIcon />}
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{todo.title}</h3>
              <div className="flex flex-col text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Due: {formatDate(todo.dueDate)}
                </span>
                <span className={`font-medium ${dueInfo.colorClass}`}>
                  {dueInfo.text}
                </span>
              </div>
            </div>
            <button 
              onClick={toggleExpand}
              disabled={isLoading}
              className="text-gray-500 dark:text-gray-400 p-1 -mt-1 disabled:opacity-70"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {expanded ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                )}
              </svg>
            </button>
          </div>
          
          {expanded && <p className="text-gray-600 dark:text-gray-300 my-2 whitespace-pre-wrap">{todo.description}</p>}
          
          {/* Always show action buttons */}
          <div className="flex flex-wrap gap-2 mt-2 justify-end">
            <button
              onClick={handleEdit}
              disabled={isLoading}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs flex items-center disabled:opacity-70"
            >
              {isLoading && actionType === 'editing' ? <LoadingSpinner /> : <EditIcon />}
              Edit
            </button>
            
            <button
              onClick={() => handleStatusChange('completed')}
              disabled={isLoading}
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs flex items-center disabled:opacity-70"
            >
              {isLoading && actionType === 'completing' ? <LoadingSpinner /> : <CompleteIcon />}
              Complete
            </button>
            
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs flex items-center disabled:opacity-70"
            >
              {isLoading && actionType === 'deleting' ? <LoadingSpinner /> : <DeleteIcon />}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveTodoItem; 