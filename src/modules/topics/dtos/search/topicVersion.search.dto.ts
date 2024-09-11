import { PickType } from '@nestjs/mapped-types'
import { query } from 'express-validator'
import { TopicEntity } from '../../entity/topics.entity'

export class TopicVersionSearchDTO extends PickType(TopicEntity, [
    'name',
    'version',
]) {
    static validators() {
        return [
            query('name').notEmpty().withMessage('name is required.'),
            query('version')
                .optional()
                .isNumeric()
                .withMessage('version needs to be Numeric'),
        ]
    }
}
