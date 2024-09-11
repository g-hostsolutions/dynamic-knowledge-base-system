import { PickType } from '@nestjs/mapped-types'
import { param } from 'express-validator'
import { TopicEntity } from '../../entity/topics.entity'

export class TopicSearchDTO extends PickType(TopicEntity, ['id']) {
    static validators() {
        return [param('id').notEmpty().withMessage('id is required.')]
    }
}
