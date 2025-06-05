# Sistema Restaurante do Tío ZIZO

Sistema para gerenciamento de restaurantes, com funcionalidades que abrangem desde o cadastro de clientes e funcionários até o controle de pedidos, estoque e finanças.

## Tecnologias Utilizadas

### Objetivo do Projeto
Desenvolver um sistema integrado que permita:
- Gestão de pedidos de clientes
- Controle de estoque e produtos
- Cadastro de clientes e funcionários
- Rastreamento de gastos e geração de relatórios financeiros

### Estrutura do Projeto

SistemaRestaurante/
├── API/                       # Projeto back-end (.NET)
│   ├── Context/              # Contexto do banco de dados (AppDbContext.cs)
│   ├── Controllers/          # Controladores da API (Cliente, Pedido, Produto, etc.)
│   ├── Data/                 # Dados de seed e inicialização
│   ├── Enums/                # Enumerações (Cargos, Categorias, Status de Preparo, etc.)
│   ├── Migrations/           # Migrações do Entity Framework
│   ├── Models/
│   │   ├── Financeiro/       # Modelos financeiros (Gasto, RegistroFinanceiro, etc.)
│   │   └── Pessoa/           # Modelos relacionados a pessoas (Cliente, Funcionário, Produto, etc.)
│   ├── Properties/           # Configurações do projeto (launchSettings.json)
│   ├── Requests/             # Testes HTTP (Requisições para Postman/Insomnia)
│   ├── Program.cs            # Ponto de entrada da aplicação
│   ├── appsettings.json      # Configurações de conexão com banco e app
│   └── SistemaRestaurante.csproj
│
├── sistema-zizo/             # Projeto front-end (React + Vite + TypeScript)
│   ├── src/
│   │   ├── assets/           # Logos e imagens
│   │   ├── components/       # Componentes reutilizáveis (Cliente, Pedido, Financeiro, etc.)
│   │   ├── css/              # Estilização global e temas
│   │   ├── models/           # Interfaces e enums TypeScript
│   │   ├── routes/pages/     # Páginas da aplicação (Home, Cadastro, Relatórios, etc.)
│   │   ├── util/             # Funções utilitárias e helpers
│   │   ├── App.tsx           # Componente principal da aplicação
│   │   └── main.tsx          # Ponto de entrada do front-end
│   ├── index.html
│   ├── package.json          # Dependências e scripts do projeto
│   └── vite.config.ts        # Configurações do Vite
│
├── README.md                 # Este arquivo
└── .gitignore                # Arquivos ignorados pelo Git

### Como Rodar o Projeto

#### Backend – ASP.NET Core 8.0

**Tecnologias utilizadas:**
- Linguagem C#
- Framework ASP.NET Core 8.0
- ORM Entity Framework Core para acesso e migração do banco de dados
- Banco de dados relacional (configurável via string de conexão)
- JSON para configuração e comunicação HTTP (API REST)

**Passos para rodar:**

Clone o repositório:

```
git clone https://github.com/Edumachadoh/Projeto-Gestao-de-Projetos-de-Software.git
```

Acesse a pasta do backend:

```
cd API
```

Restaure as dependências:

```
dotnet restore
```

Atualize a string de conexão no arquivo `appsettings.json` conforme seu banco de dados.

Aplique as migrações para criar o banco e as tabelas:

```
dotnet ef database update
```

Execute a aplicação:

```
dotnet run
```

#### Frontend – React + TypeScript + Vite

**Tecnologias utilizadas:**
- React para construção da interface
- TypeScript para tipagem estática
- Vite como bundler e servidor de desenvolvimento
- CSS customizado para estilos
- React Router DOM para navegação entre páginas
- Chart.js para gráficos
- Axios para requisições HTTP
- Dayjs para manipulação e formatação de datas

**Passos para rodar:**

Acesse a pasta do frontend:

```
cd sistema-zizo
```

Instale as dependências:

```
npm install
```

Execute a aplicação:

```
npm run dev
```

### Exemplos de Models

**Cliente**
```
{
    Id;
    Nome;
    Cpf;
    DataNascimento;
    Telefone;
    PontosFidelidade;
    Pedidos;
}
```

**Exemplo:**
```
{
    1,
    "Eduardo",
    "09911104838",
    "01/09/2004",
    "4193225754",
    115,
    pedidos
}
```

**Pedido**
```
{
    Id;
    ClienteId;
    ValorTotal;
    EstaAtivo;
    EstaPago;
    Data;
    Cliente;
    Itens;
}
```

**Exemplo:**
```
{
    100,
    1,
    "89.90m",
    true,
    false,
    "01/01/2023",
    cliente,
    itens
}
```

### Funcionalidades

- Cliente: cadastro, edição, remoção e listagem
- Funcionário: cadastro e listagem
- Pedido: cadastro, edição, exclusão e listagem
- Financeiro: rastreamento de gastos, geração de relatórios e gráficos
- Estoque: controle e gerenciamento de produtos

## Integrantes da Equipe

- Ana Paula Endler (33241686)  
- Cauê Gonçalves (34218122)  
- Eduardo Henrique Machado (32927398)  
- Enzo Sottomaior Ribeiro (34136461)  
- Pedro Wernek de Castilho Netto (34705724)  
- Yorx Anthony Contreras Pacheco (34577220)  

## Vídeo Pitch

(https://drive.google.com/drive/folders/1NubcZxVnIIwK9uBqbwlAfW-ea1_tF0ys?usp=sharing)

## Acesso ao MVP

(https://projeto-zizo.vercel.app/)