const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.use(protect);

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
