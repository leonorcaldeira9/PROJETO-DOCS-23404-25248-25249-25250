const jwt = require('jsonwebtoken');

function authJWT(options = {}) {
    const {
        secret = 'volvosSaoBonitos-09-PeugeotsTambem-27-OpelTambem-20-naoTemPopo-13',
        algorithms = ['HS256'],
        audience,
        issuer,
        required = true,
    } = options;

    return (req, res, next) => {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            if (!required) return next();
            return res.status(401).json({ message: 'Missing token' });
        }

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({ message: 'Invalid token format' });
        }

        try {
            const decoded = jwt.verify(token, secret, {
                algorithms,
                audience,
                issuer,
            });

            req.user = decoded;

            return next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Expired token' });
            }

            if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: 'Invalid token' });
            }

            return res.status(403).json({ message: 'Unauthorized' });
        }
    };
}

module.exports = authJWT;