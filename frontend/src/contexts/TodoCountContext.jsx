import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getAllTodoCounts } from '../api/todoApi';

// Create context
export const TodoCountContext = createContext();

// Create provider component
export const TodoCountProvider = ({ children }) => {
  const [todoCounts, setTodoCounts] = useState({
    active: 0,
    completed: 0,
    deleted: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchCounts = useCallback(async () => {
    try {
      setIsLoading(true);
      const counts = await getAllTodoCounts();
      setTodoCounts(counts);
    } catch (error) {
      console.error('Error fetching todo counts:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCounts();
    
    // Set up a refresh interval to keep counts updated
    const intervalId = setInterval(fetchCounts, 30000); // Update every 30 seconds
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [fetchCounts]);

  // Provide a way for components to update the counts when they make changes
  const refreshCounts = () => {
    fetchCounts();
  };

  return (
    <TodoCountContext.Provider value={{ todoCounts, isLoading, refreshCounts }}>
      {children}
    </TodoCountContext.Provider>
  );
};

// Create custom hook for using this context
export const useTodoCount = () => {
  const context = useContext(TodoCountContext);
  if (!context) {
    throw new Error('useTodoCount must be used within a TodoCountProvider');
  }
  return context;
}; 