import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from '../../product/entities/product.entity';
import { UserRole } from '../../../shared/enums';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ unique: true, nullable: false })
    password: string;

    @Column({ default: 0, nullable: false })
    deposit: number;

    @Column('enum', {
        enum: UserRole,
        nullable: false
    })
    role: UserRole;

    @OneToMany(() => Product, product => product.user)
    products: Product[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
