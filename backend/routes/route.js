const express = require("express");
const ToDo = require("../models/model");
const mongoose = require('mongoose');
const router = express.Router();


router.post("/postTodos", async (req, res) => {
    const { title } = req.body;
    try {
        if (!title) {
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
        }
        await ToDo.create({
            title,
        });
        res.status(201).json({
            message: "ToDo created successfully",
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
})

router.get("/", async (req, res) => {
    const todos = await ToDo.find({});
    if (todos.length === 0) {
        return res.status(404).json({
            message: "No todos found"
        });
    }
    res.status(200).json({
        todos
    });
});

router.get("/getTodoById", async (req, res) => {
    const { id } = req.body;
    try {
        const todo = await ToDo.findById({
            _id: id

        });
        if (!todo) {
            return res.status(404).json({
                message: "No todo found"
            });
        }
        res.status(200).json({
            todo,
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
});

router.put('/updateTodo', async (req, res) => {
    const { id, title } = req.body;
    try {
        if (!title) {
            return res.status(400).json({ errorMessage: "Please provide the title or description to update." });
        }
        const updateFields = {};
        if (title) {
            updateFields.title = title;
        }
        if (description) {
            updateFields.description = description;
        }
        const todo = await ToDo.findByIdAndUpdate(
            id,
            updateFields,
            { new: true } // Returns the updated todo in the response
        );
        if (!todo) {
            return res.status(404).json({
                message: "No todo found"
            });
        }
        res.status(200).json({
            message: "Todo updated successfully",
            todo: todo // Optional: Include the updated todo in the response
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
});

router.put('/completed/', async function (req, res) {
    const { id } = req.body;
    // console.log(id)
    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id" });
    }

    try {
        const todo = await ToDo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: "No todo found" });
        }

        await ToDo.findByIdAndUpdate(
            id,
            { completed: !todo.completed },
            { new: true } // Returns the updated todo in the response
        );

        res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
});
router.delete('/deleteTodo', async (req, res) => {
    const { id } = req.body;
    try {
        const todo = await ToDo.findById(id);
        if (!todo) {
            return res.status(404).json({
                message: "No todo found"
            });
        }
        await ToDo.findByIdAndDelete({
            _id: id
        });
        res.status(200).json({
            message: "Todo deleted successfully",
        })
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
});
router.delete('/deleteAll',
    async (req, res) => {
        try {
            await ToDo.deleteMany({});
            res.status(200).json({
                message: "All todos deleted successfully",
            })
        } catch (error) {
            res.status(500).json({
                errorMessage: error.message
            });
        }
    }
)
module.exports = router;