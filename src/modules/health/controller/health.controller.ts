import { Request, Response } from 'express'
import { AppDataSource } from '../../../config/database/ormconfig'

export class HealthController {
    public async checkHealth(req: Request, res: Response): Promise<void> {
        try {
            if (AppDataSource.isInitialized) {
                res.status(200).json({ status: 'UP' })
            } else {
                res.status(500).json({
                    status: 'DOWN',
                    message: 'Database not initialized',
                })
            }
        } catch (error) {
            res.status(500).json({
                status: 'DOWN',
                message: 'Error checking health',
                error,
            })
        }
    }
}
