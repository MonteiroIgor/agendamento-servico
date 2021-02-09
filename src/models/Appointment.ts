import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Client from './Client';
import Provider from './Provider';
import Services from './Services';
import User from './User';

@Entity('appointments')
class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamp with time zone')
    date: Date;

    @Column()
    client_id: string;

    @ManyToOne(() => Client)
    @JoinColumn({ name: 'client_id' })
    cliente: Client;

    @Column()
    client_name: string;

    @Column()
    provider_id: string;

    //Many users for one appointment
    @ManyToOne(() => Provider)
    @JoinColumn({ name: 'provider_id' })
    provider: Provider;

    @Column()
    service_id: string;

    @ManyToOne(() => Services)
    @JoinColumn({ name: 'service_id' })
    service: Services;

    @Column()
    service_name: string;

    @Column()
    advancePayment: boolean;

    @Column()
    price: number;

    @Column()
    advance_payment: number;

    @Column()
    remainder_payment: number;

    @Column()
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}

export default Appointment;
