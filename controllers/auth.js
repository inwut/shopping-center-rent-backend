import bcrypt from "bcrypt";
import {Tenant, User} from "../models/user.js";
import createError from "http-errors";
import { generateToken } from "../utils/generateToken.js";

const cookieConfig = {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
}

export const signup = async (req, res) => {
    const { email, password, companyName, address, phone, requisites, contactPerson } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const tenant = new Tenant({
        email,
        password: hashedPassword,
        companyName,
        address,
        phone,
        requisites,
        contactPerson
    });

    await tenant.save();

    const token = generateToken(tenant._id, tenant.role);

    res.cookie("token", token, cookieConfig);

    res.status(201).json({
        user: {
            id: tenant._id,
            role: tenant.role
        }
    });
}


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(createError(401, "Invalid email or password"));
    }

    const token = generateToken(user._id, user.role);

    res.cookie("token", token, cookieConfig);

    res.status(200).json({
        user: {
            id: user._id,
            role: user.role
        }
    });
}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};