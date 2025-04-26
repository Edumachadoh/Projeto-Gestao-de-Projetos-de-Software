
# Utilização
## Como rodar
### Backend
```bash
1. Clone o repositório:
   git clone https://github.com/Edumachadoh/Projeto-Gestao-de-Projetos-de-Software.git

2. Navegue até o diretório do projeto:
   cd projeto-zizo

3. Restaure as dependências:
   dotnet restore

4. Atualize a string de conexão com o banco de dados no arquivo `appsettings.json`.

5. Execute as migrações do banco de dados:
   dotnet ef database update

6. Execute o projeto:
   dotnet run
```
### Front-end
```bash
	(em breve)
```

# Backend
### Linguagem utilizada
C#
### Framework utilizado
ASP.NET Core 8.0
### Exemplos de models
{
  "Id": 1,
  "Nome": "Nome do Personagem",
  "Tipo": "Tipo do Personagem"
}
#### Usuario:
``` json
{
  "CpfCliente": "12345678900",
  "NomeCliente": "Nome do Cliente",
  "MetodoPagamentoCliente": "Cartão de Crédito"
}
```
#### Denuncia:
``` json
{
  "NumeroPedido": 123,
  "CpfCliente": "12345678900",
  "Itens": {
    "IdItem": 1,
    "NomeItem": "Item Exemplo",
    "DescricaoItem": "Descrição do Item"
  },
  "ValorPedido": 50.00
}
```

### Dar um exemplo de logs
{
  "level": "Information",
  "timestamp": "2025-04-26T12:00:00Z",
  "message": "Pedido de número 123 foi criado com sucesso.",
  "logType": "Database"
}
### Testes
(em breve)

# Front-end
### Linguagem utilizada
(em breve)
### Bibliotecas utilizadas
(em breve)
### Responsividade
(em breve)

# Funcionalidades
### Objetivo do projeto
O objetivo do projeto é criar um sistema de gestão de pedidos de clientes, controle de estoque e de funcionários, além de possibilitar o rastreamento de gastos da empresa.
### Funcionalidades:
- Cadastro de personagens

  Cadastro de clientes

  Registro de pedidos de clientes
- [x] (em breve)


