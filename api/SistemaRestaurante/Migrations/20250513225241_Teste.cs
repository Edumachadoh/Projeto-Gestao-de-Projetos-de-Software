using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaRestaurante.Migrations
{
    /// <inheritdoc />
    public partial class Teste : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 8, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 2,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 9, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 3,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 10, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 4,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 11, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 5,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 12, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 1,
                column: "Data",
                value: new DateTime(2025, 5, 13, 19, 52, 40, 921, DateTimeKind.Local).AddTicks(8350));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 2,
                column: "Data",
                value: new DateTime(2025, 5, 13, 19, 52, 40, 921, DateTimeKind.Local).AddTicks(8365));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 3,
                column: "Data",
                value: new DateTime(2025, 5, 13, 19, 52, 40, 921, DateTimeKind.Local).AddTicks(8367));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 4,
                column: "Data",
                value: new DateTime(2025, 5, 13, 19, 52, 40, 921, DateTimeKind.Local).AddTicks(8368));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 5,
                column: "Data",
                value: new DateTime(2025, 5, 13, 19, 52, 40, 921, DateTimeKind.Local).AddTicks(8372));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 3, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 2,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 4, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 3,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 5, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 4,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 6, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 5,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 7, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 1,
                column: "Data",
                value: new DateTime(2025, 5, 8, 19, 37, 52, 735, DateTimeKind.Local).AddTicks(5327));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 2,
                column: "Data",
                value: new DateTime(2025, 5, 8, 19, 37, 52, 735, DateTimeKind.Local).AddTicks(5340));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 3,
                column: "Data",
                value: new DateTime(2025, 5, 8, 19, 37, 52, 735, DateTimeKind.Local).AddTicks(5342));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 4,
                column: "Data",
                value: new DateTime(2025, 5, 8, 19, 37, 52, 735, DateTimeKind.Local).AddTicks(5343));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 5,
                column: "Data",
                value: new DateTime(2025, 5, 8, 19, 37, 52, 735, DateTimeKind.Local).AddTicks(5345));
        }
    }
}
