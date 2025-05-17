using Microsoft.EntityFrameworkCore;
using SistemaRestaurante.Data;
using SistemaRestaurante.Models;
using SistemaRestaurante.Models.Financeiro;
using SistemaRestaurante.Models.Pessoa;

namespace SistemaRestaurante.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Gasto> Gastos { get; set; }
    public DbSet<RegistroFinanceiro> RegistrosFinanceiros { get; set; }

    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Funcionario> Funcionarios { get; set; }

    public DbSet<Estoque> Estoques { get; set; }
    public DbSet<Item> Itens { get; set; }
    public DbSet<Pedido> Pedidos { get; set; }
    public DbSet<Produto> Produtos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Seed();
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        modelBuilder.Entity<Funcionario>(entity =>
    {
        entity.Property(f => f.Status)
              .HasDefaultValue(1); 
    });
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }
}