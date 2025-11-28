import jwt from 'jsonwebtoken';
export const checkUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(req.headers);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            status: 'error',
            data: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1]; // extracts only the token
    try {
        const decode = jwt.verify(token, 'secret');
        if (!decode) return res.status(401).json({
            status: 'error',
            data: "you are not authorized to perform this activity"
        })

        req.userId = decode.id;
        req.role = decode.role;


        next();
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            data: error.message
        })
    }
}

export const checkAdmin = (req, res, next) => {
    if (req.role === 'admin') return next();
    return res.status(401).json({
        status: 'error',
        data: "you are not authorized"
    })
}