
# Utilização
### Lugar hospedado
A hospedagem do site é feita no `Versel` que é uma plataforma para os desenvolvedores hospedar seus websites e essa hospedagem é feita na nuvem da plataforma.
## Como rodar
### Backend
```bash


	# Entre na pasta da api “API”
	cd API

	# Rodar a API
	dotnet run
```
### Front-end
```bash
	# Entre na pasta do projeto “app-projeto-denuncias” 
	cd app-projeto-denuncias

    # Instalar as dependências
	npm i

    # Rodar o projeto
	npm start
```

# Backend
### Linguagem utilizada
Para o backend, utilizei o `C#`.
### Framework utilizado
Como sistema de gerenciamento de banco de dados utilizei o `SQLite` juntamente com a biblioteca `Microsoft.EntityFrameworkCore.Sqlite`. Isso permitiu a integração do SQLite com EF Core, facilitando a manipulação de dados sem escrever SQL diretamente. O SQLite é útil para aplicações leves e portáteis, como apps desktop e mobile 
### Exemplos de models
As principais classes models são… 
#### Usuario:
``` json
{

    "id": 1,
    "nome": "Eduardo MAchaod",
    "cpf": "222-222-222.21",
    "tipo": 1,
    "email": "eduardo@gmail.com",
    "senha": "eduardo123"
  },
  {
```
#### Denuncia:
``` json
{

    "id": 1,
    "nome": "Queimada senhor de 40 anos",
    "descricao": "Observei homem de 40 anos jogando cigarro e causando incendio na floresta",
    "status": 1,
    "rua": "Joao Goulard, 215",
    "bairro": "Capoeira",
    "cidade": "São Paulo",
    "dataHora": "0001-01-01T00:00:00",
    "categoriaDenunciaId": 1,
    "categoriaDenuncia": null,
    "usuarioId": 1,
    "usuario": null
  },
}
```

### Dar um exemplo de logs
(em breve)
### Testes
(em breve)

# Front-end
### Linguagem utilizada
As linguagens que eu escolhi foram o `JavaScript` e o `TypeScript`.
### Bibliotecas utilizadas
A biblioteca utilizada foi o `React`, ele adota uma abordagem baseada em componentes reutilizáveis, permitindo o desenvolvimento modular e organizado. Foi utilizado ferramentas também como React Router para navegação e ApexCharts para elaboração de gráficos.
### Responsividade
(em breve)

# Funcionalidades
### Objetivo do projeto
O projeto consiste em um sistema no qual o usuário comum realiza uma denúncia de desmatamento ambiental. Existe também outro usuário, o usuário Administrador que tem acesso às denúncias dos usuários, e então pode mudar o status da ação que será feita sobre ela e também ele tem um painel com gráficos dos dados das denúncias que o auxiliam na tomada de decisão desse gestor.
### Funcionalidades:
- [ ] Login inicial para o usuário entrar no sistema
- [x] Cadastro de usuário
- [x] Usuário faz um cadastro solicitando suas informações.
- [ ] Verificação de login
- [x] Verificar login do usuário
- [ ] Esquecimento de senha (em breve)
- [ ] Usuário pode recuperar seu login por meio de recebimento de email
- [x] Analise de dados
- [ ] Painel para o gestor analisar as informações e dados sobre denúncias e usuários.
- [ ] Extração de dados do painel de análise de dados.
- [ ] Crud de denuncia
- [x] O usuário pode cadastrar uma denúncia 
- [ ] gestor pode deletar, editar e ler denúncias.


