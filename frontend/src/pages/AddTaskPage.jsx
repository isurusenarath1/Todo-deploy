import { Link } from 'react-router-dom';
import TodoForm from '../components/TodoForm';

function AddTaskPage() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Add New Task</h1>
        <Link 
          to="/" 
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
        >
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          <span className="hidden sm:inline">Back to Tasks</span>
        </Link>
      </div>
      <TodoForm />
    </div>
  );
}

export default AddTaskPage; 