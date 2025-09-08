import { body, query } from "express-validator";

export const createTradePointValidator = [
    body("floor")
        .isInt({ min: 1 })
        .withMessage("Floor must be a positive integer"),
    body("area")
        .isFloat({ min: 1 })
        .withMessage("Area must be a positive number"),
    body("hasConditioner")
        .isBoolean()
        .withMessage("hasConditioner must be true or false"),
    body("dailyPrice")
        .isFloat({ min: 1 })
        .withMessage("Daily price must be a positive number")
];

export const updateTradePointValidator = [
    body("floor")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Floor must be a positive integer"),
    body("area")
        .optional()
        .isFloat({ min: 1 })
        .withMessage("Area must be a positive number"),
    body("hasConditioner")
        .optional()
        .isBoolean()
        .withMessage("hasConditioner must be true or false"),
    body("dailyPrice")
        .optional()
        .isFloat({ min: 1 })
        .withMessage("Daily price must be a positive number")
];

export const getAllTradePointsValidator = [
    query("floor")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Floor must be a positive integer"),
    query("minArea")
        .optional()
        .isFloat({ min: 1 })
        .withMessage("minArea must be a positive number"),
    query("maxArea")
        .optional()
        .isFloat({ min: 1 })
        .withMessage("maxArea must be a positive number"),
    query("hasConditioner")
        .optional()
        .isBoolean()
        .withMessage("hasConditioner must be true or false"),
    query("minPrice")
        .optional()
        .isFloat({ min: 1 })
        .withMessage("minPrice must be a positive number"),
    query("maxPrice")
        .optional()
        .isFloat({ min: 1 })
        .withMessage("maxPrice must be a positive number")
];
