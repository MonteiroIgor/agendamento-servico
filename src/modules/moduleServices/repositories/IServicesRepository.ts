import Services from '../infra/typeorm/entities/Services';
import ICreateServiceDTO from '../dtos/ICreateServiceDTO';

export default interface IServicesRepository {
  findServices(): Promise<Services[]>;

  create(data: ICreateServiceDTO): Promise<Services>;

  findByName(name: string): Promise<Services | undefined>;
}
