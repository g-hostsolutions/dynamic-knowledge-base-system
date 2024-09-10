import { Entity, Column, Tree, TreeChildren, TreeParent } from 'typeorm'
import { CommonBaseEntity } from '../../../common/entity/commonBaseEntity.entity'
import { ITopic } from '../interface/topics.interface'

@Entity()
@Tree('closure-table')
export class TopicEntity extends CommonBaseEntity implements ITopic {
    @Column({ type: 'varchar', length: 50 })
    name: string

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'int', nullable: false, default: 1 })
    version: number

    @TreeChildren()
    children: TopicEntity[]

    @TreeParent()
    parent: TopicEntity

    add(child: TopicEntity): void {
        if (child) {
            this.children.push(child)
            child.parent = this
        }
    }

    remove(child: TopicEntity): void {
        this.children = this.children.filter(c => c.id !== child.id)
        if (child.parent === this) {
            child.parent = null
        }
    }

    getChildren(): TopicEntity[] {
        return this.children
    }
}
