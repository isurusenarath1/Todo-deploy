import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getAllTodoCounts } from '../api/todoApi';

// Create context
export const TodoCountContext = createContext();

// Log the API URL from environment variables for debugging
console.log('API URL from .env:', import.meta.env.VITE_API_URL);
console.log('Environment:', import.meta.env.MODE);

// Create provider component
export const TodoCountProvider = ({ children }) => {
  const [todoCounts, setTodoCounts] = useState({
    active: 0,
    completed: 0,
    deleted: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCounts = useCallback(async () => {
    try {
      console.log('Fetching todo counts...');
      setIsLoading(true);
      setError(null);
      const counts = await getAllTodoCounts();
      console.log('Received todo counts:', counts);
      setTodoCounts(counts);
    } catch (error) {
      console.error('Error fetching todo counts:', error);
      setError(error.message || 'Failed to fetch todo counts');
      
      // Show a more detailed error message for debugging
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCounts();
    
    // Set up a refresh interval to keep counts updated
    const intervalId = setInterval(fetchCounts, 60000); // Update every minute instead of 30 seconds
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [fetchCounts]);

  // Provide a way for components to update the counts when they make changes
  const refreshCounts = () => {
    fetchCounts();
  };

  return (
    <TodoCountContext.Provider value={{ todoCounts, isLoading, refreshCounts, error }}>
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