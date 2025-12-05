import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {

    const { username, email, password } = req.body || {};

    try {
        const hashPass = bcrypt.hashSync(password, 10)
        const user = await User.create({

            username: username,
            password: hashPass,
            email: email,
            // role: role
        })
        res.status(200).json({
            status: 'success',
            data: 'User registered successfully',
            user
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 'error',
            data: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) return res.status().json({ status: 'error', data: ('please provide your details to login') })

        let account = await User.findOne({ email });
        if (!account) return res.status(404).json({ status: 'error', data: "User doesnot exist" })

        const pass = bcrypt.compareSync(password, account.password);
        if (!pass) return res.status(400).json({ status: 'error', data: "Invalid password" });

        const token = jwt.sign({
            id: account.id,
            role: account.role,
        }, 'secret');
        return res.status(200).json({
            status: 'success',
            data: {
                token,
                role: account.role
            }
        })

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(404).json({ status: 'error', data: 'user not found' })

        return res.status(200).json({
            status: "success",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: error.message
        })
    }
}


export const updateProfile = async (req, res) => {
    const { email, username } = req.body ?? {};
    try {
        const isExist = await User.findById(req.userId);
        if (!isExist) return res.status(404).json({
            status: 'error',
            data: 'user doesn\'t exist'
        });

        isExist.username = username || isExist.username;
        isExist.email = email || isExist.email;
        await isExist.save();
        return res.status(200).json({
            status: 'success',
            data: 'profile updated successfully'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            data: err.message
        });
    }
}


export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({
            status: "error",
            data: "Both old and new passwords are required",
        });
    }
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                status: "error",
                data: "User not found",
            });
        }
        // Verify old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: "error",
                data: "Old password is incorrect",
            });
        }
        // Hash new password
        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;

        await user.save();

        return res.status(200).json({
            status: "success",
            data: "Password updated successfully",
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            data: error.message,
        });
    }
};
