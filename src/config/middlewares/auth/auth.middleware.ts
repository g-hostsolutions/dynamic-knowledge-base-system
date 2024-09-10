import { Request, Response, NextFunction } from 'express'

const validateToken = (token: string): boolean => {
    return token === '4f6b3d0e9c5f8a7e2d1a9b4c5e7f8d9a'
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Token missing' })
    }

    if (!validateToken(token)) {
        return res.status(403).json({ message: 'Token invalid' })
    }

    next()
}
