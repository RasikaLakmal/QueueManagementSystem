import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,ManyToOne,JoinColumn } from "typeorm"
import {Issues} from '../entity/Issues';

@Entity()
export class Counter extends BaseEntity {

    @PrimaryGeneratedColumn()
    counter_id!: number

    @Column()
    counter_no!: string

    @Column()
    calling_id!: string

   // @Column()
   // issue_id!: string

    @ManyToOne(() => Issues)
    @JoinColumn({ name: "issue_id" })
    issue_id!: string;

}
