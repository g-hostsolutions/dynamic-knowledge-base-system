import { Request, Response, NextFunction, RequestHandler } from 'express'
import { validationResult } from 'express-validator'
import { ValidatorError } from './validatorErrors.validator'

export class ClassValidator {
    static validateAndThrow(dtoClass: {
        validators: () => RequestHandler[]
    }): RequestHandler[] {
        return [
            ...dtoClass.validators(),
            (req: Request, _: Response, next: NextFunction) => {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    return next(new ValidatorError(errors.array()))
                }
                next()
            },
        ]
    }
}
