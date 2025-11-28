import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        // validate: {
        //     validator: function (v) {
        //         return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        //     },
        //     message: (props) => `${props.value} is not a valid email address!`
        // },

        //SUPPORTED AND UPDATED ACCORDING TO THE STANDARDS
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email!`
        },
        required: true
    },
    password: {
        type: String,
        minlength: [6, "Must be atleast 6 characters"],
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default:'user'
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User;