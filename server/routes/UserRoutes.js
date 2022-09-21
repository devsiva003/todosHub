const { Router } = require("express")
const {
  SIGN_UP,
  SIGN_IN,
  UPDATE_USER,
} = require("../controllers/UserController")

const requireAuth = require("../middlewares/requireAuth")

const UserRoutes = Router()

UserRoutes.post("/signup", SIGN_UP)
UserRoutes.post("/signin", SIGN_IN)
UserRoutes.patch("/update", requireAuth, UPDATE_USER)

module.exports = UserRoutes
