### agendamento-servico ###


# Cadastro de Serviço

**RF**

- Usuário deve poder cadastrar e precificar serviço;
- Usuário deve poder excluir serviço;
- Usuário deve poder editar dados do serviço;

**RNF**

**RN**

- Serviço deve ser cadastrado, excluido e alterado apenas pelo usuário ADM

# Cadastro do Prestador

**RF**

- Usuário deve poder cadastrar prestadores de serviço; OK
- Usuário deve poder excluir cadastro de prestadores de serviço; OK
- Usuário deve poder atualizar dados dos prestadores de serviço; OK

**RNF**

**RN**

- Cadastro de prestador de serviço deve ser feito apenas por usuário ADM;
- Exclusão de prestador de serviço deve ser feito apenas por usuário ADM;
- Atualização de dados de prestador de serviço deve ser feito apenas por usuário ADM;


# Recuperação de Senha

**RF**

- Usuário deve poder recuperar sua senha informando o seu e-mail; OK
- Usuário deve receber seu e-mail com instruções de recuperçãoç de senha; OK
- Usuário deve poder resetar sua senha; OK

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- Link enviado por email para resetar senha, deve expirar em 2h;
- Usuário precisa confirmar a nova senha ao resetar sua senha;

# Cadastro e Atualização de Cliente

**RF**

- Usuário deve poder cadastrar cliente;
- Usuário deve poder excluir cadastro de cliente;
- Usuário deve poder cadastrar e atualizar dados do cliente;

**RN**

- Cliente não pode alterar seu email para um email já utilizado por outro cliente;


# Painel do Prestador

**RF**

- Usuário deve poder listar todos agendamentos de um dia; OK
- Usuário deve poder listar todos agendamentos de um mês; OK
- Usuário deve poder listar todos agendamentos de um período que ele escolher;
- Deve ser exibida uma notificação sempre que houver um novo agendamento;
- Usuário deve poder vizualizar todas as notificações não lidas;
- Usuário deve poder listar quantos agendamentos foram feitos para determinado barbeiro;
- Usuário deve poder listar todos agendamentos de serviços por status(A: Ativo, F: Finalizado, C: Cancelado);

**RNF**

- Os agendamento no dia dever ser armazenado em cachê;
- As notificações devem ser armazenadas no MongoDB;
- As notificações devem ser enviadas em real-time utilizando Socket.io;

**RN**

# Agendamento de serviços

**RF**

- Usuário deve poder listar todos prestadores de serviço cadastrados; OK
- Usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador; OK
- Usuário deve poder listar horários disponíveis em um dia específico de um prestador; OK
- Usuário deve poder realizar

**RNF**

- Listagem de prestadores deve ser armazenada em cache;


**RN**

- Cada agendamento deve durar 1h exatamente; OK
- Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro ás 8h, último ás 17h); OK
- Cliente não pode agendar em um horário já oculpado; OK
- Cliente não pode agendar em um horário que já passou; Ok
- Cliente não pode agendar serviçõs consigo mesmo; Ok
- Cliente deve cancelar agendamento com no mínimo 30 minutos de antecedência;
- Cliente só poderá agendar serviço com no mínimo 1h de antecedência para o horário desejado; OK




