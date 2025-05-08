using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SistemaRestaurante.Migrations
{
    /// <inheritdoc />
    public partial class Inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Cpf = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DataNascimento = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Telefone = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PontosFidelidade = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Estoques",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DataRegistrada = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estoques", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Funcionarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Cpf = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Senha = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Cargo = table.Column<byte>(type: "tinyint unsigned", nullable: false),
                    Nome = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EstaAtivo = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Salario = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Telefone = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Funcionarios", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Gastos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Categoria = table.Column<byte>(type: "tinyint unsigned", nullable: false),
                    Valor = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Data = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gastos", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RegistrosFinanceiros",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DataRegistrada = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Gas = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Luz = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Agua = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Funcionarios = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Estoque = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Itens = table.Column<decimal>(type: "decimal(65,30)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrosFinanceiros", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Pedidos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ClienteId = table.Column<int>(type: "int", nullable: true),
                    ValorTotal = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    StatusPreparo = table.Column<byte>(type: "tinyint unsigned", nullable: false),
                    Data = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pedidos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pedidos_Clientes_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Clientes",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Produtos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    QtdMinima = table.Column<int>(type: "int", nullable: false),
                    QtdMaxima = table.Column<int>(type: "int", nullable: false),
                    QtdAtual = table.Column<int>(type: "int", nullable: false),
                    EstoqueId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produtos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Produtos_Estoques_EstoqueId",
                        column: x => x.EstoqueId,
                        principalTable: "Estoques",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Itens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Valor = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PedidoId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Itens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Itens_Pedidos_PedidoId",
                        column: x => x.PedidoId,
                        principalTable: "Pedidos",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Clientes",
                columns: new[] { "Id", "Cpf", "DataNascimento", "Nome", "PontosFidelidade", "Telefone" },
                values: new object[,]
                {
                    { 1, "12345678901", new DateTime(1990, 5, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ana Oliveira", 120, "(11) 91234-5678" },
                    { 2, "23456789012", new DateTime(1985, 3, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "Bruno Souza", 200, "(21) 99876-5432" },
                    { 3, "34567890123", new DateTime(1998, 8, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Carla Lima", 80, "(31) 98765-4321" },
                    { 4, "45678901234", new DateTime(1992, 12, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "Diego Martins", 150, "(41) 97654-3210" },
                    { 5, "56789012345", new DateTime(1980, 1, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "Elaine Costa", 300, "(51) 96543-2109" }
                });

            migrationBuilder.InsertData(
                table: "Estoques",
                columns: new[] { "Id", "DataRegistrada" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 5, 3, 0, 0, 0, 0, DateTimeKind.Local) },
                    { 2, new DateTime(2025, 5, 4, 0, 0, 0, 0, DateTimeKind.Local) },
                    { 3, new DateTime(2025, 5, 5, 0, 0, 0, 0, DateTimeKind.Local) },
                    { 4, new DateTime(2025, 5, 6, 0, 0, 0, 0, DateTimeKind.Local) },
                    { 5, new DateTime(2025, 5, 7, 0, 0, 0, 0, DateTimeKind.Local) }
                });

            migrationBuilder.InsertData(
                table: "Funcionarios",
                columns: new[] { "Id", "Cargo", "Cpf", "EstaAtivo", "Nome", "Salario", "Senha", "Status", "Telefone" },
                values: new object[,]
                {
                    { 1, (byte)0, "535352123", true, "Paulo Tobias", 3000m, "senha123", 1, "4788845654" },
                    { 2, (byte)3, "12345678900", true, "Joao Paulo", 2500m, "chimarrao@@!", 1, "413532535" },
                    { 3, (byte)2, "7575422345", true, "Jeremias Antonio Junior", 5680m, "topzera224", 1, "242223254" },
                    { 4, (byte)0, "7346895211", true, "Fernanda Albuquerque", 7800m, "senha123", 1, "5799568888" },
                    { 5, (byte)1, "999067777", true, "Maria Betania", 2900m, "carambolas2323", 1, "4745454555" }
                });

            migrationBuilder.InsertData(
                table: "Gastos",
                columns: new[] { "Id", "Categoria", "Data", "Valor" },
                values: new object[,]
                {
                    { 1, (byte)1, new DateTime(2025, 1, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 150.00m },
                    { 2, (byte)0, new DateTime(2025, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 220.75m },
                    { 3, (byte)1, new DateTime(2025, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 98.50m },
                    { 4, (byte)1, new DateTime(2025, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 3000.00m },
                    { 5, (byte)0, new DateTime(2025, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 785.90m }
                });

            migrationBuilder.InsertData(
                table: "Produtos",
                columns: new[] { "Id", "EstoqueId", "Nome", "QtdAtual", "QtdMaxima", "QtdMinima" },
                values: new object[,]
                {
                    { 1, null, "Arroz", 50, 100, 10 },
                    { 2, null, "Feijão", 30, 80, 15 },
                    { 3, null, "Macarrão", 25, 70, 20 },
                    { 4, null, "Carne", 20, 50, 5 },
                    { 5, null, "Óleo", 35, 60, 8 }
                });

            migrationBuilder.InsertData(
                table: "RegistrosFinanceiros",
                columns: new[] { "Id", "Agua", "DataRegistrada", "Estoque", "Funcionarios", "Gas", "Itens", "Luz" },
                values: new object[,]
                {
                    { 1, 90m, new DateTime(2025, 1, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 750m, 3000m, 120m, 250m, 200m },
                    { 2, 95m, new DateTime(2025, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 800m, 3100m, 130m, 270m, 210m },
                    { 3, 100m, new DateTime(2025, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 700m, 3200m, 140m, 260m, 190m },
                    { 4, 85m, new DateTime(2025, 4, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 780m, 3150m, 125m, 240m, 205m },
                    { 5, 88m, new DateTime(2025, 5, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 760m, 3300m, 135m, 265m, 195m }
                });

            migrationBuilder.InsertData(
                table: "Pedidos",
                columns: new[] { "Id", "ClienteId", "Data", "StatusPreparo", "ValorTotal" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2025, 5, 8, 19, 37, 52, 735, DateTimeKind.Local).AddTicks(5327), (byte)0, 45.50m },
                    { 2, 2, new DateTime(2025, 5, 8, 19, 37, 52, 735, DateTimeKind.Local).AddTicks(5340), (byte)0, 22.00m },
                    { 3, 3, new DateTime(2025, 5, 8, 19, 37, 52, 735, DateTimeKind.Local).AddTicks(5342), (byte)3, 100.00m },
                    { 4, 4, new DateTime(2025, 5, 8, 19, 37, 52, 735, DateTimeKind.Local).AddTicks(5343), (byte)1, 18.75m },
                    { 5, 1, new DateTime(2025, 5, 8, 19, 37, 52, 735, DateTimeKind.Local).AddTicks(5345), (byte)2, 70.30m }
                });

            migrationBuilder.InsertData(
                table: "Itens",
                columns: new[] { "Id", "Nome", "PedidoId", "Valor" },
                values: new object[,]
                {
                    { 1, "Refrigerante", 1, 5.50m },
                    { 2, "Suco", 2, 12.00m },
                    { 3, "Bolacha", 2, 8.00m },
                    { 4, "Bala", 2, 2.20m },
                    { 5, "Chicletes", 3, 1.00m },
                    { 6, "Pasta de dente", 4, 15.00m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Itens_PedidoId",
                table: "Itens",
                column: "PedidoId");

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_ClienteId",
                table: "Pedidos",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_EstoqueId",
                table: "Produtos",
                column: "EstoqueId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Funcionarios");

            migrationBuilder.DropTable(
                name: "Gastos");

            migrationBuilder.DropTable(
                name: "Itens");

            migrationBuilder.DropTable(
                name: "Produtos");

            migrationBuilder.DropTable(
                name: "RegistrosFinanceiros");

            migrationBuilder.DropTable(
                name: "Pedidos");

            migrationBuilder.DropTable(
                name: "Estoques");

            migrationBuilder.DropTable(
                name: "Clientes");
        }
    }
}
