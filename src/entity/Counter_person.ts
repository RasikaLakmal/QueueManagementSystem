import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Counter_person extends BaseEntity {

    @PrimaryGeneratedColumn()
    cp_email!: string

    @Column()
    password!: string

    @Column()
    name!: string

    @Column()
    counter_no!: string

}
