import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ActiveTasksPage from './pages/ActiveTasksPage';
import CompletedTasksPage from './pages/CompletedTasksPage';
import DeletedTasksPage from './pages/DeletedTasksPage';
import AddTaskPage from './pages/AddTaskPage';
import { useTheme } from './hooks/useTheme';
import { TodoCountProvider } from './contexts/TodoCountContext';

function App() {
  // We call useTheme here to initialize the theme
  useTheme();

  return (
    <Router>
      <TodoCountProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 flex flex-col">
          <Navbar />
          <main className="flex-grow py-4">
            <div className="max-w-7xl mx-auto w-full px-4">
              <Routes>
                <Route path="/" element={<ActiveTasksPage />} />
                <Route path="/completed" element={<CompletedTasksPage />} />
                <Route path="/deleted" element={<DeletedTasksPage />} />
                <Route path="/add" element={<AddTaskPage />} />
              </Routes>
            </div>
          </main>
          <footer className="py-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            <div className="max-w-7xl mx-auto px-4">
              Todo App © {new Date().getFullYear()} Isuru Senarath
            </div>
          </footer>
        </div>
      </TodoCountProvider>
    </Router>
  );
}

export default App;
