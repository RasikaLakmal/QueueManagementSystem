import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,CreateDateColumn,UpdateDateColumn } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    u_email: string

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

    setPassword = (password: string) =>{
        return (this.password = bcrypt.hashSync(password, 8));
    };

  isValidPassword = (password: string) => { 
      return bcrypt.compareSync(password, this.password)
    }

   


}