import { body } from "express-validator";

export const createApplicationValidator = [
    body("tradePoint")
        .isMongoId()
        .withMessage("Invalid trade point ID"),
    body("startDate")
        .trim()
        .notEmpty()
        .withMessage("Start date is required")
        .isISO8601()
        .withMessage("Invalid start date")
        .custom((value) => {
            if (new Date(value) < new Date()) {
                throw new Error("Start date must be after current date");
            }
            return true;
        }),
    body("endDate")
        .notEmpty()
        .withMessage("End date is required")
        .isISO8601()
        .withMessage("End date must be a valid date")
        .custom((value, { req }) => {
            if (new Date(value) < new Date(req.body.startDate)) {
                throw new Error("End date must be after start date");
            }
            return true;
        }),
];
