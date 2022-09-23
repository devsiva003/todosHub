require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const connectDB = require("./utils/connectDB")
const TodoRoutes = require("./routes/TodoRoutes")
const UserRoutes = require("./routes/UserRoutes")
const logger = require("./middlewares/logger")
const errorHandler = require("./middlewares/errorHandler")
const requireAuth = require("./middlewares/requireAuth")
const { PORT = 5000 } = process.env

/* Middlewares */
app.use(express.json())
app.use(cors())
app.use(logger)

/* Connection */
connectDB().then(() =>
  app.listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}`)
  )
)

app.get("/", (_, res) => res.json({ success: true }))

/* Routes */
app.use("/todos", requireAuth, TodoRoutes)
app.use("/users", UserRoutes)

/* Error Handling Middleware */
app.use(errorHandler)
