import { query } from 'express-validator'

export class TopicPathFinderDTO {
    static validators() {
        return [
            query('sourceId')
                .isInt({ gt: 0 })
                .withMessage('sourceId must be a positive integer'),
            query('targetId')
                .isInt({ gt: 0 })
                .withMessage('targetId must be a positive integer'),
        ]
    }
}
