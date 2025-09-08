import { param } from "express-validator";

export const idValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid application ID")
];