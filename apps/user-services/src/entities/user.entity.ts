import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ValidRoles } from "../interfaces";


@Entity()
export class User {

@PrimaryGeneratedColumn('uuid')
id: string;


@Column({unique: true})
email: string;

@Column()
password: string;

@Column({type: 'enum', enum: ValidRoles, default: ValidRoles.USER})
role: ValidRoles;

@CreateDateColumn()
createdAt: Date;

//@OneToMany(() => Product, (product) => product.user)
//products: Prodcut[];


}