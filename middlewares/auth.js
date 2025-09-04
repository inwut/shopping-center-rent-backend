import passport from "passport";
import createError from "http-errors";

export const auth = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return next(
                createError( 401, info?.message === "jwt expired"
                    ? "Token expired, please log in again"
                    : "Invalid token, authentication failed"
                )
            );
        }

        req.user = user;
        next();
    })(req, res, next);
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(createError(401, "Not authenticated"));
        }

        if (!roles.includes(req.user.role)) {
            return next(createError(403, "You don't have permission to perform this action"));
        }

        next();
    };
};
