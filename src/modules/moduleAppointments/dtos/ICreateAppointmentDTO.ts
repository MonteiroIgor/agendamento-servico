export default interface ICreateAppointmentDTO {
  date: Date;
  provider_id: string;
  service_id: string;
  service_name: string;
  advancePayment: boolean;
  advance_payment: number;
  remainder_payment: number;
  price: number;
  status: string;
  client_id: string;
  client_name: string;
}
