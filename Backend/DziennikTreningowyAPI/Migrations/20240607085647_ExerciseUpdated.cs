using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DziennikTreningowyAPI.Migrations
{
    /// <inheritdoc />
    public partial class ExerciseUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Length",
                table: "Exercises",
                newName: "Duration");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "Exercises",
                newName: "Length");
        }
    }
}
