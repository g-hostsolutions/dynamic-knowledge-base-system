import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { CommonBaseEntity } from '../../../common/entity/commonBaseEntity.entity'
import { ITopic } from '../interface/topics.interface'

@Entity()
export class TopicEntity extends CommonBaseEntity implements ITopic {
    @Column({ type: 'varchar', length: 50 })
    name: string

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'int', nullable: false, default: 1 })
    version: number

    @Column({ type: 'int', nullable: true })
    parentTopicId: number

    @ManyToOne(() => TopicEntity, topic => topic.children, { nullable: true })
    @JoinColumn({ name: 'parentTopicId' })
    parent: TopicEntity

    @OneToMany(() => TopicEntity, topic => topic.parent)
    children: TopicEntity[]

    add(child: TopicEntity): void {
        if (child) {
            this.children.push(child)
            child.parent = this
            child.parentTopicId = this.id
        }
    }

    remove(child: TopicEntity): void {
        this.children = this.children.filter(c => c.id !== child.id)
        if (child.parent === this) {
            child.parent = null
            child.parentTopicId = null
        }
    }

    getChildren(): TopicEntity[] {
        return this.children
    }
}
