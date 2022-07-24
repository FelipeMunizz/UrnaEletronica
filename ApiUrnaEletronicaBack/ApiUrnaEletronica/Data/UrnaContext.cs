using ApiUrnaEletronica.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiUrnaEletronica.Data
{
    public class UrnaContext :DbContext
    {
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Vote> Votes { get; set; }

        public UrnaContext(DbContextOptions<UrnaContext> options) : base(options)
        { }

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
                    FullName = "Abel da Silva",
                    ViceCandidateName = "Vorli Chiquio",
                    Party = "PT",
                    ElectoralNumber = 91
                },
                new Candidate
                {
                    Id = 2,
                    FullName = "Nelson Back",
                    ViceCandidateName = "Ambrosio Rubick",
                    Party = "PSD",
                    ElectoralNumber = 92
                },
                new Candidate
                {
                    Id = 3,
                    FullName = "Ambrosio Rubick ",
                    ViceCandidateName = "	José Adálcio Krieger",
                    Party = "MDB",
                    ElectoralNumber = 93
                }
            );
        }
    }
}
