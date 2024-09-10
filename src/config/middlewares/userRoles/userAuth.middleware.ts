import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../../database/ormconfig'
import { UserEntity } from '../../../modules/users/entity/users.entity'
import { UserContext } from './user.context'

export const checkUserRoleMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userEmail = req.headers['useremail'] as string

        if (!userEmail) {
            return res
                .status(400)
                .json({ message: 'User email is required in headers' })
        }

        const userRepository = AppDataSource.getRepository(UserEntity)
        const user = await userRepository.findOne({ where: { email: userEmail } })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const userContext = new UserContext(user.role)

        req['userPermissions'] = {
            canCreate: userContext.canCreate(),
            canView: userContext.canView(),
            canEdit: userContext.canEdit(),
            canDelete: userContext.canDelete(),
        }

        next()
    } catch (error) {
        console.error('Error checking user role:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
