import { ValidationError } from 'express-validator'

export class HttpError extends Error {
    statusCode: number

    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
    }
}

export class ValidatorError extends HttpError {
    errors: ValidationError[]

    constructor(errors: ValidationError[]) {
        super(400, 'Bad Request')
        this.errors = errors
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            errors: this.errors.map(error => {
                return {
                    param: error['param'] || null,
                    msg: error.msg || null,
                    location: error['location'] || null,
                    value: error['value'] !== undefined ? error['value'] : null,
                }
            }),
        }
    }
}
