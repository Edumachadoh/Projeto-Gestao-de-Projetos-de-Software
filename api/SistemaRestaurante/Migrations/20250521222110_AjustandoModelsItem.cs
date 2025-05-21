using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaRestaurante.Migrations
{
    /// <inheritdoc />
    public partial class AjustandoModelsItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Itens",
                keyColumn: "Id",
                keyValue: 1,
                column: "PedidoId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Itens",
                keyColumn: "Id",
                keyValue: 2,
                column: "PedidoId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Itens",
                keyColumn: "Id",
                keyValue: 3,
                column: "PedidoId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Itens",
                keyColumn: "Id",
                keyValue: 4,
                column: "PedidoId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Itens",
                keyColumn: "Id",
                keyValue: 5,
                column: "PedidoId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Itens",
                keyColumn: "Id",
                keyValue: 6,
                column: "PedidoId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 1,
                column: "Data",
                value: new DateTime(2025, 5, 21, 19, 21, 10, 674, DateTimeKind.Local).AddTicks(1155));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 2,
                column: "Data",
                value: new DateTime(2025, 5, 21, 19, 21, 10, 674, DateTimeKind.Local).AddTicks(1169));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 3,
                column: "Data",
                value: new DateTime(2025, 5, 21, 19, 21, 10, 674, DateTimeKind.Local).AddTicks(1170));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 4,
                column: "Data",
                value: new DateTime(2025, 5, 21, 19, 21, 10, 674, DateTimeKind.Local).AddTicks(1171));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 5,
                column: "Data",
                value: new DateTime(2025, 5, 21, 19, 21, 10, 674, DateTimeKind.Local).AddTicks(1173));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Itens",
                keyColumn: "Id",
                keyValue: 1,
                column: "PedidoId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Itens",
                keyColumn: "Id",
                keyValue: 2,
                column: "PedidoId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Itens",
                keyColumn: "Id",
                keyValue: 3,
                column: "PedidoId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Itens",
                keyColumn: "Id",
                keyValue: 4,
                column: "PedidoId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Itens",
                keyColumn: "Id",
                keyValue: 5,
                column: "PedidoId",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Itens",
                keyColumn: "Id",
                keyValue: 6,
                column: "PedidoId",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 1,
                column: "Data",
                value: new DateTime(2025, 5, 21, 19, 18, 20, 861, DateTimeKind.Local).AddTicks(6351));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 2,
                column: "Data",
                value: new DateTime(2025, 5, 21, 19, 18, 20, 861, DateTimeKind.Local).AddTicks(6362));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 3,
                column: "Data",
                value: new DateTime(2025, 5, 21, 19, 18, 20, 861, DateTimeKind.Local).AddTicks(6364));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 4,
                column: "Data",
                value: new DateTime(2025, 5, 21, 19, 18, 20, 861, DateTimeKind.Local).AddTicks(6365));

            migrationBuilder.UpdateData(
                table: "Pedidos",
                keyColumn: "Id",
                keyValue: 5,
                column: "Data",
                value: new DateTime(2025, 5, 21, 19, 18, 20, 861, DateTimeKind.Local).AddTicks(6366));
        }
    }
}
