using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace Portal_FYV.Models
{
    public partial class db_model : DbContext
    {
        public db_model()
            : base("name=db_model")
        {
        }

        public virtual DbSet<CatalogoProducto> CatalogoProductos { get; set; }
        public virtual DbSet<Estatus> Estatus { get; set; }
        public virtual DbSet<Producto> Productos { get; set; }
        public virtual DbSet<REQDET> REQDETs { get; set; }
        public virtual DbSet<REQHDR> REQHDRs { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<UsuariosAltas> UsuariosAltas { get; set; }
        public virtual DbSet<UsuariosProductos> UsuariosProductos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Estatus>()
                .HasMany(e => e.Usuarios)
                .WithRequired(e => e.Estatus)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Producto>()
                .HasMany(e => e.UsuariosProductos)
                .WithRequired(e => e.Producto)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<REQDET>()
                .Property(e => e.Cantidad_solicitada)
                .HasPrecision(19, 4);

            modelBuilder.Entity<REQDET>()
                .Property(e => e.Cantidad_validada)
                .HasPrecision(19, 4);

            modelBuilder.Entity<REQDET>()
                .Property(e => e.Cantidad_ultima_compra)
                .HasPrecision(19, 4);

            modelBuilder.Entity<REQDET>()
                .Property(e => e.Ventas_ultima_semana)
                .HasPrecision(19, 4);

            modelBuilder.Entity<REQHDR>()
                .HasMany(e => e.REQDETs)
                .WithRequired(e => e.REQHDR)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Roles>()
                .HasMany(e => e.Usuarios)
                .WithRequired(e => e.Role)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.REQHDRs)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.Id_Creador)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.REQHDRs1)
                .WithOptional(e => e.Usuario1)
                .HasForeignKey(e => e.Id_Validador);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.UsuariosAltas)
                .WithRequired(e => e.Usuario)
                .HasForeignKey(e => e.Id_UsuarioRegistra)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.UsuariosAltas1)
                .WithOptional(e => e.Usuario1)
                .HasForeignKey(e => e.Id_UsuarioAprueba);

            modelBuilder.Entity<Usuario>()
                .HasMany(e => e.UsuariosProductos)
                .WithRequired(e => e.Usuario)
                .WillCascadeOnDelete(false);
        }
    }
}