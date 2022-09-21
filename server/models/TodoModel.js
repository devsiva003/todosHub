const { Schema, model, default: mongoose } = require("mongoose")

const TodoSchema = new Schema(
    {
        name: String,
        isCompleted: {
            type: Schema.Types.Boolean,
            default: false,
        },
        modifiedAt: {
            type: Schema.Types.Date,
            default: Date.now,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
)

const TodoModel = model("todos", TodoSchema)

module.exports = TodoModel
