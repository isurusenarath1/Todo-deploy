import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  dueDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'deleted'],
    default: 'active'
  }
}, {
  timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo; 