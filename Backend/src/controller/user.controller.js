const { userModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require("../utils/jwt.util");

/**
 * API- '/api/user/signup'
 * @requires { name, password, email, gender }
 */
exports.signupUser = async (req, res) => {
    try {
        const { name, password, email, gender } = req.body;

        // 1. Validate required fields
        if (!name || !password || !email || !gender) {
            return res.status(400).json({
                success: false,
                message: 'All fields (name, email, password, gender) are required.',
            });
        }

        // 2. Check if user already exists (case-insensitive email check)
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await userModel.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists.',
            });
        }
        // 3. Save user to database
        const newUser = await userModel.create({
            name: name.trim(),
            email: normalizedEmail,
            password: password,
            gender
        });
        // create a token 
        const token = await util.generateToken(newUser);

        // 4. Return success response 
        return res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
        });
    } catch (error) {
        // Internal server errors
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * API - 'api/user/login'
 * @requires { password ,email }
 */
exports.loginUser = async (req, res) => {
    const normalizedEmail = (req.body.email || '').trim().toLowerCase();
    const { password } = req.body;

    try {
        if (!normalizedEmail || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields required'
            });
        }

        const userFound = await userModel.findOne({ email: normalizedEmail });

        if (!userFound) {
            return res.status(401).json({
                success: false,
                message: 'Email and password are incorrect'
            });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Email and password are incorrect'
            });
        }

        const userDetails = await userModel.findOne({ email: normalizedEmail }).select('-password');
        const token = await util.generateToken(userFound);

        return res.status(200).json({
            success: true,
            message: 'user login successfully',
            userDetails,
            token
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};