using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookAPIWithEF.Migrations
{
    /// <inheritdoc />
    public partial class AddedLikedColumnInQuoteModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Liked",
                table: "Quotes",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Liked",
                table: "Quotes");
        }
    }
}
