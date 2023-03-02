import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToOne,
} from 'typeorm'
import { User } from './user'

@Entity()
export class Word extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 255 })
    word: string

    @Column('varchar', { length: 255 })
    user: string

    @Column('bool')
    known: boolean

    @Column('bool')
    ignore: boolean

    @Column('bool')
    learning: boolean

    @Column('int')
    impressions: number
}
