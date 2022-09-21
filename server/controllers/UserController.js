const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/UserModel")

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  })

const SIGN_UP = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const { _id } = await UserModel.signup(email, password)
  const token = generateToken({ _id, email })
  res.json({ user: { email }, token })
})

const SIGN_IN = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const { _id } = await UserModel.signin(email, password)
  const token = generateToken({ _id, email })
  res.json({ user: { email }, token })
})

const UPDATE_USER = asyncHandler(async (req, res) => {
  const { newEmail, newPassword, email, password: passwordToUpdate } = req.body
  // console.log({ newEmail, newPassword, passwordToUpdate, email })
  const fieldsToUpdate = {}
  if (newEmail) fieldsToUpdate["email"] = newEmail
  if (newPassword) fieldsToUpdate["password"] = newPassword
  const user = await UserModel.findOne({ email })
  const { _id, email: updatedEmail } = await user.updateFileds(
    passwordToUpdate,
    fieldsToUpdate
  )
  const updatedToken = generateToken({ _id, email: updatedEmail })
  res.json({ user: { email: updatedEmail }, updatedToken })
})

module.exports = { SIGN_UP, SIGN_IN, UPDATE_USER }
