import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Issues extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ unique: true })
    issue_id!: string

    @Column()
    u_email!: string

    @Column()
    issue!: string

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    phone_no!: number

}
