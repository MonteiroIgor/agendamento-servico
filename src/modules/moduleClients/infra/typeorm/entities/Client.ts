import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('client')
class Client {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:  string;

    @Column('date')
    dtBirth: Date;

    @Column()
    cpf: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    credit: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Client;
