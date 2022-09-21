const { Schema, default: mongoose } = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new Schema(
  {
    // name: {
    //     type: mongoose.SchemaTypes.String,
    //     required: true,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
)

UserSchema.statics.signup = async (email, password) => {
  if (!email || !password) throw new Error("email or password can't be empty")
  const exists = await UserModel.findOne({ email })
  if (exists) throw new Error("email already exists")
  const salt = await bcrypt.genSalt(10)
  const hashedPwd = await bcrypt.hash(password, salt)
  const newUser = await UserModel.create({ email, password: hashedPwd })
  return newUser
}

UserSchema.statics.signin = async (email, password) => {
  if (!email || !password) throw new Error("email or password can't be empty")
  const user = await UserModel.findOne({ email })
  if (!user) throw new Error("account not exists")
  const isCrtPassword = await bcrypt.compare(password, user.password)
  if (!isCrtPassword) throw new Error("Incorrect password")
  return user
}

UserSchema.methods.updateFileds = async function (
  passwordToUpate,
  fieldsToUpdate
) {
  if (!passwordToUpate) throw new Error("Password required to update")
  const isCrtPassword = await bcrypt.compare(passwordToUpate, this.password)
  if (!isCrtPassword) throw new Error("Incorrect password")
  if (fieldsToUpdate.password) {
    const salt = await bcrypt.genSalt(10)
    fieldsToUpdate.password = await bcrypt.hash(fieldsToUpdate.password, salt)
  }
  const updated = await UserModel.findOneAndUpdate(this, fieldsToUpdate, {
    new: true,
  })
  return updated
}

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel
