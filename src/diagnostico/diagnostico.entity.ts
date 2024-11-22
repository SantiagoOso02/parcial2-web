import { PacienteEntity } from '../paciente/paciente.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('diagnostico')
export class DiagnosticoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @ManyToMany(() => PacienteEntity, (paciente) => paciente.diagnosticos)
  pacientes: PacienteEntity[];
}
