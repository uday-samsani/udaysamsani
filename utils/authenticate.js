const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.SecretKey);
                return user;
            } catch (error) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        } else
            throw new Error(
                "Authentication token must formatted as 'Bearer [token]"
            );
    } else throw new Error('Authentication header must be provided');
};
