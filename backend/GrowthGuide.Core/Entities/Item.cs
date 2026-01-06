namespace GrowthGuide.Core.Entities;

public class Item
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    // Optional: Cache AI response here to avoid repeated calls
    public string? GrowingDetails { get; set; }
}
