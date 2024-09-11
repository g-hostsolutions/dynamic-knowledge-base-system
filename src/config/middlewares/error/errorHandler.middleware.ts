import { Request, Response, NextFunction } from 'express'
import {
    HttpError,
    ValidatorError,
} from '../../../common/validator/validatorErrors.validator'

export class ErrorHandler {
    public static handle(
        err: Error,
        req: Request,
        res: Response,
        _: NextFunction,
    ): void {
        if (err instanceof ValidatorError) {
            res.status(err.statusCode).json(err.toJSON())
        } else if (err instanceof HttpError) {
            res.status(err.statusCode).json({
                statusCode: err.statusCode,
                message: err.message,
            })
        } else {
            res.status(500).json({
                statusCode: 500,
                message: 'Internal Server Error',
            })
        }
    }
}
