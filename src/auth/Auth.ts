import jwt from "jsonwebtoken";

const generateAccessToken = (user: any) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "365d" })
}

// refreshTokens
let refreshTokens = []

const generateRefreshToken = (user: any) => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "365d" })
    refreshTokens.push(refreshToken)
    return refreshToken
}


const isAuthenticated = (req: any, res: any, next: any) => {
    const token = req.headers["authorization"]?.replace("Bearer ", '');

    if (!token) {
        return res.json({
            status: false,
            isExpire:true,
            message: 'A token is required for authentication'
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        console.log("")
        if (err) {
            res.json({
                status: false,
                isExpire:true,
                message: 'Invalid token!'
            })
        }
        else {
            req.user = user
            next() //proceed to the next action in the calling function
        }
    }) //end of jwt.verify()
} //end of function


export default { isAuthenticated, generateAccessToken, generateRefreshToken };
