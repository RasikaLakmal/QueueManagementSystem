import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

@Entity()
export class Counter_person extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    cp_email!: string

    @Column()
    password!: string

    @Column({ nullable: true })
    name!: string

    @Column({ nullable: true })
    counter_no!: string

    setPassword = (password: string) =>{
        return (this.password = bcrypt.hashSync(password, 8));
    };

  isValidPassword = (password: string) => { 
      return bcrypt.compareSync(password, this.password)
    }

    generateJWT = () => {
        return jwt.sign(
            {
                email: this.cp_email,
            },
            "SECRET",
            {expiresIn: "1h"}
        );
    };

}
