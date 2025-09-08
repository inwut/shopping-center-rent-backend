import { body } from "express-validator";

export const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

export const signupValidator = [
    body("companyName")
        .trim()
        .notEmpty()
        .withMessage("Company name is required"),
    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required"),
    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .matches(/^\+380\d{9}$/)
        .withMessage("Phone must be in +380XXXXXXXXX format"),
    body("requisites")
        .trim()
        .notEmpty()
        .withMessage("Requisites are required"),
    body("contactPerson")
        .trim()
        .notEmpty()
        .withMessage("Contact person is required"),
    ...loginValidator
];
