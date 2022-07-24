using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiUrnaEletronica.Migrations
{
    public partial class inicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Candidates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ViceCandidateName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ElectoralNumber = table.Column<int>(type: "int", nullable: false),
                    Party = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Candidates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Votes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    CandidateId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Votes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Votes_Candidates_CandidateId",
                        column: x => x.CandidateId,
                        principalTable: "Candidates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Candidates",
                columns: new[] { "Id", "ElectoralNumber", "FullName", "Party", "ViceCandidateName" },
                values: new object[] { 1, 13, "Miguel Soares", "XT", "Roberto Andrade" });

            migrationBuilder.InsertData(
                table: "Candidates",
                columns: new[] { "Id", "ElectoralNumber", "FullName", "Party", "ViceCandidateName" },
                values: new object[] { 2, 14, "Carlos Bispo", "PRDT", "João Esteves" });

            migrationBuilder.InsertData(
                table: "Candidates",
                columns: new[] { "Id", "ElectoralNumber", "FullName", "Party", "ViceCandidateName" },
                values: new object[] { 3, 15, "Paulo Apolinario", "PLD", "Cristovão Colombo" });

            migrationBuilder.CreateIndex(
                name: "IX_Votes_CandidateId",
                table: "Votes",
                column: "CandidateId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Votes");

            migrationBuilder.DropTable(
                name: "Candidates");
        }
    }
}
