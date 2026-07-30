const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================
// Signup
// ======================

const signup = async (req, res) => {

    try {

        const { fullName, email, password,role } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({

            fullName,
            email,
            password: hashedPassword,
            role

        });

        return res.status(201).json({

            success: true,
            message: "User Registered Successfully",
            data: newUser

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// ======================
// Login
// ======================

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {

            return res.status(400).json({

                success: false,
                message: "Invalid Password"

            });

        }

        const secret = process.env.JWT_SECRET || 'Login_JWT_Token';
        const expiresIn = process.env.JWT_EXPIRE || '7d';

        const token = jwt.sign(

            {
                id: user._id,
                email: user.email
            },

            secret,

            {
                expiresIn
            }

        );

        return res.status(200).json({

            success: true,
            message: "Login Successfully",

            token

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    signup,
    login

};