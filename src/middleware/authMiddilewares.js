import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ error: 'Access Denied. No token provided.' });
        }

        const tokenParts = token.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({ error: 'Invalid token format. Use "Bearer <token>"' });
        }

        const verified = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

export default authenticate;
