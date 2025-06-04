using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaRestaurante.Migrations
{
    /// <inheritdoc />
    public partial class AjustandoItemPedido : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItensPedido_Pedidos_PedidoId",
                table: "ItensPedido");

            migrationBuilder.AlterColumn<int>(
                name: "PedidoId",
                table: "ItensPedido",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 29, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 2,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 30, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 3,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 31, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 4,
                column: "DataRegistrada",
                value: new DateTime(2025, 6, 1, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 5,
                column: "DataRegistrada",
                value: new DateTime(2025, 6, 2, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.AddForeignKey(
                name: "FK_ItensPedido_Pedidos_PedidoId",
                table: "ItensPedido",
                column: "PedidoId",
                principalTable: "Pedidos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItensPedido_Pedidos_PedidoId",
                table: "ItensPedido");

            migrationBuilder.AlterColumn<int>(
                name: "PedidoId",
                table: "ItensPedido",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 28, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 2,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 29, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 3,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 30, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 4,
                column: "DataRegistrada",
                value: new DateTime(2025, 5, 31, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Estoques",
                keyColumn: "Id",
                keyValue: 5,
                column: "DataRegistrada",
                value: new DateTime(2025, 6, 1, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.AddForeignKey(
                name: "FK_ItensPedido_Pedidos_PedidoId",
                table: "ItensPedido",
                column: "PedidoId",
                principalTable: "Pedidos",
                principalColumn: "Id");
        }
    }
}
