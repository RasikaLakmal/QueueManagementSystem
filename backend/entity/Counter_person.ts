import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,ManyToOne,JoinColumn ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import * as bcrypt from "bcryptjs";
import {Counter} from '../entity/Counter';

@Entity()
export class Counter_person extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    cp_email: string

    @Column()
    password: string

    @Column({ nullable: true })
    name: string

    @Column({ nullable: true })
    phone_no: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

   // @Column({ nullable: true })
    //counter_no!: string

   /* @ManyToOne(() => Counter)
    @JoinColumn({ name: "counter_no" })
    counter_no!: string;*/

    setPassword = (password: string) =>{
        return (this.password = bcrypt.hashSync(password, 8));
    };

  isValidPassword = (password: string) => { 
      return bcrypt.compareSync(password, this.password)
    }


}
