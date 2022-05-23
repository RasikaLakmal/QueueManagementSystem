import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,ManyToOne,JoinColumn,OneToOne,CreateDateColumn,UpdateDateColumn } from "typeorm"
import {User} from '../entity/User';
import {Counter} from '../entity/Counter';

export type UserRoleType = "waiting" | "inprogress" | "close"

@Entity()
export class Issues extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    issue_id:number

    //@Column({ nullable: true }
    //u_email!: string

    @Column({ nullable: true })
    issue: string

   // @Column({ nullable: true })
   // name!: string

    @Column({ nullable: true })
    email: string

    //@Column({ nullable: true })
    //phone_no!: number

    @ManyToOne(() => User)
    @JoinColumn({ name: "u_email" })
    u_email: User;

    @Column({ nullable: true })
    name: string;

    @Column({
        type: "enum",
        enum: ["waiting", "inprogress", "close"],
        default: "waiting"
    })
    status: UserRoleType[]

    @Column({ nullable: true })
    phone_no: number;

    @ManyToOne(() => Counter)
    @JoinColumn()
    counter_no: Counter;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}
