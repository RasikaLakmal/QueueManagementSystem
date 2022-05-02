import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Counter extends BaseEntity {

    @PrimaryGeneratedColumn()
    counter_id!: number

    @Column()
    counter_no!: string

    @Column()
    calling_id!: string

    @Column()
    issue_id!: string

}
