import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';


interface IRequest {
  provider_id: string;
  month: number;
  year: number;
};

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ){}

  public async execute({
     provider_id,
     year,
     month
    }: IRequest): Promise<IResponse> {
    const appoinments = await this.appointmentsRepository.findAllInMonthFromProviders({
      provider_id,
      year,
      month,
    },
  );

    const numberOfDaysInMonth = getDaysInMonth( new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index +1,
    );

    const availability = eachDayArray.map(day => {
      const appoinmentsInDay = appoinments.filter(appoinment => {
        return getDate(appoinment.date) === day
      });

        return {
          day,
          available: appoinmentsInDay.length < 10,
        }
    })



    return availability;
  }

}

export default ListProviderMonthAvailabilityService;
