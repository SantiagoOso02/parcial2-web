import { Test, TestingModule } from '@nestjs/testing';
import { PacienteService } from './paciente.service';
import { Repository } from 'typeorm';
import { PacienteEntity } from './paciente.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

describe('PacienteService', () => {
  let service: PacienteService;
  let repository: Repository<PacienteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PacienteService],
    }).compile();

    service = module.get<PacienteService>(PacienteService);
    repository = module.get<Repository<PacienteEntity>>(
      getRepositoryToken(PacienteEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new patient', async () => {
    const paciente: PacienteEntity = {
      id: '',
      nombre: faker.company.name(),
      genero: faker.person.gender(),
      medicos: [],
      diagnosticos: [],
    };

    const newPaciente: PacienteEntity = await service.create(paciente);
    expect(newPaciente).not.toBeNull();

    const storedPaciente: PacienteEntity = await repository.findOne({
      where: { id: newPaciente.id },
    });
    expect(storedPaciente).not.toBeNull();
    expect(storedPaciente.nombre).toEqual(newPaciente.nombre);
    expect(storedPaciente.genero).toEqual(newPaciente.genero);
  });

  it('create should throw an exception when the patient name is shorter than 3 characters', async () => {
    const paciente: PacienteEntity = {
      id: '',
      nombre: 'AB', // Nombre con menos de 3 caracteres
      genero: faker.person.gender(),
      medicos: [],
      diagnosticos: [],
    };

    await expect(service.create(paciente)).rejects.toHaveProperty(
      'message',
      'The patient name is shorter than 3 characters',
    );
  });
});
