const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        avatarURL: { type: String }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

UserSchema.pre('save', async function(next) {
    const user = this
    
    if (!user.isModified('password')) return next()

    user.password = await bcrypt.hash(user.password, 12)
    next()
})

const UserModel = model('user', UserSchema)

module.exports = {
    UserModel,
    UserSchema
}