// import AppError from '../../../shared/errors/AppError';

// import FakeProvidersRepository from '../repositories/fakes/FakeProvidersRepository';
// import ListProvidersService from '../services/ListProvidersService';
// import providerRouter from '../../../modules/moduleProviders/infra/http/routes/providers.routes';

// let fakeProvidersRepository: FakeProvidersRepository;
// let listProviders: ListProvidersService;

// describe('List Providers', () => {
//   beforeEach(() => {
//     fakeProvidersRepository = new FakeProvidersRepository();


//     listProviders = new ListProvidersService(fakeProvidersRepository);

//   });
//   it('should be able to lis the providers', async () => {
//     const provider1 = await fakeProvidersRepository.create({
//       name:"name test 1",
//       cpf:"10713326433",
//       email:"test1@mail.com",
//       phone:"99966556",
//       dtBirth: new Date("1995-03-02"),
//     });

//     const provider2 = await fakeProvidersRepository.create({
//       name:"name test 5",
//       cpf:"10653389962",
//       email:"test5@mail.com",
//       phone:"997775887",
//       dtBirth: new Date("2000-03-02"),

//     });

//     const loggedProvider = await fakeProvidersRepository.create({
//       name:"name test 2",
//       cpf:"08675504497",
//       email:"test3@mail.com",
//       phone:"88888888",
//       dtBirth: new Date("1991-12-02"),

//     });

//     const providers = await listProviders.execute({
//      except_provider_id: loggedProvider.id,
//     });


//    expect(providers).toStrictEqual([provider1,provider2]);

//   });


// });
