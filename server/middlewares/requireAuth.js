const jwt = require("jsonwebtoken")
const UserModel = require("../models/UserModel")
const asyncHandler = require("express-async-handler")

const requireAuth = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith("Bearer")) {
        res.status(401) /* 401 => Unauthorized */
        throw new Error("Request is not authorized, no token")
    }
    let decodedId
    try {
        const token = authorization.split(" ")[1]
        const jwtRes = jwt.verify(token, process.env.JWT_SECRET)
        decodedId = jwtRes._id
        // console.log(jwtRes)
    } catch (err) {
        // console.log(err)
        if (err.name === "TokenExpiredError") {
            res.status(408)
            throw new Error("Session Expired")
        }
        res.status(401)
        throw new Error("Request is not authorized, invalid token")
    }
    const exists = await UserModel.findOne({ _id: decodedId })
    if (exists) {
        req.user = decodedId
        next()
        return
    }
    res.status(401)
    throw new Error("Invalid authentication")
})

module.exports = requireAuth
