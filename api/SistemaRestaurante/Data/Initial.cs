using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaRestaurante.Enums;
using SistemaRestaurante.Models;
using SistemaRestaurante.Models.Financeiro;
using SistemaRestaurante.Models.Pessoa;

namespace SistemaRestaurante.Data
{
    public static class Initial
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Funcionario>().HasData(
                new Funcionario
                {
                    Id = 1,
                    Nome = "Paulo Tobias",
                    Cpf = "535352123",
                    Senha = "senha123",
                    Cargo = Cargo.Administrador,
                    EstaAtivo = true,
                    Salario = 3000,
                    Telefone = "4788845654",
                    Status = 1
                }, new Funcionario
                {
                    Id = 2,
                    Nome = "Joao Paulo",
                    Cpf = "12345678900",
                    Senha = "chimarrao@@!",
                    Cargo = Cargo.Balconista,
                    EstaAtivo = true,
                    Salario = 2500,
                    Telefone = "413532535",
                    Status = 1
                }, new Funcionario
                {
                    Id = 3,
                    Nome = "Jeremias Antonio Junior",
                    Cpf = "7575422345",
                    Senha = "topzera224",
                    Cargo = Cargo.Gerente,
                    EstaAtivo = true,
                    Salario = 5680,
                    Telefone = "242223254",
                    Status = 1
                }, new Funcionario
                {
                    Id = 4,
                    Nome = "Fernanda Albuquerque",
                    Cpf = "7346895211",
                    Senha = "senha123",
                    Cargo = Cargo.Administrador,
                    EstaAtivo = true,
                    Salario = 7800,
                    Telefone = "5799568888",
                    Status = 1
                }, new Funcionario
                {
                    Id = 5,
                    Nome = "Maria Betania",
                    Cpf = "999067777",
                    Senha = "carambolas2323",
                    Cargo = Cargo.Cozinha,
                    EstaAtivo = true,
                    Salario = 2900,
                    Telefone = "4745454555",
                    Status = 1
                }
            );

                    modelBuilder.Entity<Cliente>().HasData(
                new Cliente
                {
                    Id = 1,
                    Nome = "Ana Oliveira",
                    Cpf = "12345678901",
                    DataNascimento = new DateTime(1990, 5, 10),
                    Telefone = "(11) 91234-5678",
                    PontosFidelidade = 120
                },
                new Cliente
                {
                    Id = 2,
                    Nome = "Bruno Souza",
                    Cpf = "23456789012",
                    DataNascimento = new DateTime(1985, 3, 22),
                    Telefone = "(21) 99876-5432",
                    PontosFidelidade = 200
                },
                new Cliente
                {
                    Id = 3,
                    Nome = "Carla Lima",
                    Cpf = "34567890123",
                    DataNascimento = new DateTime(1998, 8, 15),
                    Telefone = "(31) 98765-4321",
                    PontosFidelidade = 80
                },
                new Cliente
                {
                    Id = 4,
                    Nome = "Diego Martins",
                    Cpf = "45678901234",
                    DataNascimento = new DateTime(1992, 12, 5),
                    Telefone = "(41) 97654-3210",
                    PontosFidelidade = 150
                },
                new Cliente
                {
                    Id = 5,
                    Nome = "Elaine Costa",
                    Cpf = "56789012345",
                    DataNascimento = new DateTime(1980, 1, 30),
                    Telefone = "(51) 96543-2109",
                    PontosFidelidade = 300
                }
            );

            modelBuilder.Entity<Item>().HasData(
                new Item { Id = 1, Nome = "Refrigerante", Valor = 5.50m , PedidoId=1},
                new Item { Id = 2, Nome = "Suco", Valor = 12.00m, PedidoId=2},
                new Item { Id = 3, Nome = "Bolacha", Valor = 8.00m, PedidoId=2},
                new Item { Id = 4, Nome = "Bala", Valor = 2.20m, PedidoId=2},
                new Item { Id = 5, Nome = "Chicletes", Valor = 1.00m, PedidoId=3 },
                new Item { Id = 6, Nome = "Pasta de dente", Valor = 15.00m, PedidoId=4}
            );

            // modelBuilder.Entity<Pedido>().HasData(
            //     new Pedido { Id = 1, ClienteId = 1, ValorTotal = 45.50m, StatusPreparo = StatusPreparo.AFazer, Data = DateTime.Now },
            //     new Pedido { Id = 2, ClienteId = 2, ValorTotal = 22.00m, StatusPreparo = StatusPreparo.AFazer, Data = DateTime.Now },
            //     new Pedido { Id = 3, ClienteId = 3, ValorTotal = 100.00m, StatusPreparo = StatusPreparo.Entregue, Data = DateTime.Now },
            //     new Pedido { Id = 4, ClienteId = 4, ValorTotal = 18.75m, StatusPreparo = StatusPreparo.Fazendo, Data = DateTime.Now },
            //     new Pedido { Id = 5, ClienteId = 1, ValorTotal = 70.30m, StatusPreparo = StatusPreparo.Feito, Data = DateTime.Now }
            // );

            modelBuilder.Entity<Estoque>().HasData(
                new Estoque { Id = 1, DataRegistrada = DateTime.Today.AddDays(-5) },
                new Estoque { Id = 2, DataRegistrada = DateTime.Today.AddDays(-4) },
                new Estoque { Id = 3, DataRegistrada = DateTime.Today.AddDays(-3) },
                new Estoque { Id = 4, DataRegistrada = DateTime.Today.AddDays(-2) },
                new Estoque { Id = 5, DataRegistrada = DateTime.Today.AddDays(-1) }
            );

                modelBuilder.Entity<Produto>().HasData(
            new Produto
            {
                Id = 1,
                Nome = "Arroz",
                QtdMinima = 10,
                QtdMaxima = 100,
                QtdAtual = 50
            },
            new Produto
            {
                Id = 2,
                Nome = "Feijão",
                QtdMinima = 15,
                QtdMaxima = 80,
                QtdAtual = 30
            },
            new Produto
            {
                Id = 3,
                Nome = "Macarrão",
                QtdMinima = 20,
                QtdMaxima = 70,
                QtdAtual = 25
            },
            new Produto
            {
                Id = 4,
                Nome = "Carne",
                QtdMinima = 5,
                QtdMaxima = 50,
                QtdAtual = 20
            },
            new Produto
            {
                Id = 5,
                Nome = "Óleo",
                QtdMinima = 8,
                QtdMaxima = 60,
                QtdAtual = 35
            }
        );


            modelBuilder.Entity<Gasto>().HasData(
        new Gasto
        {
            Id = 1,
            Categoria = Categoria.Item,
            Valor = 150.00m,
            Data = new DateTime(2025, 1, 10)
        },
        new Gasto
        {
            Id = 2,
            Categoria = Categoria.ProdutoEstoque,
            Valor = 220.75m,
            Data = new DateTime(2025, 2, 5)
        },
        new Gasto
        {
            Id = 3,
            Categoria = Categoria.Item,
            Valor = 98.50m,
            Data = new DateTime(2025, 2, 20)
        },
        new Gasto
        {
            Id = 4,
            Categoria = Categoria.Item,
            Valor = 3000.00m,
            Data = new DateTime(2025, 3, 1)
        },
        new Gasto
        {
            Id = 5,
            Categoria = Categoria.ProdutoEstoque,
            Valor = 785.90m,
            Data = new DateTime(2025, 3, 10)
        }
        );
            
            modelBuilder.Entity<RegistroFinanceiro>().HasData(
            new RegistroFinanceiro { Id = 1, DataRegistrada = new DateTime(2025, 1, 10), Gas = 120, Luz = 200, Agua = 90, Funcionarios = 3000, Estoque = 750, Itens = 250 },
            new RegistroFinanceiro { Id = 2, DataRegistrada = new DateTime(2025, 2, 10), Gas = 130, Luz = 210, Agua = 95, Funcionarios = 3100, Estoque = 800, Itens = 270 },
            new RegistroFinanceiro { Id = 3, DataRegistrada = new DateTime(2025, 3, 10), Gas = 140, Luz = 190, Agua = 100, Funcionarios = 3200, Estoque = 700, Itens = 260 },
            new RegistroFinanceiro { Id = 4, DataRegistrada = new DateTime(2025, 4, 10), Gas = 125, Luz = 205, Agua = 85, Funcionarios = 3150, Estoque = 780, Itens = 240 },
            new RegistroFinanceiro { Id = 5, DataRegistrada = new DateTime(2025, 5, 10), Gas = 135, Luz = 195, Agua = 88, Funcionarios = 3300, Estoque = 760, Itens = 265 }
        );

        }
    }
}