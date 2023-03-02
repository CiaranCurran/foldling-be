import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne } from 'typeorm'
import { User } from './user'

@Entity()
export class Chapter extends BaseEntity {
    //primary column as integer
    @PrimaryColumn('int')
    chapter: number

    @ManyToOne(() => User, (user) => user.chapters)
    user: User

    // Column that holds a text file
    @Column('text')
    text: string

    // Column that holds a json file
    @Column('json')
    json: string
}
