import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/user.js";

export const initPassport = (passport) => {
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.token]),
                secretOrKey: process.env.JWT_SECRET
            },
            async (jwt_payload, done) => {
                try {
                    const user = await User.findById(jwt_payload.id);
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                } catch (err) {
                    return done(err, false);
                }
            }
        )
    );
}
