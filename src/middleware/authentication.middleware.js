import Token from "../DB/models/token.model.js";
import User from "../DB/models/user.model.js";
import { verifyToken } from "../utils/token/token.js";


const isAuthenticated = async (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization || !authorization.startsWith("Bearer")) {
        return next(new Error("Token required", {cause: 403}));
    }

    const token = authorization.split(" ")[1];

    const tokenDoc = await Token.findOne({ accessToken: token });
    if (!tokenDoc) {
        return next(new Error("Token has been revoked", { cause: 401 }));
    }

    const {userId} = verifyToken({token});
    const user = await User.findById(userId);
    if(!user) {
        return next(new Error("User not found", {cause: 404}));
    }

    req.user = user;
    return next();
}


export default isAuthenticated;