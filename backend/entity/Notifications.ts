import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,CreateDateColumn,UpdateDateColumn} from "typeorm"

@Entity()
export class Notifications extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string
    
    @Column()
    message: string

    @Column()
    issue_id: number

    @Column()
    counter_no: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}
