import jwt from "jsonwebtoken";
const executePolicies = () => {
    return (req, res, next) => {
        const token = req.cookies[process.env.JWT_COOKIE];
        if (!token) return res.send({ status: 1, message: 'Sin autorización de nada.' });
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
            return next();
        }
        catch (error) {
            res.clearCookie(process.env.JWT_COOKIE).status(401).send({ status: 1, message: 'Sin autorización de nada desde catch' })
        }
    };
};

export default executePolicies;