import express from 'express';
import Todo from '../models/todoModel.js';

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET todos by status
router.get('/status/:status', async (req, res) => {
  try {
    const todos = await Todo.find({ status: req.params.status });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.status || 'active'
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (req.body.title) todo.title = req.body.title;
    if (req.body.description) todo.description = req.body.description;
    if (req.body.dueDate) todo.dueDate = req.body.dueDate;
    if (req.body.status) todo.status = req.body.status;

    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a todo (actually updates status to 'deleted')
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.status = 'deleted';
    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hard DELETE a todo (completely removes from database)
router.delete('/:id/permanent', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 