import { body } from 'express-validator'
import { TopicEntity } from '../entity/topics.entity'

export class CreateTopicDTO extends TopicEntity {
    static validators() {
        return [
            body('name')
                .isString()
                .withMessage('Name must be a string.')
                .notEmpty()
                .withMessage('Name is required.'),

            body('content')
                .isString()
                .withMessage('Content must be a string.')
                .notEmpty()
                .withMessage('Content is required.'),

            body('version')
                .optional()
                .isInt({ min: 1 })
                .withMessage('Version must be a positive integer.'),

            body('parentTopicId')
                .optional()
                .isInt({ min: 1 })
                .withMessage('Parent Topic ID must be a positive integer.'),
        ]
    }
}
