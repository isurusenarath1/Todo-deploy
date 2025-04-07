import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useTodoCount } from '../contexts/TodoCountContext';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { todoCounts, isLoading } = useTodoCount();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Determine if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Counter badge component
  const CountBadge = ({ count, type }) => {
    if (isLoading) return null;
    
    let badgeClass = "ml-1 px-2 py-0.5 text-xs font-medium rounded-full";
    
    // Different colors for different task types
    switch (type) {
      case 'active':
        badgeClass += " bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200";
        break;
      case 'completed':
        badgeClass += " bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200";
        break;
      case 'deleted':
        badgeClass += " bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200";
        break;
      default:
        badgeClass += " bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
    
    return (
      <span className={badgeClass}>
        {count}
      </span>
    );
  };

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Todo App</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive('/') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              Active Tasks
              <CountBadge count={todoCounts.active} type="active" />
            </Link>
            <Link 
              to="/completed" 
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive('/completed') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              Completed
              <CountBadge count={todoCounts.completed} type="completed" />
            </Link>
            <Link 
              to="/deleted" 
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive('/deleted') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              Deleted
              <CountBadge count={todoCounts.deleted} type="deleted" />
            </Link>
            <Link 
              to="/add" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/add') ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              Add Task
            </Link>

            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 