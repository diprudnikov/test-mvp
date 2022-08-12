import { User } from 'src/modules/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    productName: string;

    @Column({ nullable: false })
    amountAvailable: number;

    @Column({ nullable: false })
    cost: number;

    @ManyToOne(() => User, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false,
    })
    @JoinColumn([{ name: 'user_id' }, { name: 'id' }])
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
