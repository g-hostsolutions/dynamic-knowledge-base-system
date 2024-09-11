import { PickType } from '@nestjs/mapped-types'
import { body, ValidationChain, param } from 'express-validator'
import { TopicEntity } from '../entity/topics.entity'

export class UpdateTopicDTO extends PickType(TopicEntity, ['content']) {
    static validators(): ValidationChain[] {
        return [
            param('id').notEmpty().withMessage('id is required.'),
            body('content')
                .optional()
                .isString()
                .withMessage('Content must be a string.'),
        ]
    }
}
