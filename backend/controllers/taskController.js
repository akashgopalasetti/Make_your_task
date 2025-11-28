// backend/controllers/taskController.js
const Task = require('../models/Task');

function sanitizeProgress(value) {
  let p = Number(value);
  if (!Number.isFinite(p)) return 0;
  p = Math.round(p);
  return Math.max(0, Math.min(100, p));
}

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, progress } = req.body;
    const p = sanitizeProgress(progress);
    const task = new Task({
      user: req.user._id,
      title,
      description: description || '',
      status: status || (p === 100 ? 'done' : 'pending'),
      progress: p
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('createTask error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { q, status } = req.query;
    const filter = { user: req.user._id };
    if (status) filter.status = status;
    if (q) filter.title = { $regex: q, $options: 'i' };
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('getTasks error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error('getTask error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    console.log('updateTask body:', req.body); // <-- debug log
    const updateFields = {};
    const allowed = ['title', 'description', 'status', 'progress'];
    for (const key of allowed) {
      if (req.body[key] !== undefined) updateFields[key] = req.body[key];
    }

    if (updateFields.progress !== undefined) {
      updateFields.progress = sanitizeProgress(updateFields.progress);
      if (updateFields.progress === 100) updateFields.status = 'done';
    }

    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateFields,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json(updated);
  } catch (err) {
    console.error('updateTask error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const removed = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!removed) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('deleteTask error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
