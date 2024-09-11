import { Request, Response, NextFunction } from 'express'
import { UserPermissions } from './strat/interface/user.strat.interface'

export class CheckUserPermissionMiddleware {
    public static checkPermissions(requiredPermissions: UserPermissions) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const userPermissions = req['userPermissions'] as UserPermissions

                if (!userPermissions) {
                    return res
                        .status(403)
                        .json({ message: 'User permissions not found' })
                }

                for (const [permission, required] of Object.entries(
                    requiredPermissions,
                )) {
                    if (required && !userPermissions[permission]) {
                        return res.status(403).json({
                            message: `User does not have ${permission} permission`,
                        })
                    }
                }

                next()
            } catch (error) {
                console.error('Error checking user permissions:', error)
                return res.status(500).json({ message: 'Internal server error' })
            }
        }
    }
}
