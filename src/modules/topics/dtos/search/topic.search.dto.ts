import { PickType } from '@nestjs/mapped-types'
import { param } from 'express-validator'
import { TopicEntity } from '../../entity/topics.entity'

export class TopicSearchDTO extends PickType(TopicEntity, ['id']) {
    static validators() {
        return [
            param('id')
                .isNumeric()
                .withMessage('param id needs to be numeric.')
                .notEmpty()
                .withMessage('id is required.'),
        ]
    }
}
