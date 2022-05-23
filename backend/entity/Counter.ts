import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,ManyToOne,JoinColumn,OneToOne,CreateDateColumn,UpdateDateColumn } from "typeorm"
import {Issues} from '../entity/Issues';
import {Counter_person} from '../entity/Counter_person';

export type UserRoleType =  "active" | "close" 

@Entity()
export class Counter extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    counter_no: number

    @Column()
    calling_id: string

   // @Column()
   // issue_id!: string

   @ManyToOne(() => Counter_person)
   @JoinColumn()
   counter_person: Counter_person;

   @Column({
       type: "enum",
       enum: ["active", "close" ],
   })
   status: UserRoleType[]

    @Column()
    issue_idx: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}
