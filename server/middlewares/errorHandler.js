const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(err.stack)
    console.log(err.message)
  }
  res
    .status(res.statusCode < 200 || res.statusCode > 299 ? res.statusCode : 400)
    .json({ message: err.message })
}

module.exports = errorHandler
