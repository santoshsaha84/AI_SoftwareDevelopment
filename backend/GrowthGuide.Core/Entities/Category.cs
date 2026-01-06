namespace GrowthGuide.Core.Entities;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty; // Placeholder for image link
    public ICollection<Item> Items { get; set; } = new List<Item>();
}
