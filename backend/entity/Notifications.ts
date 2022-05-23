import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,CreateDateColumn,UpdateDateColumn} from "typeorm"

@Entity()
export class Notifications extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string
    
    @Column()
    message: string

    @Column()
    calling_id: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}