import { Request, Response } from 'express'
import { UserSearchUseCase } from '../useCases/search/users.search.useCases'

export class UserController {
    private readonly usersSearchUseCase: UserSearchUseCase

    constructor() {
        this.usersSearchUseCase = new UserSearchUseCase()
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.usersSearchUseCase.getAllusers()
            res.json(users)
        } catch (error) {
            res.status(500).json({
                message: error?.message ?? 'Error retrieving topic',
                error,
            })
        }
    }
}
