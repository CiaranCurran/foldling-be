import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany } from 'typeorm'
import { Chapter } from './chapter'

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn('varchar', { length: 255 })
    username: string

    @OneToMany(() => Chapter, (chapter) => chapter.user)
    chapters: Chapter[]
}
