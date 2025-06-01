using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SistemaRestaurante.Migrations
{
    /// <inheritdoc />
    public partial class Models : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DropColumn(
                name: "StatusPreparo",
                table: "Pedidos");

            migrationBuilder.AddColumn<bool>(
                name: "EstaAtivo",
                table: "Pedidos",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "EstaPago",
                table: "Pedidos",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 27, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 2,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 28, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 3,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 29, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 4,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 30, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 5,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 31, 0, 0, 0, 0, DateTimeKind.Local));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstaAtivo",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "EstaPago",
                table: "Pedidos");

            migrationBuilder.AddColumn<byte>(
                name: "StatusPreparo",
                table: "Pedidos",
                type: "tinyint unsigned",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 16, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 2,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 17, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 3,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 18, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 4,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 19, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 5,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 20, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.InsertData(
                table: "Pedidos",
                columns: new[] { "Id", "ClienteId", "Data", "StatusPreparo", "ValorTotal" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2025, 5, 21, 19, 21, 10, 674, DateTimeKind.Local).AddTicks(1155), (byte)0, 45.50m },
                    { 2, 2, new DateTime(2025, 5, 21, 19, 21, 10, 674, DateTimeKind.Local).AddTicks(1169), (byte)0, 22.00m },
                    { 3, 3, new DateTime(2025, 5, 21, 19, 21, 10, 674, DateTimeKind.Local).AddTicks(1170), (byte)3, 100.00m },
                    { 4, 4, new DateTime(2025, 5, 21, 19, 21, 10, 674, DateTimeKind.Local).AddTicks(1171), (byte)1, 18.75m },
                    { 5, 1, new DateTime(2025, 5, 21, 19, 21, 10, 674, DateTimeKind.Local).AddTicks(1173), (byte)2, 70.30m }
                });
        }
    }
}
