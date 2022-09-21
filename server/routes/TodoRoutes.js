const { Router } = require("express")
const {
    GET_TODOS,
    GET_TODO,
    CREATE_TODO,
    DELETE_TODO,
    UPDATE_TODO,
} = require("../controllers/TodoController")
const TodoRoutes = Router()

TodoRoutes.route("/").get(GET_TODOS).post(CREATE_TODO)
TodoRoutes.route("/:id").get(GET_TODO).patch(UPDATE_TODO).delete(DELETE_TODO)

module.exports = TodoRoutes
