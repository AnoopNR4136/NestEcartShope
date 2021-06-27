import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
@Entity()
@Unique(['admin_username'])
export class Admin extends BaseEntity {
    @PrimaryGeneratedColumn()
    admin_id : number;

    @Column()
    admin_username : string;

    @Column()
    admin_password :string;
}
