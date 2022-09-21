const { isValidObjectId } = require("mongoose")
const TodoModel = require("../models/TodoModel")
const asyncHandler = require("express-async-handler")

// GET /
const GET_TODOS = asyncHandler(async (req, res) => {
    const { page = 1, limit: limitCount = 0 } = req.query
    // console.log(page, limit)
    const { user: author } = req
    const totalItems = await TodoModel.count({ author })
    const todos = await TodoModel.find({ author })
        .skip((page - 1) * limitCount)
        .limit(limitCount)
        .sort({ modifiedAt: -1 })
        .select("-author")
    res.json({ totalItems, todos })
})

// GET /:id
const GET_TODO = asyncHandler(async (req, res) => {
    const { user: author } = req
    const { id: _id } = req.params
    if (!isValidObjectId(_id)) throw new Error("Invalid id")
    const todo = await TodoModel.findOne({ _id, author }).select("-author")
    // console.log(todo)
    if (!todo) throw new Error("No todo found with the specified id")
    res.json(todo)
})

// POST /
const CREATE_TODO = asyncHandler(async (req, res) => {
    const { user: author } = req
    const { name } = req.body
    if (!name) throw new Error("name field is required")
    const exists = await TodoModel.findOne({ name, author })
    if (exists) throw new Error("Todo with the specified name already exists")
    const newTodo = await new TodoModel({ name, author }).save()
    res.json(newTodo)
})

// PATCH /:id
const UPDATE_TODO = asyncHandler(async (req, res) => {
    const { user: author } = req
    let { id: _id } = req.params
    let { name, isCompleted } = req.body
    let modifiedAt = undefined
    if (!isValidObjectId(_id)) throw new Error("Invalid id")
    if (typeof name === "undefined" && typeof isCompleted === "undefined")
        throw new Error("Either any one of the field should be specified")
    const exists = await TodoModel.findOne({ name, author })
    if (exists)
        throw new Error("Another todo already exists with the specified name")
    if (name) modifiedAt = new Date().toJSON()
    let updatedTodo = await TodoModel.findOneAndUpdate(
        { _id },
        { name, isCompleted, modifiedAt },
        { new: true }
    ).select("-author")
    await updatedTodo.save()
    // console.log(updatedTodo)
    if (!updatedTodo) throw new Error("No todo found with the specified id")
    res.json(updatedTodo)
})

// DELETE /:id
const DELETE_TODO = asyncHandler(async (req, res) => {
    let { id } = req.params
    if (!isValidObjectId(id)) throw new Error("Invalid id")
    let deletedTodo = await TodoModel.findOneAndDelete({ id })
    res.json(deletedTodo)
})

module.exports = { GET_TODOS, GET_TODO, CREATE_TODO, UPDATE_TODO, DELETE_TODO }
