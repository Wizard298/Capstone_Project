import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);

        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        };

        req.id = decode.userId;

        // Set the full user object on req.user
        // req.user = {
        //     _id: decode.userId,
        //     // Include any other user fields you store in the token
        //     ...decode
        // };

        // console.log('Authenticated user:', req.user._id); // Debug log

        next();
    }
    catch (error) {
        console.log("Authentication error:", error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false,
            error: error.message
        });
    }
}

export default isAuthenticated;