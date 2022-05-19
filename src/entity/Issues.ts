import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,ManyToOne,JoinColumn,OneToOne } from "typeorm"
import {User} from '../entity/User';
import {Counter} from '../entity/Counter';

export type UserRoleType = "waiting" | "inprogress" | "close"

@Entity()
export class Issues extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    issue_id:string

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

    @ManyToOne(() => User)
    @JoinColumn({ name: "name" })
    name: User;

    @Column({
        type: "enum",
        enum: ["waiting", "inprogress", "close"],
        default: "waiting"
    })
    status: UserRoleType[]

    @ManyToOne(() => User)
    @JoinColumn({ name: "phone_no" })
    phone_no: User;

    @ManyToOne(() => Counter)
    @JoinColumn()
    counter_no: Counter;

}
