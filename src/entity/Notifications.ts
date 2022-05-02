import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Notifications extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: string
    
    @Column()
    message!: string

    @Column()
    calling_id!: string

}
