using ApiUrnaEletronica.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiUrnaEletronica.Data;

public class UrnaContext :DbContext
{
    public UrnaContext(DbContextOptions<UrnaContext> options) : base(options)
    { }

    public DbSet<Candidate> Candidates { get; set; }
    public DbSet<Vote> Votes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Candidate>().ToTable("Candidates");

        modelBuilder.Entity<Candidate>()
            .HasMany(c => c.Votes)
            .WithOne(v => v.Candidate);

        modelBuilder.Entity<Candidate>()
            .Property(c => c.CreatedAt)
            .HasDefaultValueSql("getdate()");


        modelBuilder.Entity<Vote>().ToTable("Votes");

        modelBuilder.Entity<Vote>()
            .Property(v => v.CreatedAt)
            .HasDefaultValueSql("getdate()");

        modelBuilder.Entity<Candidate>().HasData(
            new Candidate
            {
                Id = 1,
                FullName = "Miguel Soares",
                ViceCandidateName = "Roberto Andrade",
                Party = "XT",
                ElectoralNumber = 13
            },
            new Candidate
            {
                Id = 2,
                FullName = "Carlos Bispo",
                ViceCandidateName = "João Esteves",
                Party = "PRDT",
                ElectoralNumber = 14
            },
            new Candidate
            {
                Id = 3,
                FullName = "Paulo Apolinario",
                ViceCandidateName = "Cristovão Colombo",
                Party = "PLD",
                ElectoralNumber = 15
            }
        );
    }
}
