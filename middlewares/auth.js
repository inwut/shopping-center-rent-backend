import passport from "passport";
import createError from "http-errors";

export const auth = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            if (info?.message === "jwt expired") {
                return next(createError(401, "Token expired, please log in again"));
            }
            return next(createError(401, "Invalid token, authentication failed"));
        }
        req.user = user;
        next();
    })(req, res, next);
};