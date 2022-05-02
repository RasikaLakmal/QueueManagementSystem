import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    u_email!: string

    @Column()
    password!: string

    @Column()
    name!: string

    @Column()
    phone_no!: number

}
