import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,ManyToOne,JoinColumn } from "typeorm"
import {User} from '../entity/User';
@Entity()
export class Issues extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ unique: true })
    issue_id!: string

    //@Column({ nullable: true })
    //u_email!: string

    @Column({ nullable: true })
    issue!: string

   // @Column({ nullable: true })
   // name!: string

    @Column({ nullable: true })
    email!: string

    //@Column({ nullable: true })
    //phone_no!: number

    @ManyToOne(() => User)
    @JoinColumn({ name: "u_email" })
    u_email!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "name" })
    name!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "phone_no" })
    phone_no!: string;

}
