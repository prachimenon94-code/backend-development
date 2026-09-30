const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Todo
router.post('/', auth, async (req, res) => {
    try {
        const todo = await Todo.create({
            ...req.body,
            user: req.userId
        });

        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});

// Get all Todos
router.get('/', auth, async (req, res) => {
    try {
        const todos = await Todo.find({
            user: req.userId
        }).sort({ createdAt: -1 });

        res.json(todos);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});

// Get single Todo
router.get('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!todo) {
            return res.status(404).json({
                message: 'Todo not found'
            });
        }

        res.json(todo);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});

// Update Todo
router.put('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!todo) {
            return res.status(404).json({
                message: 'Todo not found'
            });
        }

        const { title, description, completed, priority, dueDate } = req.body;

        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (completed !== undefined) todo.completed = completed;
        if (priority !== undefined) todo.priority = priority;
        if (dueDate !== undefined) todo.dueDate = dueDate;

        await todo.save();

        res.json(todo);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});

// Delete Todo
router.delete('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!todo) {
            return res.status(404).json({
                message: 'Todo not found'
            });
        }

        res.json({
            message: 'Todo deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});

module.exports = router;