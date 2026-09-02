const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_STR || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjIxYTRiODljN2QwMTIzNDU2Nzg5MCIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIwMDAwMDAwLCJleHAiOjE3MjA2MDQ4MDB9.x-m-GSoYqThZpUpJ2kC0A9XpD8o5w5-0zM3q5A2W5fU';


/**
 * Generated a signed JWT token string
 * @param {object} user - The Mongoose user
 * @return {string} Signed JWT Token   
 */
exports.generateToken = async (user) => {
    const userPayload = {
        id: user._id,
        email: user.email
    };

    const token = await jwt.sign(userPayload, JWT_SECRET, {
        expiresIn: process.env.EXP_DATE || '7d'
    });

    return token;
};

