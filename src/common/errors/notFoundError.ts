export class NotFoundError extends Error {
    statusCode: number

    constructor(message: string = 'Not Found') {
        super(message)
        this.statusCode = 404
        this.name = 'NotFoundError'
    }
}
